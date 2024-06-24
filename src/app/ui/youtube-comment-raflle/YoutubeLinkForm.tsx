import { HTMLAttributes, RefObject, useRef } from "react";
import Button from "../common/Button";

interface YoutubeLinkFormProps {
  inputRef: RefObject<HTMLInputElement>;
  handleSubmit: HTMLAttributes<HTMLFormElement>["onSubmit"];
}

const YoutubeLinkForm = ({ inputRef, handleSubmit }: YoutubeLinkFormProps) => {
  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
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
