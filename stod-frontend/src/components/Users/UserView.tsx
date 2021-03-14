import React, { useEffect, useState, useCallback, useRef } from "react";
import { subscribeToTimer } from "../../actions/subToTimer";
import { io } from "socket.io-client";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SendIcon from "@material-ui/icons/Send";
import { useSocket } from "../../contexts/SocketContext";
import { useSelector } from "react-redux";
import { IRootState } from "../../actions/types";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import axios from "axios";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      maxWidth: 50,
    },
    messageBubbleSend: {
      backgroundColor: "#c7c7c7",
      borderRadius: "10px 10px 0px 10px",
      padding: 5,
      maxWidth: 500,
    },
    messageBubbleRecive: {
      backgroundColor: "#c7c7c7",
      borderRadius: "10px 10px 10px 0px",
      padding: 5,
      maxWidth: 500,
    },
    messageContainer: {
      height: 640,
      // overflow: "auto",
      bottom: 0,
      overflowY: "scroll",
    },
  })
);
interface Props {
  name: string;
}

interface SockMsg {
  recipient: string;
  message: string;
}

async function fetchMessages(username: string) {
  const res = await axios.post("http://localhost:5500/chats/", {
    username,
  });
  return res;
}

const UserView: React.FC<Props> = ({ name }) => {
  const [message, setMessage] = useState("");
  const { socket } = useSocket();
  const [messages, setMessages] = useState<SockMsg[]>([]);
  const classes = useStyles();
  const inputEl = useRef(null);
  // const mesRef = React.createRef();
  const username = useSelector(
    (state: IRootState) => state.auth.user?.username
  ) as string;

  const addMessage = useCallback(({ recipient, sender, message }) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { recipient, sender, message },
    ]);
  }, []);

  useEffect(() => {
    console.log(socket);
    if (!socket) return;
    socket.on("recive-message", (val: any) => {
      console.log("recived");
      addMessage(val);
    });

    return () => {
      socket.off("recive-message");
    };
  }, [socket]);

  useEffect(() => {
    fetchMessages(username).then((res) => {
      setMessages(res.data.messages);
      console.log(res.data.messages);
    });
  }, []);

  useEffect(() => {
    //@ts-ignore
    if (inputEl.current) {
      //@ts-ignore
      inputEl.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [messages]);

  return (
    <div>
      <Grid container>
        <Grid item md={12}>
          <Paper elevation={0} className={classes.messageContainer}>
            <List
              dense
              style={{
                overflow: "auto",
              }}
            >
              {messages.map((m) => (
                <React.Fragment>
                  <ListItem
                    ref={inputEl}
                    style={{
                      display: "flex",
                      justifyContent: `flex-${
                        m.recipient !== username ? "end" : "start"
                      }`,
                    }}
                  >
                    <Paper
                      elevation={0}
                      className={
                        m.recipient !== username
                          ? classes.messageBubbleSend
                          : classes.messageBubbleRecive
                      }
                    >
                      <Typography variant="subtitle1">{m.message}</Typography>
                    </Paper>
                    <Avatar>H</Avatar>
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item md={12}>
          <Paper elevation={0}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("smitting");
                let val = socket?.emit("private-message", {
                  recipient: name,
                  message,
                  sender: username,
                });
                console.log(val);
                setMessage("");
                setMessages((prevMessages) => [
                  ...prevMessages,
                  { recipient: name, message },
                ]);
                //@ts-ignore
                // mesRef.current.scrollTop = mesRef.current.scrollHeight;
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Send a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                InputLabelProps={{ shrink: false }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton type="submit">
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserView;
