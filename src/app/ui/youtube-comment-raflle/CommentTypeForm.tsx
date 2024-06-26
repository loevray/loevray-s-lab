import { HTMLAttributes } from "react";
import Button from "../common/Button";

interface CommentTypeFormProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  commentType: CommentType;
}

export type CommentType = {
  thread: boolean;
  reply: boolean;
};

const CommentTypeForm = ({ onChange, commentType }: CommentTypeFormProps) => {
  return (
    <form className="flex gap-2">
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
    </form>
  );
};

export default CommentTypeForm;
