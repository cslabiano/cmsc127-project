import React from "react";

const KusinaSkeleton = () => {
  return (
    <>
      <div className="h-30 w-96">
        <div className="item rounded-3xl shadow-xl font-poppins bg-kusinasecondary h-full">
          <div className="skeleton h-72 w-96 bg-kusinaprimarylight"></div>
          <div className="pl-4 pr-4 pb-4">
            <div className=" h-4 w-20 mt-4 bg-"></div>
            <div className="skeleton h-4 w-36 mt-2 bg-kusinaprimarylight"></div>
            <div className="skeleton h-4 w-24 mt-2 bg-kusinaprimarylight"></div>
            <div className="flex justify-between">
              <div className="skeleton h-4 w-1/4 py-4 mt-4 bg-kusinaprimarylight"></div>
              <div className="skeleton h-4 w-1/2 py-4 mt-4 bg-kusinaprimarylight pr-4"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KusinaSkeleton;
