import React from "react";

const ProgressBadge = () => {
  let circumference = 100;
  let percent = 10;
  let percentage = (circumference - percent) / 2;
  return (
    <div className="h-[40px] w-[40px] rounded-lg bg-zinc-900">
      <div className=" relative top-1 left-0 flex items-center justify-center">
        <svg className="h-[32px] w-[32px] -rotate-90 transform">
          <circle
            cx="16"
            cy="16"
            r="14px"
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            className="text-gray-700"
          />

          <circle
            cx="16"
            cy="16"
            r="14px"
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={
              (circumference - percentage / 200) * circumference
            }
            className="text-blue-500 "
          />
        </svg>
        <span className="absolute text-[12px]">{percentage * 2}</span>
      </div>
    </div>
  );
};

export default ProgressBadge;
