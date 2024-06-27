import { YoutubeVideoCustomData } from "@/app/youtube-comment-raffle/lib/actions";
import Card from "../common/card/Card";
import CardImage from "../common/card/CardImage";
import getRelativeViecountUnit from "@/utils/getRelativeViewcountUnit";

interface VideoInfoProps extends Omit<YoutubeVideoCustomData, "commentCount"> {}
const VideoInfo = ({
  title,
  channelTitle,
  thumbnail,
  viewCount,
}: VideoInfoProps) => {
  return (
    <Card className="hover:brightness-[.85] cursor-pointer w-34 h-27">
      <CardImage
        src={thumbnail.url}
        width={thumbnail.width}
        height={thumbnail.height}
        alt="youtube-thumbnail"
      />
      <Card.Content className="flex flex-col p-0.5">
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
