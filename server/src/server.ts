import { Server, Socket } from "socket.io";
import app from "./app";

type JoinRoomProps = {
    roomID: string,
    username: string,
    profileImage: File | null
}
type Message = {
    roomID : string,
    message: {
        senderMessage: string,
    },
}
type TUserDummyDB = {
    [roomID:string]:{
        socketId: string,
        username: string,
        profileImage: File | null
    }[]
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

// Store the Users:
/*
 * [
        {
            socketId: "",
            name: "",
            profileImage: "",
        }
   ]
*/

const UserDummyDB:TUserDummyDB = {}

// 1.) io connection : 
io.on("connection",(socket:Socket)=>{
    console.log('socket in express' , socket.id);
    const socketId = socket.id
    socket.on("join_room",(userCredentials:JoinRoomProps)=>{
        const {profileImage,roomID,username} = userCredentials
        console.log('Data',{
            profileImage,
            roomID,
            username
        });
        
        
        // Store the User in DB :
        if(userCredentials){
            if (!UserDummyDB[roomID]) {
                UserDummyDB[roomID] = [];
            }
            UserDummyDB[roomID].push({
                profileImage: profileImage,
                username,
                socketId: socket.id
            })
            
            // now join the user to the room.
            socket.join(roomID);

            socket.emit("JOINED_ROOM_SUCCESS",roomID);

            io.to(roomID).emit("ROOM_MESSAGES",{
                date: Date.now(),
                socketID: socket.id,
                message: {
                    text: `${username} has joined the room`,
                    username,
                    profileImage
                },
                type: "ROOM_NOTIFICATION"
            })
        }
        console.log('MyDB',UserDummyDB);
    });
    socket.on("SENDER_MESSAGE",(messageData:Message)=>{
        const {roomID , message:{senderMessage }} = messageData;
        const user = UserDummyDB[roomID].find((user)=>{
            return user.socketId === socket.id
        })
    
        // const buffer = Buffer.from(user?.profileImage["0"]);

        console.log('message aayaa re db ka' ,user, "message is :", senderMessage);

        io.to(roomID).emit("ROOM_MESSAGES",{
            date: Date.now(),
            socketID: socket.id,
            message: {
                text: senderMessage,
                username : user?.username,
                profileImage : user?.profileImage
            },
            type: "MESSAGE"
        })

    })
});


console.log('UserDB', UserDummyDB);