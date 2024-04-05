import { Send } from "lucide-react";

const InputMessage = () => {
  return (
    <div className="w-full h-full flex gap-2 border-2 rounded-lg">
      <input
        className="w-full h-full outline-none rounded-lg p-4 "
        placeholder="Enter your message"
        type="text"
      />
      <button className="w-full max-w-10">
        <Send strokeWidth={1.75} />
      </button>
    </div>
  );
};

export default InputMessage;
