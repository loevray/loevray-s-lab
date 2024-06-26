"use client";

import {
  YoutubeVideoCustomData,
  fetchYoutubeToplevelComments,
  fetchYoutubeVideoMetadata,
} from "@/app/youtube-comment-raffle/lib/actions";
import raffle from "@/utils/raffle";
import { useMemo, useRef, useState } from "react";
import VideoInfo from "../ui/youtube-comment-raflle/VideoInfo";
import { CustomCommentDataType } from "@/utils/parsedYoutubeCommentThread";
import YoutubeLinkForm from "../ui/youtube-comment-raflle/YoutubeLinkForm";
import CommentTypeForm, {
  CommentType,
} from "../ui/youtube-comment-raflle/CommentTypeForm";
import WinnerCountForm from "../ui/youtube-comment-raflle/WinnerCountForm";

import Button from "../ui/common/Button";
import YoutubeCommentList from "../ui/youtube-comment-raflle/YoutubeCommentList";
import WinnerCommnetList from "../ui/youtube-comment-raflle/WinnerCommentList";

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
  const sortedByLike = useMemo(
    () => comments.toSorted((a, b) => b.likeCount - a.likeCount),
    [comments.length]
  );
  const sortedByNew = useMemo(
    () =>
      comments.toSorted(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      ),
    [comments.length]
  );

  const [videoData, setVideoData] = useState<YoutubeVideoCustomData>(
    DEFAULT_VIDEO_CUSTOM_DATA
  );

  const [commentType, setCommentType] = useState<CommentType>({
    thread: true,
    reply: false,
  });

  const [winnerComments, setWinnerComments] = useState<{
    [key in "selected" | "all"]: CustomCommentDataType[];
  }>({
    selected: [],
    all: [],
  });

  const [toggledComments, setToggledComments] = useState<{
    [key: string]: boolean;
  }>({});

  const leftWinner = useMemo(
    () =>
      +(winnerLimitInputRef.current?.value || 0) -
      winnerComments.selected.length,
    [winnerComments, winnerLimitInputRef, comments]
  );

  const onCommentTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setCommentType((prev) => ({ ...prev, [value]: true }));
  };

  const onSortTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if (value === "좋아요순") {
      return setComments(sortedByLike);
    }
    if (value === "최신순") {
      return setComments(sortedByNew);
    }
  };

  const onCommentClick =
    (id: string) => (e: React.MouseEvent<HTMLDivElement>) => {
      const selectedComment = comments.find(
        ({ commentId }) => commentId === id
      ) as CustomCommentDataType;

      const isSelected = !!winnerComments.selected.find(
        ({ commentId }) => commentId === id
      );
      const currentWinnersCount = winnerLimitInputRef.current?.value;

      if (!currentWinnersCount) return alert("당첨자 수를 결정해주세요!");

      if (isSelected) {
        setWinnerComments((prev) => ({
          ...structuredClone(prev),
          selected: prev.selected.filter(({ commentId }) => commentId !== id),
        }));

        setToggledComments((prev) => ({
          ...prev,
          [id]: false,
        }));
      } else {
        if (winnerComments.selected.length + 1 > +currentWinnersCount)
          return alert(`${currentWinnersCount}명을 모두 고르셨습니다`);

        setWinnerComments((prev) => ({
          ...structuredClone(prev),
          selected: [
            ...structuredClone(prev.selected),
            { ...structuredClone(selectedComment) },
          ],
        }));
        setToggledComments((prev) => ({
          ...prev,
          [id]: true,
        }));
      }
    };

  const raffleComment = () => {
    if (!videoData) return alert("비디오 데이터가 없어요!");
    if (!comments.length) return alert("댓글 데이터가 없어요!");

    const selectedCommentIdCheckMap = winnerComments.selected.reduce<{
      [key: string]: boolean;
    }>((acc, cur) => ({ ...acc, [cur.commentId]: true }), {});

    const winners = new Set<string>();

    for (const key in selectedCommentIdCheckMap) {
      winners.add(key);
    }

    const maxWinners = +(winnerLimitInputRef.current?.value || 0);

    while (winners.size < maxWinners) {
      const randomRange = Math.floor(Math.random() * comments.length) + 1;
      const winner = comments[randomRange].commentId;
      winners.add(winner);
    }

    const parsedComments = comments.reduce<{
      [key: string]: CustomCommentDataType;
    }>(
      (acc, cur) => ({
        ...structuredClone(acc),
        [cur.commentId]: { ...cur },
      }),
      {}
    );

    const newWinners: CustomCommentDataType[] = [];

    winners.forEach((winnerId) => {
      newWinners.push(parsedComments[winnerId]);
    });

    console.log(winners);

    setWinnerComments((prev) => ({
      ...prev,
      all: [...newWinners],
    }));
  };

  const handleSubmitYoutubeLink = async (e: React.FormEvent) => {
    e.preventDefault();

    const link = youtubeInputRef.current?.value || "";
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
      <section className="w-1/2 flex flex-col items-center px-2 gap-7 pt-7">
        <VideoInfo {...videoData} />
        <div className="w-full flex items-center ">
          <h1 className="text-2 font-bold w-20">1. 유튜브 링크 삽입</h1>
          <YoutubeLinkForm
            inputRef={youtubeInputRef}
            handleSubmit={handleSubmitYoutubeLink}
          />
        </div>
        <div className="w-full flex items-center ">
          <h1 className="text-2 font-bold w-20">2. 댓글 유형 선택</h1>
          <CommentTypeForm
            onChange={onCommentTypeChange}
            commentType={commentType}
          />
        </div>
        <div className="w-full flex items-center">
          <h1 className="text-2 font-bold w-20">3. 당첨자 수 입력</h1>
          <WinnerCountForm winnerCountInputRef={winnerLimitInputRef} />
        </div>
        <div className="w-full flex items-center">
          <h1 className="text-2 font-bold w-20">4. 추첨 방식 선택</h1>
          <span className="pr-2">
            댓글 목록에서 {winnerComments.selected.length}명 선택 됨
          </span>
          <Button
            type="button"
            text={leftWinner ? `남은 ${leftWinner}명 랜덤추첨` : "추첨 종료"}
            colorPalette="rin"
            onClick={raffleComment}
            disabled={!comments.length}
            className="w-15"
          />
        </div>
      </section>
      <section className="w-1/2 flex flex-col items-center gap-6">
        <YoutubeCommentList
          comments={comments}
          toggledComments={toggledComments}
          onSortTypeChange={onSortTypeChange}
          onCommentClick={onCommentClick}
        />
        <WinnerCommnetList comments={winnerComments.all} />
      </section>
    </main>
  );
};

export default Page;
