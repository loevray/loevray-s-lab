import { YoutubeCommentThread } from "@/app/youtube-comment-raffle/type";


export interface YoutubeCommentType {
    authorDisplayName:string;
    textOriginal:string;
    publishedAt:string;
    updatedAt:string;
    likeCount:number;
    authorProfileImageUrl:string;
    isModified:boolean;
    commentId:string;
    authorChannelId:string;
}

export interface NormalizedYoutubeCommentType {
  comments:{[key:string]:YoutubeCommentType}
  allIds:string[];
}

const parsedYoutubeCommentThread = (data: YoutubeCommentThread[]): NormalizedYoutubeCommentType => {
  const usedIds = new Set<string>();

  const customComments:NormalizedYoutubeCommentType = {
    comments:{},
    allIds:[]
  };
  

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
            authorChannelId:{
              value
            }
          },
        },
      },
    }) => {
      const commentId = id;
      if (usedIds.has(commentId)) {
        return; 
      }
      
      usedIds.add(commentId);
      

      customComments.comments[commentId] = {
        authorDisplayName,
        authorProfileImageUrl,
        textOriginal,
        publishedAt,
        updatedAt,
        likeCount,
        isModified: publishedAt !== updatedAt,
        authorChannelId:value,
        commentId,
      };
      
      customComments.allIds = Array.from(usedIds)
    }
    
  );

  return customComments;
};


export default parsedYoutubeCommentThread

// 닉네임, publishedAt, 수정됨(publishedAt !== updatedAt), 댓글내용, 좋아요
