const VideoInfoSkeleton = () => {
  return (
    <div className="w-45 h-33 cursor-pointer relative group flex flex-col animate-pulse">
      <div className="w-full h-2/3 bg-gray-200 rounded"></div>
      <div className="flex-1 flex flex-col justify-around p-0.5">
        <div className="h-4 mb-2 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 mb-2 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default VideoInfoSkeleton;
