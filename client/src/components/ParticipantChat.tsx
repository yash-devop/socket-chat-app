import { FormatDate } from "../utils/FormatDate";

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

const ParticipantChat = ({date ,message:{text,username,profileImage} ,socketID, type}: MessageDataType) => {

  const profileImageUint8Array = new Uint8Array(profileImage[0]);
  const profileImageBlob = new Blob([profileImageUint8Array]);
  const profileImageUrl: string = URL.createObjectURL(profileImageBlob);
  return (
    <div className="w-full flex justify-start">
      <div className="flex flex-col items-center gap-1 max-w-[50%]">
        <div className="w-full flex gap-2 items-center justify-start text-xs">
        <img src={profileImageUrl} className="size-6 rounded-full bg-[#c2c2c2]"/>
          <p>{username}</p>
        </div>
        <div className="w-full px-4 py-3 bg-[#333333] text-white font-light border border-[#c2c2c2] rounded-r-[12px] rounded-bl-[12px]">
         {text} 
        </div>
        <div className="w-full flex items-center justify-start text-xs">
        {FormatDate(date)}
        </div>
      </div>
    </div>
  );
};

export default ParticipantChat;
