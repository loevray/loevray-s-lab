import { YoutubeVideoCustomData } from "@/app/youtube-comment-raffle/lib/actions";
import Card from "../common/card/Card";
import CardImage from "../common/card/CardImage";

interface VideoInfoProps extends Omit<YoutubeVideoCustomData, "commentCount"> {}
const VideoInfo = ({
  title,
  channelTitle,
  thumbnail,
  viewCount,
}: VideoInfoProps) => {
  return (
    <Card>
      <CardImage
        src={thumbnail.url}
        width={thumbnail.width}
        height={thumbnail.height}
        alt="youtube-thumbnail"
      />
      <Card.Content className="flex flex-col">
        <span className="font-bold">{title}</span>
        <span className="text-gray-400 text-1.4">{channelTitle}</span>
        <span className="text-gray-400 text-1.4">조회수 {viewCount}회</span>
      </Card.Content>
    </Card>
  );
};

export default VideoInfo;
