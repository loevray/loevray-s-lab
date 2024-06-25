import { CustomCommentDataType } from "@/utils/parsedYoutubeCommentThread";
import Comment from "./Comment";

interface CommentListProps {
  comments: CustomCommentDataType[];
  toggledComments: { [key: string]: boolean };
  onSortTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onCommentClick: (id: string) => (e: React.MouseEvent<HTMLDivElement>) => void;
}
const CommentList = ({
  comments,
  toggledComments,
  onSortTypeChange,
  onCommentClick,
}: CommentListProps) => {
  return (
    <div className="flex flex-col w-full gap-4 ">
      {!!comments.length && (
        <select
          className="w-10 border-2 border-solid border-black"
          onChange={onSortTypeChange}
          disabled={!comments.length}
        >
          <option>최신순</option>
          <option>좋아요순</option>
        </select>
      )}
      <div className="flex flex-col h-60 overflow-y-auto pr-2 gap-1.4">
        {comments.map((comment) => (
          <Comment
            isToggled={!!toggledComments[comment.commentId]}
            key={comment.commentId}
            {...comment}
            onClick={onCommentClick(comment.commentId)}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentList;
