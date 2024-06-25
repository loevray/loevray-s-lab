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
import WinnerCountForm from "../ui/youtube-comment-raflle/WinnerCountForm";
import CommentList from "../ui/youtube-comment-raflle/CommentList";

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
  const winnerLimitInputRef = useRef<HTMLInputElement>(null);

  const [comments, setComments] = useState<CustomCommentDataType[]>([]);
  const [videoData, setVideoData] = useState<YoutubeVideoCustomData>(
    DEFAULT_VIDEO_CUSTOM_DATA
  );
  const [commentType, setCommentType] = useState<CommentType>({
    thread: true,
    reply: false,
  });
  const [winnerComments, setWinnerComments] = useState<CustomCommentDataType[]>(
    []
  );
  const [toggledComments, setToggledComments] = useState<{
    [key: string]: boolean;
  }>({});

  const onCommentTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setCommentType((prev) => ({ ...prev, [value]: true }));
  };

  const onSortTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if (value === "좋아요순") {
      return setComments((prev) =>
        structuredClone(prev).sort((a, b) => b.likeCount - a.likeCount)
      );
    }
    if (value === "최신순") {
      return setComments((prev) =>
        structuredClone(prev).sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        )
      );
    }
  };

  const onCommentClick =
    (id: string) => (e: React.MouseEvent<HTMLDivElement>) => {
      const selectedComment = comments.find(
        ({ commentId }) => commentId === id
      ) as CustomCommentDataType;
      const isSelected = !!winnerComments.find(
        ({ commentId }) => commentId === id
      );
      const currentWinnersCount = winnerLimitInputRef.current?.value;

      if (!currentWinnersCount) return alert("당첨자 수를 결정해주세요!");

      if (isSelected) {
        setWinnerComments((prev) =>
          prev.filter(({ commentId }) => commentId !== id)
        );
        setToggledComments((prev) => ({
          ...prev,
          [id]: false,
        }));
      } else {
        if (winnerComments.length + 1 > +currentWinnersCount)
          return alert(`${currentWinnersCount}명을 모두 고르셨습니다`);

        setWinnerComments((prev) => [
          ...prev,
          structuredClone(selectedComment),
        ]);
        setToggledComments((prev) => ({
          ...prev,
          [id]: true,
        }));
      }
    };

  const raffleComment = () => {
    if (!videoData) return alert("비디오 데이터가 없어요!");
    if (!comments.length) return alert("댓글 데이터가 없어요!");

    const maxNumber = videoData.commentCount;
    const [winnerIndex] = raffle({ low: 1, high: maxNumber });

    const winner = comments[winnerIndex];
    const { authorDisplayName, textOriginal } = winner;
    alert(`${authorDisplayName}: ${textOriginal}`);
  };

  const handleSubmitYoutubeLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const link = youtubeInputRef.current?.value || "";
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
          <h1 className="text-2 font-bold">2. 당첨자 수 결정</h1>
          <WinnerCountForm winnerCountInputRef={winnerLimitInputRef} />
        </div>
        <div className="w-full flex items-center gap-6">
          <h1 className="text-2 font-bold">3. 댓글 유형 선택</h1>
          <CommentTypeForm
            onChange={onCommentTypeChange}
            commentType={commentType}
            handleSubmit={handleSubmitCommentList}
          />
        </div>
      </section>
      <section className="w-1/2 flex flex-col items-center gap-6">
        <CommentList
          comments={comments}
          toggledComments={toggledComments}
          onSortTypeChange={onSortTypeChange}
          onCommentClick={onCommentClick}
        />
      </section>
    </main>
  );
};

export default Page;
