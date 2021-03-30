import express from "express";
import MongoClient, { ObjectID } from "mongodb";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import bodyParser from "body-parser";
import cors from "cors";
const PORT = 5500;

const app = express();
const server = createServer(app);

app.use(cors());
app.use(bodyParser.json());

// Create new Socket IO
const io = new Server(server, {
  // cors: {
  //   origin: "http://localhost:3000",
  //   methods: ["GET", "POST"],
  // },
  cors: {
    origin: "https://www.stod.app",
    methods: ["GET", "POST"],
  },
});

// connect to mongodb
MongoClient.connect(
  "mongodb://mongo:27017/chat",
  { useUnifiedTopology: true },
  (err: any, client: any) => {
    // if theres an error throw it
    if (err) throw err;
    console.log("Mongodb connected...");

    // Client connection to collection
    var db = client.db("test");

    // Rest

    app.use("/chats", (req: any, res: any) => {
      const { username } = req.body;
      console.log("EXPRESS", req.body);
      db.collection("chats").findOne(
        { user_id: username },
        function (error: any, doc: any) {
          if (error) {
            res.status(500).send(error);
          } else {
            console.log(doc);
            res.status(200).send(doc);
          }
        }
      );
    });

    //  SOCKET IO
    io.on("connection", async (socket: Socket) => {
      const id = socket.handshake.query!.id as string;
      // let chat = db.collection("chats");
      let chat = await db.collection("chats").findOne({ user_id: id });
      if (!chat) {
        await db.collection("chats").insertOne({ user_id: id, messages: [] });
      }
      console.log(id);
      socket.join(id);

      // someone sent a private message
      socket.on(
        "private-message",
        async ({ recipient, sender, message }: IMessage) => {
          console.log({ recipient, message });
          await db.collection("chats").updateOne(
            { user_id: recipient },
            {
              $push: {
                messages: { recipient, sender: id, message },
              },
            }
          );
          await db.collection("chats").updateOne(
            { user_id: sender },
            {
              $push: {
                messages: { recipient, sender: id, message },
              },
            }
          );
          // broadcast the message to one recipient
          socket.broadcast
            .to(recipient)
            .emit("recive-message", { recipient, sender: id, message });
        }
      );
    });
  }
);

interface IMessage {
  recipient: string;
  message: string;
  sender?: string;
}

server.listen(PORT, () => console.log(`App listening on port ${PORT}`));
