import React from "react";

const SkeletonLoader = () => {
  return (
    <main className="max-w-7xl px-3 mx-auto flex flex-col gap-9 w-full pt-4 pb-10">
      {/* Date today */}
      <section className="space-y-4">
        <div className="space-y-2">
          <h2 className="flex gap-1 items-end">
            <div className="w-32 h-6 bg-gray-300 animate-pulse rounded-md"></div>
            <div className="w-24 h-4 bg-gray-300 animate-pulse rounded-md"></div>
          </h2>

          <div className="mt-2 px-6 gap-10 items-center">
            {/* Temperature */}
            <div className="flex flex-col px-4 text-center">
              <div className="w-24 h-24 bg-gray-300 animate-pulse mx-auto mb-4 rounded-full"></div>
              <div className="w-32 h-4 bg-gray-300 animate-pulse mx-auto mb-2 rounded-md"></div>
              <div className="w-40 h-4 bg-gray-300 animate-pulse mx-auto rounded-md"></div>
            </div>

            {/* Time and Weather Icons */}
            <div className="w-full pr-3 flex justify-between gap-10 sm:gap-16 items-center overflow-x-auto">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 text-xs text-center py-3 font-semibold"
                >
                  <div className="w-16 h-4 bg-gray-300 animate-pulse mx-auto mb-2 rounded-md"></div>
                  <div className="w-12 h-12 bg-gray-300 animate-pulse mx-auto mb-2 rounded-full"></div>
                  <div className="w-16 h-4 bg-gray-300 animate-pulse mx-auto rounded-md"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Left */}
          <div className="w-32 h-16 bg-gray-300 animate-pulse mx-auto rounded-md"></div>
          {/* Right */}
          <div className="w-full h-24 bg-gray-300 animate-pulse rounded-md"></div>
        </div>
      </section>

      {/* Data 7 Forecast */}
      <section className="w-full flex flex-col gap-4">
        <p className="w-40 h-6 bg-gray-300 animate-pulse rounded-md"></p>

        {[...Array(7)].map((_, i) => (
          <div key={i} className="flex flex-col gap-4">
            <div className="w-full h-24 bg-gray-300 animate-pulse rounded-md"></div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default SkeletonLoader;
