import { YoutubeCommentThread } from "@/app/youtube-comment-raffle/type";


export interface CustomCommentDataType  {
  authorDisplayName:string;
  textOriginal:string;
  publishedAt:string;
  updatedAt:string;
  likeCount:number;
  isModified:boolean
}

const parsedYoutubeCommentThread = (data: YoutubeCommentThread[]): CustomCommentDataType[] => 
  data.map(({snippet:
    {topLevelComment:
      {snippet:{authorDisplayName,textOriginal,publishedAt,updatedAt,likeCount}}
    }
  }) => ({authorDisplayName,textOriginal,publishedAt,updatedAt,likeCount,isModified:publishedAt !==updatedAt}));


export default parsedYoutubeCommentThread

// 닉네임, publishedAt, 수정됨(publishedAt !== updatedAt), 댓글내용, 좋아요
