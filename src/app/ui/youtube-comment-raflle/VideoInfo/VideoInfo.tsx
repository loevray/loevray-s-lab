import { YoutubeVideoCustomData } from "@/app/youtube-comment-raffle/lib/actions";
import getRelativeViecountUnit from "@/utils/getRelativeViewcountUnit";
import Card from "../../common/card/Card";
import CardImage from "../../common/card/CardImage";

interface VideoInfoProps extends Omit<YoutubeVideoCustomData, "commentCount"> {
  onClick: () => void;
}
const VideoInfo = ({
  title,
  channelTitle,
  thumbnail,
  viewCount,
  onClick,
}: VideoInfoProps) => {
  return (
    <Card
      className="hover:bg-black hover:bg-opacity-[0.05] w-45 h-33 cursor-pointer relative group flex flex-col"
      onClick={onClick}
    >
      <button
        className={`absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-2 text-red-500 font-semibold bg-white rounded-full size-3.5 z-10  hidden ${
          viewCount > 0 ? "group-hover:block" : ""
        }`}
      >
        X
      </button>
      <CardImage
        src={thumbnail.url}
        width={thumbnail.width}
        height={thumbnail.height}
        alt="youtube-thumbnail"
        className="group-hover:brightness-90"
      />
      <Card.Content className="flex-1 flex flex-col justify-around p-0.5">
        <span className="font-bold truncate">{title}</span>
        <span className="text-gray-400 text-1.4">{channelTitle}</span>
        <span className="text-gray-400 text-1.4">
          조회수 {getRelativeViecountUnit(viewCount)}
        </span>
      </Card.Content>
    </Card>
  );
};

export default VideoInfo;
