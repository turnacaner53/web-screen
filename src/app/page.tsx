'use client';

import React, { useEffect, useState } from 'react';

import { Expand, Shrink } from 'lucide-react';

export default function Home() {
  const [bgColor, setBgColor] = useState('#000');
  const [showControls, setShowControls] = useState(true);
  const [showItems, setShowItems] = useState(true);
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
      timer = setTimeout(() => setShowControls(false), 1000);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      onClick={() => setShowItems((showItems) => !showItems)}
      style={{ backgroundColor: bgColor }}
      className={` ${
        showControls ? 'cursor-auto' : 'cursor-none'
      } flex min-h-screen flex-col items-center justify-between gap-4 pb-4`}
      onDoubleClick={() => {
        toggleFullscreen();
      }}
    >
      {showItems && (
        <>
          <div className='mt-24 flex-1'>
            <button
              className={`${bgColor === '#000' ? 'bg-slate-900 text-gray-300' : 'bg-slate-200 text-black'} flex size-16 items-center justify-center rounded-full border-2 px-2 py-1 text-xl`}
              onClick={toggleFullscreen}
            >
              {isFullscreen ? <Shrink /> : <Expand />}
            </button>
          </div>
          <div
            className={`flex flex-row items-center justify-center gap-4 rounded-md border-2 border-violet-500/50 bg-emerald-700/40 px-4 py-2`}
          >
            <ColorButton color='#000' onClick={() => setBgColor('#000')} />
            <ColorButton color='#fff' onClick={() => setBgColor('#fff')} />
            <ColorButton color='#f00' onClick={() => setBgColor('#f00')} />
            <ColorButton color='#0f0' onClick={() => setBgColor('#0f0')} />
            <ColorButton color='#00f' onClick={() => setBgColor('#00f')} />
          </div>
          <p
            className={`${bgColor === '#000' ? 'bg-slate-900 text-gray-300' : 'bg-slate-200 text-black'} rounded-lg border-dashed px-2 py-1`}
          >
            Double click to <span>{isFullscreen ? 'exit fullscren' : 'go fullscreen'} </span>
          </p>
        </>
      )}
      {!showItems && (
        <p
          className={`${showControls ? 'absolute bottom-4' : 'hidden'} ${bgColor === '#000' ? 'bg-slate-950 text-gray-600' : 'bg-slate-200 text-black'} rounded-lg border-dashed px-2 py-1`}
        >
          Click to show controls
        </p>
      )}
    </div>
  );
}

const ColorButton = ({ color, onClick }: { color: string; onClick: () => void }) => {
  return (
    <button onClick={onClick}>
      <div
        className='size-8 rounded-md border border-emerald-500/20 p-2'
        style={{ backgroundColor: color }}
      />
    </button>
  );
};
