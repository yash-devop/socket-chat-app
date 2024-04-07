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
  date: Date,
  type: string,
  message: { 
    text: string,
    username: string,
    profileImage: string //can change
  }  
}

const Room = ({ socket }: RoomProps) => {
  const { roomID } = useParams<RoomParams>();
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
        <div className="w-full flex-1 overflow-auto border flex flex-col items-center gap-1 p-2">
          {allMessage.length >0 && allMessage.map((message) => {
          if(  message.type === "ROOM_NOTIFICATION") { return <RoomNotifications text={message.message.text}/>}
          })}
        </div>
        <div className="w-full h-full max-h-[50px]">
          <InputMessage />
        </div>
      </div>
    </>
  );
};

export default Room;
