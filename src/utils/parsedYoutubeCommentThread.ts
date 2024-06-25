import { YoutubeCommentThread } from "@/app/youtube-comment-raffle/type";


export interface CustomCommentDataType  {
  authorDisplayName:string;
  textOriginal:string;
  publishedAt:string;
  updatedAt:string;
  likeCount:number;
  authorProfileImageUrl:string;
  isModified:boolean;
  commentId:string;
}

const parsedYoutubeCommentThread = (data: YoutubeCommentThread[]): CustomCommentDataType[] => {
  const usedIds = new Set<string>();

  const customComments: CustomCommentDataType[] = [];

  data.forEach(
    ({
      snippet: {
        topLevelComment: {
          id,
          snippet: {
            authorDisplayName,
            authorProfileImageUrl,
            textOriginal,
            publishedAt,
            updatedAt,
            likeCount,
          },
        },
      },
    }) => {
      const commentId = id;
      
      if (usedIds.has(commentId)) {
        return; 
      }
      
      usedIds.add(commentId);

      customComments.push({
        authorDisplayName,
        authorProfileImageUrl,
        textOriginal,
        publishedAt,
        updatedAt,
        likeCount,
        isModified: publishedAt !== updatedAt,
        commentId,
      });
    }
  );

  return customComments;
};


export default parsedYoutubeCommentThread

// 닉네임, publishedAt, 수정됨(publishedAt !== updatedAt), 댓글내용, 좋아요
