const CommentSkeleton = () => {
  return (
    <div className="flex gap-1 cursor-pointer bg-white shadow-md rounded-xl py-1 relative p-1 border-[1px] animate-pulse">
      <div className="size-4 bg-gray-200 rounded-full"></div>
      <div className="flex flex-col gap-0.4">
        <div className="flex items-center gap-0.4">
          <div className="h-2 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="h-2 bg-gray-200 rounded w-full"></div>
        <div className="flex gap-1">
          <div>
            <span>👍</span>
            <span className="h-2 bg-gray-200 rounded pl-0.5"></span>
          </div>
          <span>👎</span>
        </div>
      </div>
    </div>
  );
};

export default CommentSkeleton;
