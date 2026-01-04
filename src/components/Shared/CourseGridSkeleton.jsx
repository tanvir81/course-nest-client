import React from "react";

const CourseGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-base-200 rounded-2xl p-4 flex flex-col gap-4 animate-pulse">
          <div className="w-full aspect-video bg-base-300 rounded-xl"></div>
          <div className="h-6 w-3/4 bg-base-300 rounded"></div>
          <div className="h-4 w-1/2 bg-base-300 rounded"></div>
          <div className="flex justify-between items-center mt-auto pt-4">
            <div className="h-8 w-1/4 bg-base-300 rounded"></div>
            <div className="h-8 w-1/3 bg-base-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseGridSkeleton;
