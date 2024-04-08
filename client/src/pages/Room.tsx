import { useEffect, useRef, useState } from "react";
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
  date: string;
  type: string;
  socketID: string;
  message: {
    text: string;
    username: string;
    profileImage: ArrayBuffer[]; //can change
  };
};

const Room = ({ socket }: RoomProps) => {
  const { roomID } = useParams<RoomParams>();
  if (roomID == undefined) {
    return;
  }
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [allMessage, setAllMessage] = useState<MessageDataType[]>([]);

  useEffect(() => {
    socket.on("ROOM_MESSAGES", (message: MessageDataType) => {
      console.log("message", message);
      setAllMessage((prevMessage) => [...prevMessage, message]);
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [allMessage]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  };

  console.log(allMessage);

  return (
    <>
      <div className="w-full h-screen max-h-screen overflow-auto flex flex-col items-center gap-2 px-2 md:px-7 py-3">
        <ChatHeader socket={socket} roomID={roomID} />
        {/* MESSAGE AREA */}
        <div className="hide-scroll-bar w-full flex-1 overflow-auto flex flex-col items-end gap-1 p-2  inset-0 h-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
          {allMessage.length > 0 &&
            allMessage.map((message) => {
              console.log("message", message);

              if (message.type === "ROOM_NOTIFICATION") {
                return <RoomNotifications text={message.message.text} />;
              }
              if (message.type === "MESSAGE") {
                if (message.socketID === socket.id) {
                  return <SenderChat {...message} />;
                } else {
                  return <ParticipantChat {...message} />;
                }
              }
            })}

          <div ref={messagesEndRef} />
        </div>
        <div className="w-full h-full max-h-[50px]">
          <InputMessage roomID={roomID} socket={socket} />
        </div>
      </div>
    </>
  );
};

export default Room;
