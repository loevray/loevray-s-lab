import { useState } from "react";
import {
  YoutubeVideoCustomData,
  fetchYoutubeVideoMetadata,
} from "../lib/actions";

const DEFAULT_VIDEO_CUSTOM_DATA = {
  title: "영상 제목",
  channelTitle: "채널 이름",
  commentCount: 0,
  viewCount: 0,
  thumbnail: {
    url: "https://placehold.co/400x200/png",
    width: 500,
    height: 300,
  },
};

const useVideoData = () => {
  const [videoData, setVideoData] = useState<YoutubeVideoCustomData>(
    DEFAULT_VIDEO_CUSTOM_DATA
  );

  const fetchVideoData = async (link: string) => {
    const fetchedVideoData = await fetchYoutubeVideoMetadata(link);
    setVideoData(fetchedVideoData);
  };

  return { videoData, fetchVideoData, setVideoData };
};

export default useVideoData;
