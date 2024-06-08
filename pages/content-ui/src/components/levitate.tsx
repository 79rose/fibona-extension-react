/* eslint-disable jsx-a11y/no-static-element-interactions */
/**
 * @author: leewahjoel
 * @description: 插件-悬浮按钮
 */

import React, { useState, useRef } from 'react';
import { exampleThemeStorage } from '@chrome-extension-boilerplate/storage';
import { SiAuchan } from 'react-icons/si';
import { IconButton } from '@radix-ui/themes';
import Setting from './setting';
export default function Levitate() {
  const theme = exampleThemeStorage.getSnapshot() as 'light' | 'dark';
  const [hover, setHover] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const dragRef = useRef<HTMLDivElement>(null);
  const handleMouseEnter = () => {
    console.log('hover');
    setHover(true);
  };

  const handleMouseLeave = () => {
    // 这是监听鼠标离开事件 但是为啥我点击按钮的时候也会触发这个事件呢？
    console.log('leave');
    setHover(false);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setDragging(true);
    setPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!dragging) return;
    const newY = dragRef.current!.offsetTop + (e.clientY - pos.y);
    dragRef.current!.style.top = `${newY}px`;
    setPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };
  const bgMap = {
    light: 'bg-gray-50 hover:bg-gray-200 text-gray-800',
    dark: 'bg-gray-900 hover:bg-gray-800 text-gray-100',
  };

  return (
    /*eslint-disable-next-line jsx-a11y/no-static-element-interactions */
    <div
      ref={dragRef}
      className={`fixed right-0 top-1/2 transform ${bgMap[theme]} -translate-y-1/2 w-28 h-12  rounded-l-full transition-transform duration-500 ease-in-out ${hover ? '' : 'translate-x-1/2'} cursor-pointer`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}>
      {/* close icon */}
      <div className="absolute right-0 h-2 w-2 flex items-center justify-center top-0 transform -translate-y-[300%] -translate-x-[100%]">
        <IconButton radius="full" variant="solid" size="1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            fill="white"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </IconButton>
      </div>
      <div className="flex items-center justify-start pl-4 h-full w-full text-nowrap font-bold">
        <SiAuchan size={24} color="#ff0000" />
        {hover && (
          <span
            className="
            ml-2 hover:scale-105
            transform transition-transform
            duration-200 ease-in-out
            ">
            Fibona
          </span>
        )}
      </div>
      {/* setting */}
      <div
        className={`${bgMap[theme]} absolute bottom-0 rounded-md 
         right-0 flex-col  w-[content] flex items-center justify-center transform translate-y-[120%]
          ${hover ? '-translate-x-1/2' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <Setting />
      </div>
    </div>
  );
}
