import { MappedRoutesStyleType } from "../Navigation";


 const ROUTES:{
  STYLE:MappedRoutesStyleType
 } = {
  STYLE:{
    "/": {
      name: "메인",
      backgroundColor: "md:bg-gray",
    },
    "spin-wheel": {
      name: "룰렛",
      backgroundColor: "md:bg-cyan-300",
    },
    "youtube-comment-raffle": {
      name: "유튜브 댓글 추첨",
      backgroundColor: "md:bg-yellow-300",
    },
    "ghost-leg":{
      name:"사다리 타기",
      backgroundColor:"md:bg-pink-200"
    }
  },
 }

export default ROUTES;
