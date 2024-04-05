const SenderChat = () => {
  return (
    <div className="w-full flex justify-end">
      <div className="flex flex-col items-center gap-1 max-w-[50%]">
        <div className="w-full flex gap-2 items-center justify-end text-xs">
          <div className="size-6 rounded-full bg-[#c2c2c2]"></div>
          <p>Zeid Kazi</p>
        </div>
        <div className="w-full px-4 py-3 bg-[#f3f3f3] font-light border border-[#c2c2c2] rounded-l-[12px] rounded-br-[12px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
          repudiandae ipsum non eligendi recusandae natus dolorum nihil
          blanditiis perspiciatis commodi.
        </div>
        <div className="w-full flex items-center justify-end text-xs">
          8:30 pm
        </div>
      </div>
    </div>
  );
};

export default SenderChat;
