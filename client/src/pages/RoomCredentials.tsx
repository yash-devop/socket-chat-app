import React, { useState } from "react";

import Avatar from '../assets/avatar.svg'
type AvatarImage = string
const RoomCredentials = () => {
  const [image , setImage] = useState("");

  const handleImage=(e:React.ChangeEvent<HTMLInputElement>)=>{
     e.preventDefault();
     if(e.target.files && e.target.files.length > 0){
       const link = URL.createObjectURL(e.target.files[0]);
       setImage(link)
     }
  }
  return (
    <div className="w-full flex flex-col items-center p-6 md:p-20">
      <div className="w-full flex flex-col items-center gap-10 ">
        <div className=" w-full flex flex-col gap-2">
          
          <img src={image || Avatar } alt="" onClick={()=>document.getElementById("avatar_img")?.click()} className={`size-20 ${!image && "p-4"} bg-primary-avatar rounded-full object-cover cursor-pointer`} />
            <input type="file" hidden id="avatar_img" onChange={(e)=>handleImage(e)}/>
          <p className="text-lg font-bold">Add Avatar</p>
          <p className="w-full text-black/30 text-sm font-medium max-w-sm">
            Add your custom avatar or our app will automatically add random
            avatar for you
          </p>
        </div>
        <div className="w-full flex flex-col gap-2 md:gap-4">
          <label className="text-base font-semibold" htmlFor="username">
            Username
          </label>
          <input
            className="border outline-none focus:ring-2 p-2 md:p-3 rounded-lg"
            type="text"
            name=""
            id="username"
          />
          <label className="text-base font-semibold" htmlFor="roomId">
            Room ID
          </label>
          <input
            className="border outline-none focus:ring-2 p-2 md:p-3 rounded-lg"
            type="text"
            name=""
            id="roomId"
          />
        </div>

        <div className="w-full flex items-center justify-center">
          <button className="w-full border border-primary-blue text-white rounded-md flex items-center justify-center p-3 bg-primary-blue text-wrap text-lg hover:bg-opacity-70 ease-linear transition-all">
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCredentials;
