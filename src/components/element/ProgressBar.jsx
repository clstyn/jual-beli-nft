import React from "react";

export default function ProgressBar({ currentFund = 0.5, setGoal = 1 }) {
  const percentage = (currentFund / setGoal) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 ">
      <div
        className="text-[12px] w-full bg-[#9D174D] h-2.5 rounded-full"
        style={{ width: `${percentage}%` }}
      >{currentFund} ETH</div>
    </div>
  );
}
