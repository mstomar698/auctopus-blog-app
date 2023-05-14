import React from 'react';

const NavBar = () => {
  return (
    <div className='fixed w-full top-0 z-20 bg-transparent backdrop-blur-xl'>
      <div className="shadow-sm shadow-black w-full h-full items-center justify-between flex px-16 py-1">
        <div
          className="text-2xl font-bold select-none"
          onClick={() => (window.location.href = '/')}
        >
          Blog App
        </div>
        <div className="text-2xl font-bold shadow shadow-black px-2 rounded-lg select-none">
          Auth
        </div>
      </div>
    </div>
  );
};

export default NavBar;
