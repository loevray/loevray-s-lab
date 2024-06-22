"use client";

import {
  YoutubeVideoCustomData,
  fetchYoutubeToplevelComments,
  fetchYoutubeVideoMetadata,
} from "@/app/youtube-comment-raffle/lib/actions";
import YOUTUBE_API from "@/constants/YoutubeComment";
import { useRef, useState } from "react";

const Page = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [comments, setComments] = useState<{ [key: string]: string }[]>([]);
  const [videoData, setVideoData] = useState<YoutubeVideoCustomData>();

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
    if (videoData) {
      const maxNumber = videoData.commentCount;
      const winnerNumber = Math.floor(Math.random() * maxNumber) + 1;
      const winnerIndex = Math.floor(
        winnerNumber / YOUTUBE_API.COMMENTS.THREAD.MAX_RESULTS
      );
      const winner = Object.entries(comments[winnerIndex])[
        winnerIndex % YOUTUBE_API.COMMENTS.THREAD.MAX_RESULTS
      ];
      alert(`nickname:${winner[0]}, text:${winner[1]}`);
    }
  };

  return (
    <main className="w-full h-full flex justify-center">
      <section className="w-1/2 bg-gray-200 flex flex-col items-center">
        <form className="flex gap-2">
          <div>
            <input
              className="h-1.5"
              type="radio"
              name="youtube-comments"
              value="thread"
              onChange={onRadioButtonChange}
            />
            <label>특정 영상의 댓글 목록 가져오기</label>
          </div>
          <div>
            <input
              className="h-1.5"
              type="radio"
              name="youtube-comments"
              data-name="comments"
              value="reply"
              onChange={onRadioButtonChange}
            />
            <label>특정 댓글의 답글 목록 가져오기</label>
          </div>
        </form>
        <form
          className="flex flex-col"
          onSubmit={async (e) => {
            e.preventDefault();
            const videoData = await fetchYoutubeVideoMetadata(
              inputRef.current?.value || ""
            );

            setVideoData(videoData);

            const result = await fetchYoutubeToplevelComments(
              inputRef.current?.value || "",
              videoData.commentCount
            );

            console.log(result);
            setComments(result);
          }}
        >
          <label>유튜브 링크를 넣어주세요!</label>
          <input
            placeholder="https://youtube.com/watch?v=videoId"
            className="w-50 h-3.5 pl-1 border-2 border-black border-solid"
            name="link"
            ref={inputRef}
          />
          <div className="flex gap-2 pt-2">
            <button className="border-2 border-solid border-black w-10">
              가져왓!!!
            </button>
            <button
              disabled={!!!comments.length}
              className="border-2 border-solid border-black w-10"
              onClick={raffleComment}
              type="button"
            >
              추첨!!
            </button>
          </div>
        </form>
      </section>
      <section className="w-1/2 bg-teal-200 flex flex-col items-center">
        <div className="flex flex-col h-60 bg-red-200 w-full overflow-y-auto">
          {comments.length
            ? comments.map((commentChunk) =>
                Object.entries(commentChunk).map(([nickname, comment]) => (
                  <span
                    key={nickname}
                  >{`${nickname}님의 댓글 : ${comment}`}</span>
                ))
              )
            : null}
        </div>
      </section>
    </main>
  );
};

export default Page;
