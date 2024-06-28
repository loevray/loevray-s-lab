import { MappedRoutesStyleType } from "../Navigation";


 const ROUTES:{
  STYLE:MappedRoutesStyleType
 } = {
  STYLE:{
    "/": {
      name: "메인",
      backgroundColor: "bg-gray",
    },
    "spin-wheel": {
      name: "룰렛",
      backgroundColor: "bg-cyan-300",
    },
    "youtube-comment-raffle": {
      name: "유튜브 댓글 추첨",
      backgroundColor: "bg-yellow-300",
    },
  },
 }

export default ROUTES;
