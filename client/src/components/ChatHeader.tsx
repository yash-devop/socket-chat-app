import React from 'react';

const ChatHeader = () => {
  const users = [1, 2, 3, 4, 5,6];
  const showUsers = users.slice(0, 5);
  const remainingUsers = users.length > 5 ? users.length - 5 : 0;

  return (
    <>
    <div className='flex items-center justify-between w-full border-b px-2'>
      <div className='flex items-center -space-x-5 w-full'>
        {showUsers.map((user, index) => (
          <div key={index} className={`rounded-full border border-black size-10 bg-primary-avatar flex items-center justify-center`}>
            <img src="" alt="" />
          </div>
        ))}
        {users.length > 5 && (
          <div className={`border border-black rounded-full size-10 bg-primary-avatar flex items-center justify-center text-lg font-medium`}>
            <p>+{remainingUsers}</p>
          </div>
        )}
      </div>
      <div className='flex flex-col items-end  w-full max-w-xs'>
          <p className='font-mono text-sm '>Room name</p>
          <p className='font-semibold text-xl tracking-tight'># JOD GANG</p>
      </div>
    </div>
    </>
  );
};

export default ChatHeader;
