import React from "react";

const SkeletonProdCard = ({ index, product, onClick }) => {
  return (
    <div className="p-6 bg-slate-50 shadow w-full rounded-md animate-pulse">
      <div className="flex gap-2">
        <div className="size-[80px] p-3 border-[0.5px] border-slate-100 bg-slate-200 rounded-md" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2"></div>
        </div>
      </div>
      <div className="flex gap-2 text-xs text-slate-400 my-3">
        <div className="h-3 bg-slate-200 rounded w-20"></div>
        <div className="h-3 bg-slate-200 rounded w-12"></div>
      </div>
      <div className="h-6 bg-slate-200 rounded w-24 ml-auto"></div>
    </div>
  );
};

export default SkeletonProdCard;
