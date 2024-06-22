"use client";

import {
  fetchYoutubeCommentThread,
  fetchYoutubeVideoMetadata,
  getYoutubeVideoCustomData,
} from "@/app/youtube-comment-raffle/lib/actions";
import { useRef, useState } from "react";
import { YoutubeVideoListResponse } from "./type";

const Page = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [comments, setComments] = useState<{ [key: string]: string }>();
  return (
    <main className="w-full h-full flex justify-around items-center">
      <form
        className="flex flex-col"
        onSubmit={async (e) => {
          e.preventDefault();
          const result = await getYoutubeVideoCustomData(
            inputRef.current?.value || ""
          );
          console.log(result);
        }}
      >
        <label>유튜브 링크를 넣어주세요!</label>
        <input
          placeholder="주소를 입력하쇼"
          className="w-50 h-4 border-2 border-black border-solid"
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
        {comments &&
          Object.entries(comments).map(([nickname, comment]) => (
            <span key={nickname}>{`${nickname}님의 댓글 : ${comment}`}</span>
          ))}
        dddddd
      </div>
    </main>
  );
};

export default Page;
