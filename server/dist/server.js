"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const app_1 = __importDefault(require("./app"));
const expressServer = app_1.default.listen(8000, () => {
    console.log('JOD RUNNING IN SOCKET SERVER');
});
const io = new socket_io_1.Server(expressServer, {
    cors: {
        origin: "http://localhost:5173",
        // credentials: true
    }
});
// 1.) io connection : 
io.on("connection", (socket) => {
    console.log('socket in express', socket.id);
});
