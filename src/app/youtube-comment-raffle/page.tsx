"use client";

import {
  YoutubeVideoCustomData,
  fetchYoutubeToplevelComments,
  fetchYoutubeVideoMetadata,
} from "@/app/youtube-comment-raffle/lib/actions";
import { MouseEvent, useCallback, useMemo, useState } from "react";
import YoutubeLinkForm from "../ui/youtube-comment-raflle/YoutubeLinkForm";
import WinnerCountForm from "../ui/youtube-comment-raflle/WinnerCountForm";

import Button from "../ui/common/Button";
import Comment from "../ui/youtube-comment-raflle/Comment/Comment";
import WinnerModal from "../ui/youtube-comment-raflle/WinnerModal";
import { useForm } from "react-hook-form";

import { raffle } from "@/utils/raffle";
import DUMMY from "@/constants/Dummys";
import {
  NormalizedYoutubeCommentType,
  YoutubeCommentType,
} from "@/utils/parsedYoutubeCommentThread";
import CommentSkeleton from "../ui/youtube-comment-raflle/Comment/CommentSkeleton";
import VideoInfo from "../ui/youtube-comment-raflle/VideoInfo/VideoInfo";
import useLoadingState, { UseLoadingStateType } from "@/hooks/useLoadingState";

export type SortOptionType = "original" | "newest" | "like";

export type LoadingStates = "comments" | "video";

const SKELETONS = Array(10).fill(0);

