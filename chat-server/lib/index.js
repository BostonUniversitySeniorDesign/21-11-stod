"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongodb_1 = __importDefault(require("mongodb"));
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var PORT = 5500;
var app = express_1.default();
var server = http_1.createServer(app);
app.use(cors_1.default());
app.use(body_parser_1.default.json());
// Create new Socket IO
var io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
// connect to mongodb
mongodb_1.default.connect("mongodb://mongo:27017/chat", { useUnifiedTopology: true }, function (err, client) {
    // if theres an error throw it
    if (err)
        throw err;
    console.log("Mongodb connected...");
    // Client connection to collection
    var db = client.db("test");
    // Rest
    app.use("/chats", function (req, res) {
        var username = req.body.username;
        console.log("EXPRESS", req.body);
        db.collection("chats").findOne({ user_id: username }, function (error, doc) {
            if (error) {
                res.status(500).send(error);
            }
            else {
                res.status(200).send(doc);
            }
        });
    });
    //  SOCKET IO
    io.on("connection", function (socket) { return __awaiter(void 0, void 0, void 0, function () {
        var id, chat;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = socket.handshake.query.id;
                    return [4 /*yield*/, db.collection("chats").findOne({ user_id: id })];
                case 1:
                    chat = _a.sent();
                    if (!!chat) return [3 /*break*/, 3];
                    return [4 /*yield*/, db.collection("chats").insertOne({ user_id: id, messages: [] })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    console.log(id);
                    socket.join(id);
                    // someone sent a private message
                    socket.on("private-message", function (_a) {
                        var recipient = _a.recipient, sender = _a.sender, message = _a.message;
                        return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        console.log({ recipient: recipient, message: message });
                                        return [4 /*yield*/, db.collection("chats").updateOne({ user_id: recipient }, {
                                                $push: {
                                                    messages: { recipient: recipient, message: message },
                                                },
                                            })];
                                    case 1:
                                        _b.sent();
                                        return [4 /*yield*/, db.collection("chats").updateOne({ user_id: sender }, {
                                                $push: {
                                                    messages: { recipient: recipient, message: message },
                                                },
                                            })];
                                    case 2:
                                        _b.sent();
                                        // broadcast the message to one recipient
                                        socket.broadcast
                                            .to(recipient)
                                            .emit("recive-message", { recipient: recipient, sender: id, message: message });
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
server.listen(PORT, function () { return console.log("App listening on port " + PORT); });
