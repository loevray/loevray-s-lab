"use client";

import {
  YoutubeVideoCustomData,
  fetchYoutubeToplevelComments,
  fetchYoutubeVideoMetadata,
} from "@/app/youtube-comment-raffle/lib/actions";
import { useMemo, useState } from "react";
import VideoInfo from "../ui/youtube-comment-raflle/VideoInfo";
import YoutubeLinkForm from "../ui/youtube-comment-raflle/YoutubeLinkForm";
import WinnerCountForm from "../ui/youtube-comment-raflle/WinnerCountForm";

import Button from "../ui/common/Button";
import Comment from "../ui/youtube-comment-raflle/Comment";
import WinnerModal from "../ui/youtube-comment-raflle/WinnerModal";
import { useForm } from "react-hook-form";

import { raffle } from "@/utils/raffle";
import DUMMY from "@/constants/Dummys";
import {
  NormalizedYoutubeCommentType,
  YoutubeCommentType,
} from "@/utils/parsedYoutubeCommentThread";

export type SortType = {
  [key in "좋아요순" | "최신순"]: boolean;
};

export type CommentType = {
  thread: boolean;
  reply: boolean;
};

export type SortOptionType = "original" | "newest" | "like";

const Page = () => {
  const [commentsData, setCommentsData] =
    useState<NormalizedYoutubeCommentType>({
      comments: {},
      allIds: [],
    });
  const [sortOption, setSortOption] = useState<SortOptionType>("original");

  const [winnerComments, setWinnerComments] = useState<YoutubeCommentType[]>(
    []
  );
  const isCommentDataEmpty = !!!commentsData.allIds.length;

  const origianlComments = commentsData.allIds.map(
    (id) => commentsData.comments[id]
  );

  const sortedComments = useMemo(() => {
    switch (sortOption) {
      case "like":
        return [...origianlComments].sort((a, b) => b.likeCount - a.likeCount);

      case "newest":
        return [...origianlComments].sort(
          (a, b) =>
            new Date(a.publishedAt).getTime() -
            new Date(b.publishedAt).getTime()
        );
      default:
        return origianlComments;
    }
  }, [sortOption, origianlComments]);

  const [videoData, setVideoData] = useState<YoutubeVideoCustomData>(
    DUMMY.VIDEO_CUSTOM_DATA
  );
  const isVideoDataEmpty = !!!videoData.commentCount;

  const [isWinnerModalOpen, setIsWinnerModalOpen] = useState(false);

  const [commentType, setCommentType] = useState<CommentType>({
    thread: true,
    reply: false,
  });

  const [toggledComments, setToggledComments] = useState<{
    [key: string]: boolean;
  }>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues: getWinnerCountFromValues,
    setValue,
  } = useForm<{ winnerCount: number }>({
    mode: "onChange",
    defaultValues: {
      winnerCount: 1,
    },
  });

  const {
    register: registerYoutubeLink,
    handleSubmit: handleSubmitYoutubeLinkForm,
    formState: { errors: youtubeLinkFormErros },
    setValue: setYoutubeLinkFormValue,
  } = useForm<{ youtubeLink: string }>();

  const initializeStates = () => {
    if (isCommentDataEmpty || isVideoDataEmpty) return;
    setVideoData(DUMMY.VIDEO_CUSTOM_DATA);
    setCommentsData({
      comments: {},
      allIds: [],
    });
    setToggledComments({});
    setValue("winnerCount", 1);
    setYoutubeLinkFormValue("youtubeLink", "");
  };

  const onCommentTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setCommentType((prev) => ({ ...prev, [value]: true }));
  };

  const onSortTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSortOption(value as SortOptionType);
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

  const onCommentClick =
    (clickedId: string) =>
    (e: React.MouseEvent<HTMLDivElement>, id: string = clickedId) => {
      const selectedComment = commentsData.comments[id];

      const winnerCount = getWinnerCountFromValues("winnerCount");

      const isSelected = toggledComments[id];

      if (!winnerCount) {
        return alert("당첨자 수를 결정해주세요!");
      }

      if (isSelected) {
        onSelectedCommentClick(id);
        return;
      }

      const isLimitWinners =
        Object.keys(toggledComments).length + 1 > +winnerCount;

      if (isLimitWinners) {
        return alert(`${winnerCount}명을 모두 고르셨습니다`);
      }

      onNotSelectedCommentClick(id);
    };

  const raffleComment = () => {
    if (isVideoDataEmpty) return alert("비디오 데이터가 없어요!");
    if (isCommentDataEmpty) return alert("댓글 데이터가 없어요!");

    const winners = new Set<string>();

    for (const key in toggledComments) {
      winners.add(key);
    }

    const winnerCount = getWinnerCountFromValues("winnerCount");

    const newWinners = raffle<YoutubeCommentType>(
      sortedComments,
      winners,
      winnerCount,
      (item) => item.commentId
    );

    setIsWinnerModalOpen(true);
    setWinnerComments(newWinners);
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

    setCommentsData(commentData);
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
      <main className="w-full h-full flex justify-center text-amber-950">
        <section className="w-1/2 flex flex-col items-center gap-7 pt-7">
          <VideoInfo {...videoData} onClick={initializeStates} />
          <div className="w-full flex items-center ">
            <h1 className="text-2 font-bold w-20">1. 유튜브 링크 삽입</h1>
            <YoutubeLinkForm
              onSubmit={handleSubmitYoutubeLink}
              onCommentTypeChange={onCommentTypeChange}
              commentType={commentType}
              register={registerYoutubeLink}
              errors={youtubeLinkFormErros}
              handleSubmit={handleSubmitYoutubeLinkForm}
            />
          </div>
          <div className="w-full flex items-center">
            <h1 className="text-2 font-bold w-20">2. 추첨인원/방식</h1>
            선택:
            <WinnerCountForm
              errors={errors}
              register={register}
              disabled={isVideoDataEmpty}
              winnerCountLimit={origianlComments.length}
              handleSubmit={handleSubmit}
            />
            <span className="pr-2">
              중 댓글 목록에서 {Object.keys(toggledComments).length}명 선택 됨
            </span>
            <Button
              type="button"
              text="남은 인원 랜덤 추첨"
              colorPalette="rin"
              onClick={raffleComment}
              disabled={isCommentDataEmpty || !!errors.winnerCount}
              className="w-15"
            />
          </div>
        </section>
        <section className="w-1/2 max-w-70 flex flex-col items-center gap-6">
          <div className="flex flex-col w-full gap-4 ">
            {!isCommentDataEmpty && (
              <div>
                <select
                  className="w-10 border-2 border-solid border-black"
                  onChange={onSortTypeChange}
                  disabled={isCommentDataEmpty}
                >
                  <option value="newest">최신순</option>
                  <option value="like">좋아요순</option>
                </select>
                <span className="pl-1">댓글 총{origianlComments.length}개</span>
              </div>
            )}
            <div className="flex flex-col h-60 overflow-y-auto pr-2 gap-1.4">
              {sortedComments.map((comment) => (
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
