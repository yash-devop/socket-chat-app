import React, { FormEvent, useState } from "react";

import Avatar from '../assets/avatar.svg'
import { FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RoomSchema } from "../lib/validation";
import { z } from "zod";
import { Socket } from "socket.io-client";
type AvatarImage = string
type CredentialType = {
  roomID: string,
  username: string,
  profile_image: File | null
}

type RoomCredentialsProps = {
  socket: Socket
}
type RoomSchemaType = z.infer<typeof RoomSchema>;





const RoomCredentials = ({
  socket
}: RoomCredentialsProps) => {
  const [image, setImage] = useState("");
  const [credentials, setCredentials] = useState<CredentialType>({
    roomID: "",
    username: "",
    profile_image: null
  });

  const { register, handleSubmit,
    formState: {
      isSubmitting,
      errors
    } }
    = useForm<RoomSchemaType>({
      resolver: zodResolver(RoomSchema)
    })

  const handleJoinRoom = (values: FieldValues) => {
    console.log('values', values);
    if(values){
      socket.emit("join_room", values)
    }
  }

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const link: AvatarImage = URL.createObjectURL(e.target.files[0]);
      setImage(link)
      setCredentials({ ...credentials, profile_image: e.target.files[0] })
    }
  }

  console.log("image in hook", credentials)
  return (
    <div className="w-full flex flex-col items-center p-6 md:p-20">
      <form noValidate onSubmit={handleSubmit(handleJoinRoom)} className="w-full flex flex-col items-center gap-10 ">
        <div className=" w-full flex flex-col gap-2">

          <img src={image || Avatar} alt="" onClick={() => document.getElementById("profileImage")?.click()} className={`size-20 ${!image && "p-4"} bg-primary-avatar rounded-full object-cover cursor-pointer`} />
          <input type="file" hidden id="profileImage" {...register("profileImage", {
            onChange: (e) => {
              handleImage(e)
            }
          })} />
          <p className="text-lg font-bold">Add Avatar</p>
          <p className="w-full text-black/30 text-sm font-medium max-w-sm">
            Add your custom avatar or our app will automatically add random
            avatar for you
          </p>
          {
            errors.profileImage && <div className="text-red-400">{errors.profileImage?.message?.toString()}</div>
          }
        </div>
        <div className="w-full flex flex-col gap-2 md:gap-4">
          <label className="text-base font-semibold" htmlFor="username">
            Username
          </label>
          <input
            className="border outline-none focus:ring-2 p-2 md:p-3 rounded-lg"
            type="text"
            id="username"
            {...register("username", {
              required: "Username is required !"
            })}
          />
          {
            errors.username && <div className="text-red-400">{errors.username.message}</div>
          }
          <label className="text-base font-semibold" htmlFor="roomId">
            Room ID
          </label>
          <input
            className="border outline-none focus:ring-2 p-2 md:p-3 rounded-lg"
            type="text"
            id="roomId"
            {...register("roomId")}
          />
          {
            errors.roomId && <div className="text-red-400">{errors.roomId.message}</div>
          }
        </div>

        <div className="w-full flex items-center justify-center">
          <button disabled={isSubmitting} type="submit" className="w-full border border-primary-blue text-white rounded-md flex items-center justify-center p-3 bg-primary-blue text-wrap text-lg hover:bg-opacity-70 ease-linear transition-all">
            Join Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoomCredentials;