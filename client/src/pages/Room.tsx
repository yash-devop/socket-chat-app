import {
  useEffect,
  useState,
} from "react";
import ChatHeader from "../components/ChatHeader";
import InputMessage from "../components/InputMessage";
import ParticipantChat from "../components/ParticipantChat";
import RoomNotifications from "../components/RoomNotifications";
import SenderChat from "../components/SenderChat";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";

type RoomParams = {
  roomID: string;
};

type RoomProps = {
  socket: Socket;
};

type MessageDataType = {
  date: string,
  type: string,
  socketID:string,
  message: { 
    text: string,
    username: string,
    profileImage: ArrayBuffer[] //can change
  }  
}

const Room = ({ socket }: RoomProps) => {
  const { roomID } = useParams<RoomParams>();
  if(roomID == undefined ){ return}

  const [allMessage, setAllMessage] = useState<MessageDataType[]>([]);

  useEffect(() => {
    socket.on("ROOM_MESSAGES", (message: MessageDataType) => {
      console.log("message", message);
      setAllMessage((prevMessage)=>[...prevMessage , message])
    });
  }, []);

  console.log(allMessage)

  return (
    <>
      <div className="w-full h-screen max-h-screen overflow-auto flex flex-col items-center gap-2 px-2 md:px-7 py-3">
        <ChatHeader roomID={roomID} />
        {/* MESSAGE AREA */}
        <div className="w-full flex-1 overflow-auto border flex flex-col items-end gap-1 p-2">
          {allMessage.length >0 && allMessage.map((message) => {
            console.log("message", message);
            
          if(  message.type === "ROOM_NOTIFICATION") { return <RoomNotifications text={message.message.text}/>}
          if(  message.type === "MESSAGE") { if(message.socketID === socket.id){return <SenderChat {...message}/> } else{return <ParticipantChat {...message}/>} }
          })}
        </div>
        <div className="w-full h-full max-h-[50px]">
          <InputMessage roomID={roomID} socket ={socket}/>
        </div>
      </div>
    </>
  );
};

export default Room;