const Page = () => {
  const [commentsData, setCommentsData] =
    useState<NormalizedYoutubeCommentType>({
      comments: {},
      allIds: [],
    });

  const [isLoading, setIsLoading] = useLoadingState<LoadingStates>({
    comments: "initial",
    video: "initial",
  });

  const [winnerComments, setWinnerComments] = useState<YoutubeCommentType[]>(
    []
  );

  const [options, setOptions] = useState<{
    duplicatedId: boolean;
  }>({
    duplicatedId: false,
  });

  const isCommentDataEmpty = !!!commentsData.allIds.length;

  const originalComments = useMemo(
    () => commentsData.allIds.map((id) => commentsData.comments[id]),
    [commentsData.allIds]
  );

  const filterComments = (comments: YoutubeCommentType[]) => {
    if (options.duplicatedId) {
      const uniqueSet = new Set();
      const uniqueCommentData: YoutubeCommentType[] = [];

      comments.forEach((comment) => {
        if (!uniqueSet.has(comment.authorChannelId)) {
          uniqueSet.add(comment.authorChannelId);
          uniqueCommentData.push({ ...structuredClone(comment) });
        } else {
          console.log(comment);
        }
      });

      return uniqueCommentData;
    }
    return originalComments;
  };

  const comments = filterComments(originalComments);

  const [videoData, setVideoData] = useState<YoutubeVideoCustomData>(
    DUMMY.VIDEO_CUSTOM_DATA
  );
  const isVideoDataEmpty = !!!videoData.commentCount;

  const [isWinnerModalOpen, setIsWinnerModalOpen] = useState(false);

  const [toggledComments, setToggledComments] = useState<{
    [key: string]: boolean;
  }>({});

  const toggledCommentsLength = Object.keys(toggledComments).length;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<{ winnerCount: number }>({
    mode: "onChange",
    defaultValues: {
      winnerCount: 1,
    },
  });

  const winnerCount = watch("winnerCount");

  const {
    register: registerYoutubeLink,
    handleSubmit: handleSubmitYoutubeLinkForm,
    formState: { errors: youtubeLinkFormErros },
    setValue: setYoutubeLinkFormValue,
  } = useForm<{ youtubeLink: string }>();

  const initializeStates = () => {
    if (isCommentDataEmpty || isVideoDataEmpty) return;
    setIsLoading((prev) => {
      const newState = {} as UseLoadingStateType<LoadingStates>;
      for (const key in prev) {
        newState[key as LoadingStates] = "initial";
      }
      return newState;
    });
    setVideoData(DUMMY.VIDEO_CUSTOM_DATA);
    setCommentsData({
      comments: {},
      allIds: [],
    });
    setToggledComments({});
    setValue("winnerCount", 1);
    setYoutubeLinkFormValue("youtubeLink", "");
  };

  const onSelectedCommentClick = (id: string) => {
    setToggledComments((prev) => {
      const prevToggleComments = {
        ...prev,
      };
      delete prevToggleComments[id];
      return prevToggleComments;
    });
  };

  const onNotSelectedCommentClick = (id: string) => {
    setToggledComments((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const onCommentClick = useCallback(
    (e: MouseEvent, id: string, isSelected: boolean, canToggle: boolean) => {
      if (!winnerCount) {
        return alert("당첨자 수를 결정해주세요!");
      }

      if (isSelected) {
        onSelectedCommentClick(id);
        return;
      }

      if (!canToggle) {
        return alert(`${winnerCount}명을 모두 고르셨습니다`);
      }

      onNotSelectedCommentClick(id);
    },
    [winnerCount]
  );

  const raffleComment = () => {
    if (isVideoDataEmpty) return alert("비디오 데이터가 없어요!");
    if (isCommentDataEmpty) return alert("댓글 데이터가 없어요!");

    const winners = new Set<string>();

    for (const key in toggledComments) {
      winners.add(key);
    }

    const newWinners = raffle<YoutubeCommentType>(
      comments,
      winners,
      winnerCount,
      (item) => item.commentId
    );

    setIsWinnerModalOpen(true);
    setWinnerComments(newWinners);
  };

  const handleSubmitYoutubeLink = async (data: { youtubeLink: string }) => {
    const link = data.youtubeLink;
    if (link === "") return alert("링크가 존재하지 않습니다");

    setIsLoading((prev) => ({
      ...prev,
      video: "pending",
    }));
    const fetchedVideoData = await fetchYoutubeVideoMetadata(link);
    setVideoData(fetchedVideoData);
    setIsLoading((prev) => ({
      ...prev,
      video: "fulfilled",
    }));

    setIsLoading((prev) => ({
      ...prev,
      comments: "pending",
    }));
    const commentData = await fetchYoutubeToplevelComments(
      link,
      fetchedVideoData.commentCount
    );

    setCommentsData(commentData);
    setIsLoading((prev) => ({
      ...prev,
      comments: "fulfilled",
    }));
  };

  const handleWinnerModalClose = () => {
    setIsWinnerModalOpen(false);
  };

  return (
    <>
      <WinnerModal
        open={isWinnerModalOpen}
        onClose={handleWinnerModalClose}
        winnerComments={winnerComments}
      />
      <main className="w-full h-full flex justify-between text-amber-950 px-7">
        <section className="flex flex-col gap-6.5 items-center pt-5">
          <VideoInfo {...videoData} onClick={initializeStates} />
          <div className="w-full flex items-center ">
            <YoutubeLinkForm
              onSubmit={handleSubmitYoutubeLink}
              register={registerYoutubeLink}
              errors={youtubeLinkFormErros}
              handleSubmit={handleSubmitYoutubeLinkForm}
            />
          </div>
          <div className="w-full flex items-end text-1.8">
            <WinnerCountForm
              errors={errors}
              register={register}
              disabled={isVideoDataEmpty}
              winnerCountLimit={comments.length}
              winnerCountMin={Math.max(1, toggledCommentsLength)}
              handleSubmit={handleSubmit}
            />
            <div className="flex gap-1 items-end pl-1">
              <span className="font-semibold">
                {Object.keys(toggledComments).length}명
              </span>
              <span>선택 됨</span>
              {!isCommentDataEmpty && (
                <Button
                  type="button"
                  text={
                    winnerCount > toggledCommentsLength
                      ? "남은인원 랜덤 추첨"
                      : "종료"
                  }
                  colorPalette="rin"
                  onClick={raffleComment}
                  disabled={isCommentDataEmpty || !!errors.winnerCount}
                  className="w-15"
                />
              )}
            </div>
          </div>
        </section>
        <section className="flex-1 max-w-70 flex flex-col items-center gap-6">
          <div className="flex flex-col w-full gap-4 ">
            {!isCommentDataEmpty && (
              <div className="flex gap-1">
                <form>
                  <input
                    type="checkbox"
                    id="duplicated-id"
                    onChange={(e) => {
                      setOptions({
                        duplicatedId: e.target.checked,
                      });
                    }}
                  />
                  <label htmlFor="duplicated-id">중복 아이디 제거</label>
                </form>
                <span>댓글 총{comments.length}개</span>
              </div>
            )}
            <div className="flex flex-col h-60 overflow-y-auto pr-2 gap-1.4">
              {isLoading.comments === "pending" &&
                SKELETONS.map((el, i) => <CommentSkeleton key={i} />)}
              {isLoading.comments === "fulfilled" &&
                !isCommentDataEmpty &&
                comments.map((comment) => (
                  <Comment
                    canToggle={toggledCommentsLength < winnerCount}
                    isToggled={!!toggledComments[comment.commentId]}
                    key={comment.commentId}
                    {...comment}
                    onClick={onCommentClick}
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
