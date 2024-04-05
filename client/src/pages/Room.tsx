import React from "react";
import ChatHeader from "../components/ChatHeader";
import InputMessage from "../components/InputMessage";
import ParticipantChat from "../components/ParticipantChat";
import RoomNotifications from "../components/RoomNotifications";
import SenderChat from "../components/SenderChat";

const Room = () => {
  return (
    <>
      <div className="w-full h-screen max-h-screen overflow-auto flex flex-col items-center gap-2 px-2 md:px-7 py-3">
        <ChatHeader />
        {/* MESSAGE AREA */}
        <div className="w-full flex-1 overflow-auto border flex flex-col items-center gap-1 p-2">
          <RoomNotifications />
          <SenderChat />
          <ParticipantChat />
          <SenderChat />
          <ParticipantChat />
          <SenderChat />
        </div>
        <div className="w-full h-full max-h-[50px]">
          <InputMessage />
        </div>
      </div>
    </>
  );
};

export default Room;
