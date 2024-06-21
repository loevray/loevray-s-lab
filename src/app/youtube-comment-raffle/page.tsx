"use client";

import { fetchYoutubeCommentThread } from "@/lib/actions";
import parsedYoutubeCommentThread from "@/utils/parsedYoutubeCommentThread";
import { useRef, useState } from "react";

const Page = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [comments, setComments] = useState<{ [key: string]: string }>();
  return (
    <main className="w-full h-full flex flex-col justify-center items-center">
      <form
        className="flex flex-col"
        onSubmit={async (e) => {
          e.preventDefault();
          const data: YoutubeCommentsThreadListResponse =
            await fetchYoutubeCommentThread(inputRef.current?.value || "");

          setComments(parsedYoutubeCommentThread(data.items));
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
          추첨하깅~
        </button>
      </form>
      <div className="flex flex-col">
        {comments &&
          Object.entries(comments).map(([nickname, comment]) => (
            <span key={nickname}>{`${nickname}님의 댓글 : ${comment}`}</span>
          ))}
      </div>
    </main>
  );
};

export default Page;
