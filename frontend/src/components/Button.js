import React from 'react';
//Standard Button
export function MediaButton({id, isPlayPause, f, content}) {
  return (
    <button
      id={id}
      className={`
      w-full
      h-full
        ${isPlayPause ? 'bg-slate-100 hover:bg-white' : 'bg-gray-700'}
        can-hover 
        flex items-center justify-center
        h-[37px] 
        rounded-full
        w-[37px]
        text-slate-200 
        font-bold
        hover:text-white
        `}
      onClick={f}
    >
      {content}
    </button>
  );
}

export function TrimToggle({f, content}) {
  return (
    <button
      id="trim-toggle"
      className=" appearance-none items-center rounded-full "
      onClick={f}
    >
      {content}
    </button>
  );
}
