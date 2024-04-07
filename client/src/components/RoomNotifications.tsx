type PropType = {
  text:string
}

const RoomNotifications = ({text}:PropType) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-fit text-xs text-nowrap border-2 border-[#C2C2C2] rounded-lg  p-2">
        {text} 
      </div>
    </div>
  );
};

export default RoomNotifications;
