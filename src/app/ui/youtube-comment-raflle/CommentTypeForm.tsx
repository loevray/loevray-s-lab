import { HTMLAttributes } from "react";
import Button from "../common/Button";

interface CommentTypeFormProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  commentType: CommentType;
  handleSubmit: HTMLAttributes<HTMLFormElement>["onSubmit"];
}

export type CommentType = {
  thread: boolean;
  reply: boolean;
};

const CommentTypeForm = ({
  onChange,
  commentType,
  handleSubmit,
}: CommentTypeFormProps) => {
  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
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
        <label htmlFor="reply">답글 목록</label>
      </div>
      <Button type="submit" text="불러오기" colorPalette="rin" />
    </form>
  );
};

export default CommentTypeForm;
