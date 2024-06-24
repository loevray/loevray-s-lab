"use client";

import {
  YoutubeVideoCustomData,
  fetchYoutubeToplevelComments,
  fetchYoutubeVideoMetadata,
} from "@/app/youtube-comment-raffle/lib/actions";
import raffle from "@/utils/raffle";
import { useRef, useState } from "react";
import Button from "../ui/common/Button";
import VideoInfo from "../ui/youtube-comment-raflle/VideoInfo";
import { CustomCommentDataType } from "@/utils/parsedYoutubeCommentThread";
import Comment from "../ui/youtube-comment-raflle/Comment";
import YoutubeLinkForm from "../ui/youtube-comment-raflle/YoutubeLinkForm";
import CommentTypeForm, {
  CommentType,
} from "../ui/youtube-comment-raflle/CommentTypeForm";

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

const Page = () => {
  const youtubeInputRef = useRef<HTMLInputElement>(null);
  const [comments, setComments] = useState<CustomCommentDataType[]>([]);
  const [videoData, setVideoData] = useState<YoutubeVideoCustomData>(
    DEFAULT_VIDEO_CUSTOM_DATA
  );
  const [commentType, setCommentType] = useState<CommentType>({
    thread: true,
    reply: false,
  });

  const onCommentTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setCommentType((prev) => ({ ...prev, [value]: true }));
  };

  const raffleComment = () => {
    if (!videoData) throw new Error("비디오 데이터가 없어요!");
    if (!comments.length) throw new Error("댓글 데이터가 없어요!");

    const maxNumber = videoData.commentCount;
    const [winnerIndex] = raffle({ low: 1, high: maxNumber });

    const winner = comments[winnerIndex];
    const { authorDisplayName, textOriginal } = winner;
    alert(`${authorDisplayName}: ${textOriginal}`);
  };

  const handleSubmitYoutubeLink =
    (link: string) => async (e: React.FormEvent) => {
      e.preventDefault();

      //react hook form 등으로 validation필요
      if (link === "") return alert("링크가 존재하지 않습니다");

      const videoData = await fetchYoutubeVideoMetadata(link);
      setVideoData(videoData);

      const commentData = await fetchYoutubeToplevelComments(
        link,
        videoData.commentCount
      );
      setComments(commentData);
    };

  return (
    <main className="w-full h-full flex justify-center text-amber-950">
      <section className="w-1/2 flex flex-col items-center px-2 gap-7">
        <VideoInfo {...videoData} />
        <div className="w-full flex items-center gap-6">
          <h1 className="text-2 font-bold">1. 유튜브 링크 삽입</h1>
          <YoutubeLinkForm
            inputRef={youtubeInputRef}
            handleSubmit={() =>
              handleSubmitYoutubeLink(youtubeInputRef.current?.value || "")
            }
          />
        </div>
        <div className="w-full flex items-center gap-6">
          <h1 className="text-2 font-bold">2. 댓글 유형 선택</h1>
          <CommentTypeForm
            onChange={onCommentTypeChange}
            commentType={commentType}
          />
        </div>
        <div className="w-full flex items-center gap-6">
          <h1 className="text-2 font-bold">3. 추첨 방식 결정</h1>
          <form>
            <input className="w-6.5 h-3 pl-1 shadow-xl bg-yellow-50 focus:bg-yellow-100 focus:outline-none" />
            명
          </form>
        </div>
      </section>
      <section className="w-1/2 flex flex-col items-center">
        <div>좋아요순, 최신순 정렬</div>
        <div className="flex flex-col h-60 w-full overflow-y-auto gap-1.6 px-2">
          {comments.map((comment) => (
            <Comment
              key={`${comment.authorDisplayName}${comment.publishedAt}`}
              {...comment}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Page;
