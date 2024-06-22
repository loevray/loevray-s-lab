"use client";

import {
  YoutubeVideoCustomData,
  fetchYoutubeToplevelComments,
  fetchYoutubeVideoMetadata,
} from "@/app/youtube-comment-raffle/lib/actions";
import { useRef, useState } from "react";

const Page = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [comments, setComments] = useState<{ [key: string]: string }[]>([]);
  const [videoData, setVideoData] = useState<YoutubeVideoCustomData>();
  return (
    <main className="w-full h-full flex flex-col justify-center items-center">
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
        <div>
          <input
            className="h-1.5"
            type="radio"
            name="youtube-comments"
            data-name="thread"
          />
          <label>댓글 리스트 가져오기</label>
        </div>
        <div>
          <input
            className="h-1.5"
            type="radio"
            name="youtube-comments"
            data-name="comments"
          />
          <label>답글 리스트 가져오기</label>
        </div>
        <button className="border-2 border-solid border-black w-10 mt-1">
          가져왓!!!
        </button>
      </form>
      <div className="flex flex-col">
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
    </main>
  );
};

export default Page;
