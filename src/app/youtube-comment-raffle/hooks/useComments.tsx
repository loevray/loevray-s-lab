import { CustomCommentDataType } from "@/utils/parsedYoutubeCommentThread";
import { useState } from "react";
import { fetchYoutubeToplevelComments } from "../lib/actions";

const useComments = () => {
  const [comments, setComments] = useState<CustomCommentDataType[]>([]);

  const fetchComments = async (link: string, commentCount: number) => {
    const commentData = await fetchYoutubeToplevelComments(link, commentCount);
    setComments(commentData);
  };

  return { comments, fetchComments, setComments };
};

export default useComments;
