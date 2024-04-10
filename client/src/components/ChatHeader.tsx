import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";

type ChatHeaderProps = {
  socket: Socket;
  roomID: string;
};

type UsersDataType = {
  socketId: string;
  username: string;
  profileImage: ArrayBuffer[];
}[];

const ChatHeader = ({ roomID, socket }: ChatHeaderProps) => {
  const [users, setUsers] = useState<UsersDataType>([]);
  const showUsers = users.slice(0, 5);
  const remainingUsers = users.length > 5 ? users.length - 5 : 0;
  const navigate = useNavigate()

  const handleLogout = ()=>{
    socket.disconnect();
    navigate("/");
    socket.connect()
  }

  useEffect(() => {
    socket.on("ACTIVE_USERS", (users: UsersDataType) => {
      setUsers(users);
    });
  }, []);

  console.log("user", users);
  console.log("userShow", showUsers);

  const createUrl = (arrayBuffer: ArrayBuffer) => {
    const uint8Array = new Uint8Array(arrayBuffer);
    const blob = new Blob([uint8Array], { type: "image/jpeg" });
    const urlCreator = window.URL || window.webkitURL;
    const imageUrl = urlCreator.createObjectURL(blob);
    return imageUrl;
  };

  return (
    <>
      <div className="flex items-center justify-between w-full border-b px-2">
        <div className="flex items-center -space-x-5 w-full">
          {showUsers.map((user, index) => (
            <div
              key={index}
              className="rounded-full border border-black size-10 bg-primary-avatar flex items-center justify-center"
            >
              <img
                className="rounded-full size-10 object-cover"
                src={createUrl(user.profileImage[0])}
                alt=""
              />
            </div>
          ))}

          {users.length > 5 && (
            <div
              className={`border border-black rounded-full size-10 bg-black/80 flex items-center justify-center text-white text-lg font-medium`}
            >
              <p>+{remainingUsers}</p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between  w-full max-w-xs ">
          <div>
            <p className="font-mono text-sm ">Room name</p>
            <p className="font-semibold text-xl tracking-tight">
              # <span className="capitalize"> {roomID}</span>
            </p>
          </div>
          <div>
            <LogOut 
            onClick={handleLogout}
            className="size-8 text-red-500 cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
