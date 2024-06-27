import { YoutubeCommentThread } from "@/app/youtube-comment-raffle/type"

const DUMMY = {
  YOUTUBE_COMMENTS:[
    {
      kind: "youtube#commentThread",
      etag: "etag1",
      id: "commentThread1",
      snippet: {
        channelId: "channelId1",
        videoId: "videoId1",
        topLevelComment: {
          kind: "youtube#comment",
          etag: "etag2",
          id: "comment1",
          snippet: {
            authorDisplayName: "User1",
            authorProfileImageUrl: "http://example.com/image1.jpg",
            authorChannelUrl: "http://example.com/channel1",
            authorChannelId: {
              value: "channelId1"
            },
            videoId: "videoId1",
            channelId: "channelId1",
            textDisplay: "This is a comment",
            textOriginal: "This is a comment",
            parentId: undefined,
            canRate: true,
            viewerRating: "none",
            likeCount: 5,
            moderationStatus: undefined,
            publishedAt: "2023-01-01T00:00:00Z",
            updatedAt: "2023-01-01T00:00:00Z"
          }
        },
        canReply: true,
        totalReplyCount: 2,
        isPublic: true
      }
    },
    {
      kind: "youtube#commentThread",
      etag: "etag3",
      id: "commentThread2",
      snippet: {
        channelId: "channelId2",
        videoId: "videoId2",
        topLevelComment: {
          kind: "youtube#comment",
          etag: "etag4",
          id: "comment2",
          snippet: {
            authorDisplayName: "User2",
            authorProfileImageUrl: "http://example.com/image2.jpg",
            authorChannelUrl: "http://example.com/channel2",
            authorChannelId: {
              value: "channelId2"
            },
            videoId: "videoId2",
            channelId: "channelId2",
            textDisplay: "This is another comment",
            textOriginal: "This is another comment",
            parentId: undefined,
            canRate: true,
            viewerRating: "none",
            likeCount: 3,
            moderationStatus: undefined,
            publishedAt: "2023-01-02T00:00:00Z",
            updatedAt: "2023-01-03T00:00:00Z"
          }
        },
        canReply: true,
        totalReplyCount: 0,
        isPublic: true
      }
    }
  ] as YoutubeCommentThread[],
  YOUTUBE_VIDEO:'',
  VIDEO_CUSTOM_DATA: {
    title: "영상 제목",
    channelTitle: "채널 이름",
    commentCount: 0,
    viewCount: 0,
    thumbnail: {
      url: "https://placehold.co/400x200/png",
      width: 500,
      height: 300,
    },
  }
  
}

export default DUMMY
