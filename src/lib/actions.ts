'use server'

import REGEXP from "@/constants/Regex";

export async function fetchYoutubeCommentList(link:string){
  try{
    const data = await fetch(link)
    return data.json()
  } catch(e){
    console.error(e)
  }
}

export async function testFn(formData:FormData){
  const link = formData.get('link') as string;
  const match = link.match(REGEXP.YOUTUBE);
  
  console.log(match?.[1])  
}
