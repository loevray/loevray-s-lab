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

const Page = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [comments, setComments] = useState<CustomCommentDataType[]>([]);
  const [videoData, setVideoData] = useState<YoutubeVideoCustomData>({
    title: "영상 제목",
    channelTitle: "채널 이름",
    commentCount: 0,
    viewCount: 0,
    thumbnail: {
      url: "https://placehold.co/600x400/png",
      width: 500,
      height: 300,
    },
  });
  const [commentListMode, setCommentListMode] = useState<{
    thread: boolean;
    reply: boolean;
  }>({
    thread: true,
    reply: false,
  });

  const onRadioButtonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setCommentListMode((prev) => ({ ...prev, [value]: true }));
  };

  const raffleComment = () => {
    if (videoData && comments.length) {
      const maxNumber = videoData.commentCount;
      const [winnerIndex] = raffle({ low: 1, high: maxNumber });
      const winner = comments[winnerIndex];
      const { authorDisplayName, textOriginal } = winner;
      alert(`${authorDisplayName}: ${textOriginal}`);
    }
  };

  const handleSubmitYoutubeLink = async (e: React.FormEvent) => {
    e.preventDefault();

    const link = inputRef.current?.value || "";

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
    <main className="w-full h-full flex justify-center">
      <section className="w-1/2 flex flex-col items-center px-2 gap-7">
        <VideoInfo {...videoData} />
        <div className="w-full flex items-center gap-6">
          <h1 className="text-2 font-bold">1. 유튜브 링크 삽입</h1>
          <form className="flex flex-col" onSubmit={handleSubmitYoutubeLink}>
            <label className="text-1.2 text-gray-500">
              ex{")"} youtube.com/watch?v=xxx, youtu.be/xxx,
              youtube.com/shorts/xxx
            </label>
            <div className="flex">
              <input
                placeholder="https://youtube.com/watch?v=videoId"
                className="w-45 h-3 pl-1 shadow-xl bg-yellow-50 focus:bg-yellow-100 focus:outline-none"
                name="link"
                ref={inputRef}
              />
              <Button text="검색" colorPalette="rin" className="shadow-xl" />
            </div>
          </form>
        </div>

        <div className="w-full flex items-center gap-6">
          <h1 className="text-2 font-bold">2. 댓글 유형 선택</h1>
          <form className="flex gap-2">
            <div>
              <input
                className="h-1.5"
                type="radio"
                name="youtube-comments"
                value="thread"
                onChange={onRadioButtonChange}
                defaultChecked={commentListMode.thread}
                id="thread"
              />
              <label htmlFor="thread">댓글 목록</label>
            </div>
            <div>
              <input
                className="h-1.5"
                type="radio"
                name="youtube-comments"
                data-name="comments"
                value="reply"
                onChange={onRadioButtonChange}
                defaultChecked={commentListMode.reply}
                id="reply"
              />
              <label htmlFor="reply">답글 목록</label>
            </div>
            <Button
              type="button"
              text="불러오기"
              colorPalette="rin"
              className="w-15"
            />
          </form>
        </div>

        <div className="w-full flex items-center gap-6">
          <h1 className="text-2 font-bold">3. 추첨 방식 결정</h1>
          <div>몇명인지?</div>
        </div>
      </section>
      <section className="w-1/2 flex flex-col items-center">
        <div className="flex flex-col h-70 w-full overflow-y-auto gap-1.6 px-2">
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
