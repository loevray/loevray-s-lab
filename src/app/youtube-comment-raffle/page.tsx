"use client";

import {
  YoutubeVideoCustomData,
  fetchYoutubeToplevelComments,
  fetchYoutubeVideoMetadata,
} from "@/app/youtube-comment-raffle/lib/actions";
import raffle from "@/utils/raffle";
import { useRef, useState } from "react";
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

export type SortType = {
  [key in "좋아요순" | "최신순"]: boolean;
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

  const onSortTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if (value === "좋아요순") {
      console.log("좋아요순");
      setComments((prev) =>
        structuredClone(prev).sort((a, b) => b.likeCount - a.likeCount)
      );
    } else {
      console.log("최신순");
      setComments((prev) =>
        structuredClone(prev).sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        )
      );
    }
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

  const handleSubmitYoutubeLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const link = youtubeInputRef.current?.value || "";
    console.log("hi");
    //react hook form 등으로 validation필요
    if (link === "") return alert("링크가 존재하지 않습니다");

    const videoData = await fetchYoutubeVideoMetadata(link);
    setVideoData(videoData);
  };

  const handleSubmitCommentList = async (e: React.FormEvent) => {
    e.preventDefault();
    const link = youtubeInputRef.current?.value || "";
    if (link === "") return alert("링크가 존재하지 않습니다!");

    const commentData = await fetchYoutubeToplevelComments(
      link,
      videoData.commentCount
    );
    setComments(commentData);
  };

  return (
    <main className="w-full h-full flex justify-center text-amber-950">
      <section className="w-1/2 flex flex-col items-center px-2 gap-7 pt-7">
        <VideoInfo {...videoData} />
        <div className="w-full flex items-center gap-6">
          <h1 className="text-2 font-bold">1. 유튜브 링크 삽입</h1>
          <YoutubeLinkForm
            inputRef={youtubeInputRef}
            handleSubmit={handleSubmitYoutubeLink}
          />
        </div>
        <div className="w-full flex items-center gap-6">
          <h1 className="text-2 font-bold">2. 댓글 유형 선택</h1>
          <CommentTypeForm
            onChange={onCommentTypeChange}
            commentType={commentType}
            handleSubmit={handleSubmitCommentList}
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
      <section className="w-1/2 flex flex-col items-center gap-6">
        <div className="flex flex-col w-full gap-4 ">
          {!!comments.length && (
            <select
              className="w-10 border-2 border-solid border-black"
              onChange={onSortTypeChange}
              disabled={!comments.length}
            >
              <option>최신순</option>
              <option>좋아요순</option>
            </select>
          )}
          <div className="flex flex-col h-60 overflow-y-auto pr-2 gap-1.4">
            {comments.map((comment) => (
              <Comment
                key={`${comment.authorDisplayName}${comment.publishedAt}`}
                {...comment}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
