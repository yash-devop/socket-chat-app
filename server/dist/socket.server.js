"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const server_1 = __importDefault(require("./server"));
console.log('value of expressserver in socketfile', server_1.default);
const io = new socket_io_1.Server(server_1.default, {
    cors: {
        origin: "http://localhost:5173/",
        credentials: true
    }
});
// 1.) io connection : 
io.on("connection", (socket) => {
    console.log('socket in express', socket.id);
});
