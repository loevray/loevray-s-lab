"use client";

import { useEffect, useState } from "react";

const PARTS = "snippet";
const VIDEO_ID = "FYrcyaSnK8Q";
const COMMENTS_THREAD =
  "https://youtube.googleapis.com/youtube/v3/commentThreads";
const COMMENTS_LIST = "https://youtube.googleapis.com/youtube/v3/comments";
const Page = () => {
  useEffect(() => {
    fetch(
      `${COMMENTS_THREAD}?part=${PARTS}&videoId=${VIDEO_ID}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <main className="w-full h-full flex justify-center items-center">
      <form className="flex flex-col">
        <label>여기 주소입력ㄱ</label>
        <input
          placeholder="주소를 입력하쇼"
          className="w-50 border-2 border-black border-solid"
        />
        <button className="border-2 border-solid border-black w-10 mt-1">
          추첨하깅~
        </button>
      </form>
    </main>
  );
};

export default Page;
