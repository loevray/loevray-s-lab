import { CustomCommentDataType } from "@/utils/parsedYoutubeCommentThread";
import Comment from "./Comment";

interface WinnerCommnetListProps {
  comments: CustomCommentDataType[];
}

const WinnerCommnetList = ({ comments }: WinnerCommnetListProps) => {
  return (
    <div className="flex flex-col w-full gap-1">
      {comments.map((comment) => (
        <Comment key={comment.commentId} {...comment} />
      ))}
    </div>
  );
};

export default WinnerCommnetList;
