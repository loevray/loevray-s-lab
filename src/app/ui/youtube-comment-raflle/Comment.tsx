import { CustomCommentDataType } from "@/utils/parsedYoutubeCommentThread";
import Avatar from "../common/Avatar/Avatar";
import getRelativeTime from "@/utils/getRelativeTime";

//코멘트 컴포넌트도 compound패턴 적용하면 좋아보임(임시)
const Comment = ({
  authorDisplayName,
  authorProfileImageUrl,
  textOriginal,
  publishedAt,
  likeCount,
  isModified,
}: CustomCommentDataType) => {
  return (
    <div className="flex gap-1 cursor-pointer bg-white shadow-md rounded-xl py-1 hover:brightness-90">
      <Avatar
        src={authorProfileImageUrl}
        alt={`${authorDisplayName}'s avatar`}
        width={50}
        height={50}
      />
      <div className="flex flex-col gap-0.4">
        <div className="flex items-center gap-0.4">
          <span className="font-bold">{authorDisplayName}</span>
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
