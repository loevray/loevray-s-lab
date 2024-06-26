import { HTMLAttributes, RefObject, useRef } from "react";
import Button from "../common/Button";
import { CommentType } from "@/app/youtube-comment-raffle/page";

interface YoutubeLinkFormProps {
  inputRef: RefObject<HTMLInputElement>;
  handleSubmit: HTMLAttributes<HTMLFormElement>["onSubmit"];
  onChange: HTMLAttributes<HTMLInputElement>["onChange"];
  commentType: CommentType;
}

const YoutubeLinkForm = ({
  inputRef,
  handleSubmit,
  onChange,
  commentType,
}: YoutubeLinkFormProps) => {
  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="flex pb-1 gap-1">
        <div>
          <input
            className="h-1.5"
            type="radio"
            name="youtube-comments"
            value="thread"
            onChange={onChange}
            defaultChecked={commentType.thread}
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
            onChange={onChange}
            defaultChecked={commentType.reply}
            id="reply"
          />
          <label htmlFor="reply">답글 목록(구현중)</label>
        </div>
      </div>
      <label className="text-1.2 text-gray-500">
        ex{")"} youtube.com/watch?v=xxx, youtu.be/xxx, youtube.com/shorts/xxx
      </label>
      <div className="flex">
        <input
          placeholder="https://youtube.com/watch?v=videoId"
          className="w-45 h-3 pl-1 shadow-xl bg-yellow-50 focus:bg-yellow-100 focus:outline-none"
          name="link"
          ref={inputRef}
        />
        <Button
          type="submit"
          text="검색"
          colorPalette="rin"
          className="shadow-xl"
        />
      </div>
    </form>
  );
};

export default YoutubeLinkForm;
