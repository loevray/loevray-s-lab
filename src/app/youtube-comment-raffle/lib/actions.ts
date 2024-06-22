'use server'

import parseVideoIdFromYoutubeLink from "@/utils/parseVideoIdFromYoutubeLink";
import { YoutubeCommentsThreadListResponse, YoutubeThunmbnailPropertyType, YoutubeVideoListResponse } from "../type";
import YOUTUBE_API from "@/constants/YoutubeComment";


export async function fetchYoutubeCommentThread(link:string):Promise<YoutubeCommentsThreadListResponse>{
  const {COMMENTS:{THREAD:{API_END_POINT,PARTS}}} = YOUTUBE_API
  try{
    const videoId = parseVideoIdFromYoutubeLink(link);
    if(!videoId) throw new Error('유튜브 링크가 정확하지 않습니다!')
      
    const fetchUrl = `${API_END_POINT}?part=${PARTS}&videoId=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
    const response = await fetch(fetchUrl);
    if(!response.ok) throw new Error('유튜브 api요청에 실패했습니다.')
      
    return response.json()
  } catch(e){
    console.error(e)
    throw e
  }
}

export async function fetchYoutubeVideoMetadata(link:string):Promise<YoutubeVideoListResponse>{
  const {COMMENTS:{LIST:{API_END_POINT,PARTS}}} = YOUTUBE_API
  try{
    const videoId = parseVideoIdFromYoutubeLink(link);
    if(!videoId) throw new Error('유튜브 링크가 정확하지 않습니다!')
      
    const fetchUrl = `${API_END_POINT}?part=${PARTS}&id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
    const response = await fetch(fetchUrl);
    if(!response.ok) throw new Error('유튜브 api요청에 실패했습니다')
      
    return response.json();
  } catch(e){
    console.error(e)
    throw e
  }
}

interface YoutubeVideoCustomData {
  title:string;
  channelTitle:string;
  commentCount:number;
  thumnail:YoutubeThunmbnailPropertyType;
  comments:[]
}

export async function getYoutubeVideoCustomData(link:string):Promise<YoutubeVideoCustomData>{

  /* 
    1. 비디오 데이터 긁어오기
      1-1. 영상제목, 썸네일 보여주기
    2. 현재 댓글 카운트를 기반으로 몇개씩 fetchYoutubeCommentThread할건지 계산하기 => 함수제작(페이지 네이션 같은 함수)
    3.promise.all로 fetchyoutubecommentThread묶어서 fetching
    4.모든 댓글 저장 후 추첨
  */
  try{
    const videoMetaData = await fetchYoutubeVideoMetadata(link);
    const videoItem = videoMetaData.items[0];
    const {title,channelTitle,thumbnails:{default:thumbnailsDefault}} = videoItem.snippet;
    const {commentCount} = videoItem.statistics
    
    const chunkPerRequest = calculateChunkRequests(+commentCount,YOUTUBE_API.COMMENTS.THREAD.MAX_RESULTS);
    
    const promiseArray = [];
    for(let i = 0; i<chunkPerRequest; ++i){
      promiseArray.push()
     }
    
    
    return {
      title,channelTitle,thumnail:thumbnailsDefault,commentCount:+commentCount
    }
  } catch(e){
    console.error('getYoutubeVideoCumstomData error', e);
    throw e
  }
      

}

export const calculateChunkRequests = (maxChunkPerReuqest:number, totalChunk:number) => Math.ceil(maxChunkPerReuqest/totalChunk)
