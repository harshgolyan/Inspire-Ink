const Skeleton = () => {
  return (
    <div role="status" className="max-w-sm animate-pulse">
      <div className="h-auto w-[90vw] mx-5 border-b m-5 p-3 flex flex-col shadow-sm shadow-neutral-200">
        
        <div className="flex items-center mb-3">
          <div className="h-10 w-10 bg-neutral-200 rounded-full"></div>
          <div className="pl-4">
            <div className="h-2.5 bg-neutral-200 w-48 rounded mb-2"></div>
          </div>
        </div>
        <div className="mb-2">
          <div className="h-7 bg-neutral-200 w-48 rounded mb-2"></div>
        </div>
        <div className="mb-2 space-y-2">
          <div className="h-3 bg-neutral-200 w-full rounded"></div>
          <div className="h-3 bg-neutral-200 w-full rounded"></div>
          <div className="h-3 bg-neutral-200 w-3/4 rounded"></div>
        </div>
        <div className="mt-4">
          <div className="h-2.5 bg-neutral-200 w-32 rounded"></div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Skeleton;
