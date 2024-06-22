'use server'

import parseVideoIdFromYoutubeLink from "@/utils/parseVideoIdFromYoutubeLink";
import { YoutubeCommentThread, YoutubeCommentsThreadListResponse, YoutubeThunmbnailPropertyType, YoutubeVideoListResponse } from "../type";
import YOUTUBE_API from "@/constants/YoutubeComment";
import calculateChunkRequests from "@/utils/calculateChunkRequests";
import relayFetch from "@/utils/relayFetch";
import parsedYoutubeCommentThread from "@/utils/parsedYoutubeCommentThread";

export async function fetchYoutubeCommentThread(link:string, nextPage = '', maxResults=100):Promise<YoutubeCommentsThreadListResponse>{
  const {COMMENTS:{THREAD:{API_END_POINT,PARTS}}} = YOUTUBE_API
  try{
    const videoId = parseVideoIdFromYoutubeLink(link);
    if(!videoId) throw new Error('유튜브 링크가 정확하지 않습니다!')
      
    const fetchUrl = `${API_END_POINT}?part=${PARTS}&videoId=${videoId}${nextPage && `&pageToken=${nextPage}`}&maxResults=${maxResults}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
    const response = await fetch(fetchUrl);
    if(!response.ok) throw new Error('유튜브 api요청에 실패했습니다.')
      
    return response.json()
  } catch(e){
    console.error(e)
    throw e
  }
}

export interface YoutubeVideoCustomData {
  title:string;
  channelTitle:string;
  commentCount:number;
  thumbnail:YoutubeThunmbnailPropertyType;
}

export async function fetchYoutubeVideoMetadata(link:string):Promise<YoutubeVideoCustomData>{
  const {VIDEO:{API_END_POINT,PARTS}} = YOUTUBE_API;
  try{
    const videoId = parseVideoIdFromYoutubeLink(link);
    if(!videoId) throw new Error('유튜브 링크가 정확하지 않습니다!')
      
    const fetchUrl = `${API_END_POINT}?part=${PARTS}&id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
    const response = await fetch(fetchUrl);
    if(!response.ok) throw new Error('유튜브 api요청에 실패했습니다')
      
    const videoMetaData:YoutubeVideoListResponse = await response.json();
    const videoItem = videoMetaData.items[0];
    
    const {title,channelTitle,thumbnails:{default:thumbnailsDefault}} = videoItem.snippet;
    const {commentCount} = videoItem.statistics;
    
    return {
      title,
      channelTitle,
      thumbnail:thumbnailsDefault,
      commentCount: +commentCount,
    }
  } catch(e){
    console.error(e)
    throw e
  }
}

export async function fetchYoutubeToplevelComments(link:string, commentCount:number):Promise<{[key:string]:string}[]>{

  try{
    const chunkPerRequest = calculateChunkRequests(commentCount,YOUTUBE_API.COMMENTS.THREAD.MAX_RESULTS);
    
    const comments = await relayFetch({
      fetchFn:(nextPage:string) => fetchYoutubeCommentThread(link,nextPage),
      initialParam: '',
      nextParam: (response:YoutubeCommentsThreadListResponse) => response.nextPageToken,
      maxCount:chunkPerRequest
    })
    const parsedComments = comments.map((comment) => parsedYoutubeCommentThread(comment.items));
    
    return parsedComments
  } catch(e){
    console.error('getYoutubeVideoCumstomData error', e);
    throw e
  }
}

