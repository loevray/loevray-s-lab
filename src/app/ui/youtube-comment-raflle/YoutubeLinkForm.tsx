import { ComponentProps, HTMLAttributes, RefObject, useRef } from "react";
import Button from "../common/Button";
import { CommentType } from "@/app/youtube-comment-raffle/page";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm,
} from "react-hook-form";

interface YoutubeLinkFormProps {
  onSubmit: SubmitHandler<{ youtubeLink: string }>;
  onCommentTypeChange: ComponentProps<"input">["onChange"];
  commentType: CommentType;
  handleSubmit: UseFormHandleSubmit<
    {
      youtubeLink: string;
    },
    undefined
  >;
  errors: FieldErrors<{
    youtubeLink: string;
  }>;
  register: UseFormRegister<{
    youtubeLink: string;
  }>;
}

const YoutubeLinkForm = ({
  onSubmit,
  onCommentTypeChange,
  commentType,
  handleSubmit,
  errors,
  register,
}: YoutubeLinkFormProps) => {
  return (
    <form
      className="flex flex-col"
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
    >
      <div className="flex pb-1 gap-1">
        <div>
          <input
            className="h-1.5"
            type="radio"
            name="youtube-comments"
            value="thread"
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
            onChange={onCommentTypeChange}
            defaultChecked={commentType.reply}
            id="reply"
          />
          <label htmlFor="reply">답글 목록(구현중)</label>
        </div>
      </div>
      <label className="text-1.2 text-gray-500">
        ex{")"} youtube.com/watch?v=xxx, youtu.be/xxx, youtube.com/shorts/xxx
      </label>
      <div className="flex relative">
        <input
          placeholder="https://youtube.com/watch?v=videoId"
          className="w-45 h-3 pl-1 shadow-xl bg-yellow-50 focus:bg-yellow-100 focus:outline-none"
          {...register("youtubeLink", {
            required: "링크를 입력해주세요",
          })}
        />
        <label className="absolute bottom-[-3rem] text-red-500 text-1.2">
          {errors.youtubeLink?.message}
        </label>
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
