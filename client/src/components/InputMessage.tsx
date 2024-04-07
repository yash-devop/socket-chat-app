import { Send } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";
import { Socket } from "socket.io-client";
type RoomProps = {
  socket: Socket;
  roomID: string;
};

const InputMessage = ({ socket, roomID }: RoomProps) => {
  const { register, handleSubmit, resetField } = useForm();

  const sendMessage = (message: FieldValues) => {
    socket.emit("SENDER_MESSAGE", { message, roomID });
    resetField("senderMessage");
  };

  return (
    <div className="w-full h-full flex gap-2">
      <form
        className="w-full h-full flex gap-2 border-2 rounded-lg"
        onSubmit={handleSubmit(sendMessage)}
      >
        <input
          className="w-full h-full outline-none rounded-lg p-4 "
          placeholder="Enter your message"
          type="text"
          {...register("senderMessage", {
            required: true
          })}
        />
        <button type="submit" className="w-full max-w-10">
          <Send strokeWidth={1.75} />
        </button>
      </form>
    </div>
  );
};

export default InputMessage;
