import { CustomCommentDataType } from "@/utils/parsedYoutubeCommentThread";
import Avatar from "../common/avatar/Avatar";
import getRelativeTime from "@/utils/getRelativeTime";
import { HTMLAttributes } from "react";

//코멘트 컴포넌트도 compound패턴 적용하면 좋아보임(임시)

interface CommentProps
  extends CustomCommentDataType,
    HTMLAttributes<HTMLDivElement> {
  isToggled?: boolean;
}
const Comment = ({
  authorDisplayName,
  authorProfileImageUrl,
  textOriginal,
  publishedAt,
  updatedAt,
  likeCount,
  isModified,
  commentId,
  onClick,
  isToggled = false,
  ...rest
}: CommentProps) => {
  return (
    <div
      {...rest}
      onClick={onClick}
      className={`flex gap-1 cursor-pointer bg-white shadow-md rounded-xl py-1 relative p-1 ${
        isToggled ? "brightness-75 hover:brightness-50" : "hover:brightness-90"
      }`}
      {...rest}
    >
      {isToggled && (
        <span className="text-3 text-green-500 absolute top-1/2 left-1/2 translate-y-[-50%]">
          ✔
        </span>
      )}
      <Avatar
        src={authorProfileImageUrl}
        alt={`${authorDisplayName}'s avatar`}
        width={50}
        height={50}
      />
      <div className="flex flex-col gap-0.4">
        <div className="flex items-center gap-0.4">
          <span className="text-1.4 font-bold">{authorDisplayName}</span>
          <span className="text-1.2 text-gray-400">
            {getRelativeTime(publishedAt)}
            {isModified && " (수정 됨)"}
          </span>
        </div>
        <span className="text-1.4">{textOriginal}</span>
        <div className="flex gap-1">
          <div>
            <span>👍</span>
            <span className="text-1.2 pl-0.5">{likeCount}</span>
          </div>
          <span>👎</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
