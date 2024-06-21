import REGEXP from "@/constants/Regex"

const parseVideoIdFromYoutubeLink = (link:string) => 
  link.match(REGEXP.YOUTUBE)?.[1]

export default parseVideoIdFromYoutubeLink
