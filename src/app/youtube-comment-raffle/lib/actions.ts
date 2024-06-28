'use server'

import parseVideoIdFromYoutubeLink from "@/utils/parseVideoIdFromYoutubeLink";
import { YoutubeCommentsThreadListResponse, YoutubeThunmbnailPropertyType, YoutubeVideoListResponse } from "../type";
import YOUTUBE_API from "@/constants/YoutubeComment";
import calculateChunkRequests from "@/utils/calculateChunkRequests";
import relayFetch from "@/utils/relayFetch";
import parsedYoutubeCommentThread, { NormalizedYoutubeCommentType,  } from "@/utils/parsedYoutubeCommentThread";

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
  viewCount:number;
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
    
    const {title,channelTitle,thumbnails:{standard}} = videoItem.snippet;
    const {commentCount, viewCount} = videoItem.statistics;
    
    return {
      title,
      channelTitle,
      thumbnail:standard,
      commentCount: +commentCount,
      viewCount: +viewCount
    }
  } catch(e){
    console.error(e)
    throw e
  }
}

export async function fetchYoutubeToplevelComments(link:string, commentCount:number):Promise<NormalizedYoutubeCommentType>{

  try{
    const chunkPerRequest = calculateChunkRequests(commentCount,YOUTUBE_API.COMMENTS.THREAD.MAX_RESULTS);
    
    const comments = await relayFetch({
      fetchFn:(nextPage:string) => fetchYoutubeCommentThread(link,nextPage),
      initialParam: '',
      nextParam: (response:YoutubeCommentsThreadListResponse) => response.nextPageToken,
      maxCount:chunkPerRequest
    })
    
    const commentItems = comments.flatMap((comment) => comment.items);
    const parsedComments = parsedYoutubeCommentThread(commentItems);
    
    return parsedComments;
  } catch(e){
    console.error('getYoutubeVideoCumstomData error', e);
    throw e
  }
}

