"use client";

import {
  YoutubeVideoCustomData,
  fetchYoutubeToplevelComments,
  fetchYoutubeVideoMetadata,
} from "@/app/youtube-comment-raffle/lib/actions";
import { useMemo, useState } from "react";
import VideoInfo from "../ui/youtube-comment-raflle/VideoInfo";
import { CustomCommentDataType } from "@/utils/parsedYoutubeCommentThread";
import YoutubeLinkForm from "../ui/youtube-comment-raflle/YoutubeLinkForm";
import WinnerCountForm from "../ui/youtube-comment-raflle/WinnerCountForm";

import Button from "../ui/common/Button";
import Comment from "../ui/youtube-comment-raflle/Comment";
import WinnerModal from "../ui/youtube-comment-raflle/WinnerModal";
import { useForm } from "react-hook-form";

import { raffle } from "@/utils/raffle";
import DUMMY from "@/constants/Dummys";

export type SortType = {
  [key in "좋아요순" | "최신순"]: boolean;
};

export type CommentType = {
  thread: boolean;
  reply: boolean;
};

const Page = () => {
  const [comments, setComments] = useState<CustomCommentDataType[]>([]);

  const [videoData, setVideoData] = useState<YoutubeVideoCustomData>(
    DUMMY.VIDEO_CUSTOM_DATA
  );

  const [isWinnerModalOpen, setIsWinnerModalOpen] = useState(false);

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<{ winnerCount: number }>({
    mode: "onChange",
    defaultValues: {
      winnerCount: 1,
    },
  });

  const winnerCount = watch("winnerCount");

  const initializeStates = () => {
    setToggledComments({});
    setWinnerComments({
      selected: [],
      all: [],
    });
    setComments([]);
    setValue("winnerCount", 1);
  };

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

  const onSelectedCommentClick = (id: string) => {
    setWinnerComments((prev) => ({
      ...structuredClone(prev),
      selected: prev.selected.filter(({ commentId }) => commentId !== id),
    }));

    setToggledComments((prev) => ({
      ...prev,
      [id]: false,
    }));
  };

  const onNotSelectedCommentClick = (
    id: string,
    selectedComment: CustomCommentDataType
  ) => {
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
  };

  const onCommentClick =
    (clickedId: string) =>
    (e: React.MouseEvent<HTMLDivElement>, id: string = clickedId) => {
      const selectedComment = comments.find(
        ({ commentId }) => commentId === id
      ) as CustomCommentDataType;

      const isSelected = !!winnerComments.selected.find(
        ({ commentId }) => commentId === id
      );

      if (!winnerCount) {
        return alert("당첨자 수를 결정해주세요!");
      }

      if (isSelected) {
        onSelectedCommentClick(id);
        return;
      }

      const isLimitWinners = winnerComments.selected.length + 1 > +winnerCount;

      if (isLimitWinners) {
        return alert(`${winnerCount}명을 모두 고르셨습니다`);
      }

      onNotSelectedCommentClick(id, selectedComment);
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

    const newWinners = raffle<CustomCommentDataType>(
      comments,
      winners,
      winnerCount,
      (item) => item.commentId
    );

    setWinnerComments((prev) => ({
      ...prev,
      all: [...newWinners],
    }));

    setIsWinnerModalOpen(true);
  };

  const handleSubmitYoutubeLink = async (data: { youtubeLink: string }) => {
    if (videoData.commentCount) {
      initializeStates();
    }

    const link = data.youtubeLink;
    if (link === "") return alert("링크가 존재하지 않습니다");

    const fetchedVideoData = await fetchYoutubeVideoMetadata(link);
    setVideoData(fetchedVideoData);

    const commentData = await fetchYoutubeToplevelComments(
      link,
      fetchedVideoData.commentCount
    );
    setComments(commentData);
  };

  const handleWinnerModalClose = () => {
    setIsWinnerModalOpen(false);
  };

  const leftWinner = winnerCount - winnerComments.selected.length;

  return (
    <>
      <WinnerModal
        open={isWinnerModalOpen}
        onClose={handleWinnerModalClose}
        winnerComments={winnerComments.all}
      />
      <main className="w-full h-full flex justify-center text-amber-950">
        <section className="w-1/2 flex flex-col items-center px-2 gap-7 pt-7">
          <VideoInfo {...videoData} />
          <div className="w-full flex items-center ">
            <h1 className="text-2 font-bold w-20">1. 유튜브 링크 삽입</h1>
            <YoutubeLinkForm
              onSubmit={handleSubmitYoutubeLink}
              onCommentTypeChange={onCommentTypeChange}
              commentType={commentType}
            />
          </div>
          <div className="w-full flex items-center">
            <h1 className="text-2 font-bold w-20">2. 추첨인원/방식</h1>
            총
            <WinnerCountForm
              errors={errors}
              register={register}
              disabled={!comments.length}
              winnerCountLimit={comments.length - 1}
              handleSubmit={handleSubmit}
            />
            <span className="pr-2">
              중 댓글 목록에서 {winnerComments.selected.length}명 선택 됨
            </span>
            <Button
              type="button"
              text={leftWinner ? `남은 ${leftWinner}명 랜덤추첨` : "추첨 종료"}
              colorPalette="rin"
              onClick={raffleComment}
              disabled={!comments.length || !!errors.winnerCount}
              className="w-15"
            />
          </div>
        </section>
        <section className="w-1/2 max-w-70 flex flex-col items-center gap-6">
          <div className="flex flex-col w-full gap-4 ">
            {!!comments.length && (
              <div>
                <select
                  className="w-10 border-2 border-solid border-black"
                  onChange={onSortTypeChange}
                  disabled={!comments.length}
                >
                  <option>최신순</option>
                  <option>좋아요순</option>
                </select>
                <span className="pl-1">댓글 총{comments.length}개</span>
              </div>
            )}
            <div className="flex flex-col h-60 overflow-y-auto pr-2 gap-1.4">
              {comments.map((comment) => (
                <Comment
                  isToggled={!!toggledComments[comment.commentId]}
                  key={comment.commentId}
                  {...comment}
                  onClick={onCommentClick(comment.commentId)}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;
