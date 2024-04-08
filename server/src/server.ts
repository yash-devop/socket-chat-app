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

let UserDummyDB:TUserDummyDB = {}


// 1.) io connection : 
io.on("connection",(socket:Socket)=>{
    console.log('socket in express' , socket.id);
    const socketId = socket.id
    socket.on("join_room",(userCredentials:JoinRoomProps)=>{
        const {profileImage,roomID,username} = userCredentials

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


        const GetAllUsersFromRoom = UserDummyDB[roomID];

        io.to(roomID).emit("ACTIVE_USERS",GetAllUsersFromRoom)

    });
    socket.on("SENDER_MESSAGE",(messageData:Message)=>{
        const {roomID , message:{senderMessage }} = messageData;
        // get user
        const user = UserDummyDB[roomID]?.find((user)=>{
            return user.socketId === socket.id
        })
    
        // const buffer = Buffer.from(user?.profileImage["0"]);


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

    });



    socket.on("disconnecting",()=>{
        for (const roomID in UserDummyDB) {
            const usersInRoom = UserDummyDB[roomID];
            for (const user of usersInRoom) {
                if (user.socketId === socketId) {
                    const user = UserDummyDB[roomID]?.find((user)=>{
                        return user.socketId === socket.id
                    })
                    io.to(roomID).emit("ROOM_MESSAGES",{
                        date: Date.now(),
                        socketID: socket.id,
                        message: {
                            text: `${user?.username} has left the room`,
                            username: user?.username,
                            profileImage: user?.profileImage
                        },
                        type: "ROOM_NOTIFICATION"
                    })
                    socket.leave(roomID)
                    
                    UserDummyDB[roomID] = UserDummyDB[roomID]?.filter((user)=>user.socketId !== socket.id)



                    io.to(roomID).emit("ROOM_MESSAGES",{
                        date: Date.now(),
                        socketID: socket.id,
                        message: {
                            text: `${user?.username} has left the room`,
                            username: user?.username,
                            profileImage: user?.profileImage
                        },
                        type: "ROOM_NOTIFICATION"
                    })

                    const GetAllUsersFromRoom = UserDummyDB[roomID];

                    console.log('Remaining USERs' , GetAllUsersFromRoom);

                    io.to(roomID).emit("ACTIVE_USERS",GetAllUsersFromRoom)

                    
                }
            }
        }
        

    })
});


console.log('UserDB', UserDummyDB);