'use client';

import React, { useEffect, useState } from 'react';

export default function Home() {
  const [bgColor, setBgColor] = useState('#000');
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      setIsFullscreen(!!document.documentElement.requestFullscreen);
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timer);
      timer = setTimeout(() => setShowControls(false), 2000);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className={`flex min-h-screen flex-col items-center justify-end gap-6 pb-24`}
      onDoubleClick={() => {
        toggleFullscreen();
      }}
    >
      {showControls && (
        <>
          <div className='flex flex-row items-center justify-center gap-4 rounded-md border-2 border-dashed border-emerald-500 bg-emerald-700/40 p-4'>
            <ColorButton color='#000' onClick={() => setBgColor('#000')} />
            <ColorButton color='#fff' onClick={() => setBgColor('#fff')} />
            <ColorButton color='#f00' onClick={() => setBgColor('#f00')} />
            <ColorButton color='#0f0' onClick={() => setBgColor('#0f0')} />
            <ColorButton color='#00f' onClick={() => setBgColor('#00f')} />
          </div>
          <button
            className='rounded-md border bg-teal-900 px-4 py-2 text-xl text-teal-300 transition-all duration-200 hover:bg-teal-700 hover:text-teal-200'
            onClick={toggleFullscreen}
          >
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
          <p
            className={`${bgColor === '#000' ? 'bg-slate-900 text-gray-300' : 'bg-slate-200 text-black'} rounded-lg border-dashed p-4`}
          >
            Double click for <span>{isFullscreen ? 'exit fullscren' : 'fullscreen'} </span>
          </p>
        </>
      )}
    </div>
  );
}

const ColorButton = ({ color, onClick }: { color: string; onClick: () => void }) => {
  return (
    <button onClick={onClick}>
      <div
        className='size-10 rounded-md border border-emerald-500 p-2'
        style={{ backgroundColor: color }}
      />
    </button>
  );
};
