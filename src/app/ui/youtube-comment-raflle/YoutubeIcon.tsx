const YoutubeIcon = () => {
  return (
    <div className="bg-red-500 rounded-[20%] w-full h-full relative ">
      <svg
        className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10"
        width="14"
        height="14"
        viewBox="0 0 200 200"
      >
        <polygon points="20,20 180,100 20,180" fill="white" />
      </svg>
    </div>
  );
};

export default YoutubeIcon;
