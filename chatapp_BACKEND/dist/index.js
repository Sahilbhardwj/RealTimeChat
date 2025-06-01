"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const ws = new ws_1.WebSocketServer({ port: 8080 });
let allSockets = [];
ws.on("connection", (socket) => {
    socket.on("message", (message) => {
        var _a;
        //@ts-ignore
        const parsedmessage = JSON.parse(message);
        // if user wants to connect to a room
        if (parsedmessage.type == "join") {
            const joinedconnection = allSockets.find(x => x.socket == socket);
            if (joinedconnection) {
                allSockets = allSockets.filter(socket => socket !== joinedconnection);
            }
            allSockets.push({
                socket, roomid: parsedmessage.payload.roomid
            });
        }
        // if user is connected to a room and wants to send message
        if (parsedmessage.type == "chat") {
            const currentroomid = (_a = (allSockets.find(x => x.socket == socket))) === null || _a === void 0 ? void 0 : _a.roomid;
            allSockets.forEach(s => {
                if (s.roomid == currentroomid) {
                    s.socket.send(parsedmessage.payload.message);
                }
            });
        }
    });
});
