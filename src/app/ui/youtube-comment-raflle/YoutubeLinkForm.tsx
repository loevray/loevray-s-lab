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
import YoutubeIcon from "./YoutubeIcon";

interface YoutubeLinkFormProps {
  onSubmit: SubmitHandler<{ youtubeLink: string }>;
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
      <label htmlFor="youtubeLink" className="text-1.8 font-semibold">
        Youtube Link
      </label>
      <label className="text-1.2 text-gray-500">
        ex{")"} youtube.com/watch?v=xxx, youtu.be/xxx, youtube.com/shorts/xxx
      </label>
      <div className="flex items-center w-60 h-3.5 relative">
        <input
          id="yotubeLink"
          placeholder="Please fill out YouTube link"
          className="w-full h-full pl-1 pr-5 shadow-xl focus:outline-none text-1.8"
          {...register("youtubeLink", {
            required: "링크를 입력해주세요",
          })}
        />
        <label className="absolute bottom-[-3rem] text-red-500 text-1.2">
          {errors.youtubeLink?.message}
        </label>
        <button className="w-4.5 h-3 z-50 absolute right-0" type="submit">
          <YoutubeIcon />
        </button>
      </div>
    </form>
  );
};

export default YoutubeLinkForm;
