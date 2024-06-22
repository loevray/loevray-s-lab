import { YoutubeCommentThread } from "@/app/youtube-comment-raffle/type";

const parsedYoutubeCommentThread = (data: YoutubeCommentThread[]): { [key: string]: string } => 
  data.reduce((acc, {snippet: {topLevelComment: {snippet: {authorDisplayName, textOriginal}}}}) => {
    acc[authorDisplayName] = textOriginal;
    return acc;
  }, {} as { [key: string]: string });


export default parsedYoutubeCommentThread
