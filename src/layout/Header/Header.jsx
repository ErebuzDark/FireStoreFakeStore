import React, { useEffect, useContext } from 'react';
import { Context } from '@contexts/ContextProvider';

const Header = () => {
  const { userInfo } = useContext(Context);

  return (
    <div className='flex justify-between items-center w-full py-3 px-10 shadow-sm text-white bg-amber-950'>
      <h3 className='text-3xl font-semibold'>FireStore</h3>
      <small>{userInfo?.name?.firstname || "Guest"}</small>
    </div>
  );
}

export default Header;
