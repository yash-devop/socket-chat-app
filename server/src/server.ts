import { Server, Socket } from "socket.io";
import app from "./app";

type JoinRoomProps = {
    roomID: string,
    username: string
}
const expressServer = app.listen(8000,()=>{
    console.log('JOD RUNNING IN SOCKET SERVER');
})
const io = new Server(expressServer,{
    cors:{
        origin: "http://localhost:5173",
        // credentials: true
    }
});
// 1.) io connection : 
io.on("connection",(socket:Socket)=>{
    console.log('socket in express' , socket.id);
    socket.on("join_room",({roomID , username}:JoinRoomProps)=>{
        console.log('roomID', roomID);
        console.log('username', username);
    })
});