'use server'

import YOUTUBE_COMMENTS from "@/constants/YoutubeComment";
import parseVideoIdFromYoutubeLink from "@/utils/parseVideoIdFromYoutubeLink";

export async function fetchYoutubeCommentThread(link:string){
  const {COMMENTS_THREAD, PARTS} = YOUTUBE_COMMENTS
  try{
    const videoId = parseVideoIdFromYoutubeLink(link);
    if(!videoId) return new Error('유튜브 링크가 정확하지 않습니다!')
    const data = await fetch(`${COMMENTS_THREAD}?part=${PARTS}&videoId=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`);
    if(data.ok) return data.json() 
  } catch(e){
    console.error(e)
    alert(e)
  }
}
