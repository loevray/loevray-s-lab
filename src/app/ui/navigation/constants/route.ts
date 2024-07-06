import { BeakerIcon, HomeIcon,  LifebuoyIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import { MappedRoutesStyleType } from "../Navigation";
import LadderIcon from "../LadderIcon";


 const ROUTES:{
  STYLE:MappedRoutesStyleType
 } = {
  STYLE:{
    "/": {
      name: "메인",
      backgroundColor: "md:bg-gray",
      icon:HomeIcon
      
    },
    "spin-wheel": {
      name: "룰렛",
      backgroundColor: "md:bg-cyan-300",
      icon: LifebuoyIcon
    },
    "youtube-comment-raffle": {
      name: "유튜브 댓글 추첨",
      backgroundColor: "md:bg-yellow-300",
      icon: PlayCircleIcon
    },
    "ghost-leg":{
      name:"사다리 타기",
      backgroundColor:"md:bg-pink-200",
      icon:LadderIcon
    },
    "lab-1":{
      name:"실험실",
      backgroundColor:"md:bg-emerald-200",
      icon: BeakerIcon
    }
  },
 }

export default ROUTES;
