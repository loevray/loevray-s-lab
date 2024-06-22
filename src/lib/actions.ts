'use server'

import YOUTUBE_COMMENTS from "@/constants/YoutubeComment";
import parseVideoIdFromYoutubeLink from "@/utils/parseVideoIdFromYoutubeLink";


export async function fetchYoutubeCommentThread(link:string){
  const {COMMENTS_THREAD:{API_END_POINT,PARTS}} = YOUTUBE_COMMENTS
  try{
    const videoId = parseVideoIdFromYoutubeLink(link);
    if(!videoId) return new Error('유튜브 링크가 정확하지 않습니다!')
      
    const fetchUrl = `${API_END_POINT}?part=${PARTS}&videoId=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
    const data = await fetch(fetchUrl);
    if(data.ok) return data.json() 
  } catch(e){
    console.error(e)
    alert(e)
  }
}

export async function fetchYoutubeVideoMetadata(link:string){
  const {VIDEO_METADATA:{API_END_POINT,PARTS}} = YOUTUBE_COMMENTS
  try{
    const videoId = parseVideoIdFromYoutubeLink(link);
    if(!videoId) return new Error('유튜브 링크가 정확하지 않습니다!')
      
    const fetchUrl = `${API_END_POINT}?part=${PARTS}&id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
    const data = await fetch(fetchUrl);
    if(data.ok) return data.json() 
  } catch(e){
    console.error(e)
    alert(e)
  }
}

export async function getEntireYoutubeCommentThread (){
  /* 
    1. 비디오 데이터 긁어오기
      1-1. 영상제목, 썸네일 보여주기
    2. 현재 댓글 카운트를 기반으로 몇개씩 fetchYoutubeCommentThread할건지 계산하기 => 함수제작(페이지 네이션 같은 함수)
    3.promise.all로 fetchyoutubecommentThread묶어서 fetching
    4.모든 댓글 저장 후 추첨
  */
}

export const calculateChunkRequests = (maxChunkPerReuqest:number, totalChunk:number) => Math.ceil(maxChunkPerReuqest/totalChunk)
