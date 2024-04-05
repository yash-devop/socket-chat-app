const ParticipantChat = () => {
  return (
    <div className="w-full flex justify-start">
      <div className="flex flex-col items-center gap-1 max-w-[50%]">
        <div className="w-full flex gap-2 items-center justify-start text-xs">
          <div className="size-6 rounded-full bg-[#c2c2c2]"></div>
          <p>Yash Kamble</p>
        </div>
        <div className="w-full px-4 py-3 bg-[#333333] text-white font-light border border-[#c2c2c2] rounded-r-[12px] rounded-bl-[12px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
          pariatur possimus commodi in qui cum aut, doloribus veritatis debitis
          error ipsa ad impedit, sit dolore nam. Impedit eius provident ab.
        </div>
        <div className="w-full flex items-center justify-start text-xs">
          8:35 pm
        </div>
      </div>
    </div>
  );
};

export default ParticipantChat;
