'use server'

import parseVideoIdFromYoutubeLink from "@/utils/parseVideoIdFromYoutubeLink";
import { YoutubeCommentThread, YoutubeCommentsThreadListResponse, YoutubeThunmbnailPropertyType, YoutubeVideoListResponse } from "../type";
import YOUTUBE_API from "@/constants/YoutubeComment";
import calculateChunkRequests from "@/utils/calculateChunkRequests";


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

export async function fetchYoutubeVideoMetadata(link:string):Promise<YoutubeVideoListResponse>{
  const {VIDEO:{API_END_POINT,PARTS}} = YOUTUBE_API
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
  comments:YoutubeCommentsThreadListResponse[]
}

interface RelayFetchProps<T, K> {
  initialParam: T;
  maxCount: number;
  fetchFn: (param: T) => Promise<K>; // fetchFn이 Promise를 반환한다는 것을 명시
  nextParam: (response: K) => T;
}

const relayFetch = async <T, K>({ fetchFn, maxCount, initialParam, nextParam }: RelayFetchProps<T, K>) => {
  const iteration = Array(maxCount).fill(0).map((_, i) => i);
  const result: K[] = [];
  let response: Awaited<K> | undefined;
  
  for await (const count of iteration) {
    response = await fetchFn(count === 0 ? initialParam : nextParam(response!)); 
    result.push(response);
  }
  
  return result;
};

export async function getYoutubeVideoCustomData(link:string):Promise<YoutubeVideoCustomData>{

  try{
    const videoMetaData = await fetchYoutubeVideoMetadata(link);
    const videoItem = videoMetaData.items[0];
    const {title,channelTitle,thumbnails:{default:thumbnailsDefault}} = videoItem.snippet;
    const {commentCount} = videoItem.statistics
    
    const chunkPerRequest = calculateChunkRequests(+commentCount,YOUTUBE_API.COMMENTS.THREAD.MAX_RESULTS);
    
    const comments = await relayFetch({
      fetchFn:(nextPage:string) => fetchYoutubeCommentThread(link,nextPage),
      initialParam: '',
      nextParam: (response:YoutubeCommentsThreadListResponse) => response.nextPageToken,
      maxCount:chunkPerRequest
    })
    
    
    return {
      title,
      channelTitle,
      thumnail:thumbnailsDefault,
      commentCount:+commentCount, 
      comments
    }
  } catch(e){
    console.error('getYoutubeVideoCumstomData error', e);
    throw e
  }
      

}

