import React from "react";
import { Skeleton } from "@ui";

const TvSkeleton = () => {
  return (
    <div className="grid gap-4 grid-movie-responsive">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex flex-col overflow-hidden rounded-md">
          <div>
            <Skeleton className="w-[300px] h-[450px] bg-gray-200" />
          </div>
          <div className="pt-6 pb-3 pr-3 space-y-4 border-gray-100">
            <div className="flex items-center justify-between">
              <Skeleton className="w-16 h-6 bg-gray-200" />
              <Skeleton className="w-16 h-6 ml-4 bg-gray-200" />
            </div>
            <Skeleton className="w-full h-8 bg-gray-200" />
            <Skeleton className="w-full h-4 bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TvSkeleton;
