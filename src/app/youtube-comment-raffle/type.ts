interface YoutubeCommentsThreadListResponse {
    kind: "youtube#commentListResponse",
    etag: string
    nextPageToken: string,
    pageInfo: {
      totalResults: number,
      resultsPerPage: number
    },
    items: YoutubeCommentThread[]
}

interface YoutubeCommentThread {
    kind: "youtube#commentThread",
    etag: string
    id: string,
    snippet: {
      channelId: string,
      videoId: string,
      topLevelComment: YoutubeComments
      canReply: boolean,
      totalReplyCount: number
      isPublic: boolean
    },
    replies?: {
      comments: YoutubeComments[]
    }
}

interface YoutubeComments {
  kind: "youtube#comment",
  etag: string,
  id: string,
  snippet: {
    authorDisplayName: string,
    authorProfileImageUrl: string,
    authorChannelUrl: string,
    authorChannelId: {
      value: string
    },
    videoId:string,
    channelId: string,
    textDisplay: string,
    textOriginal: string,
    parentId?: string,
    canRate: boolean,
    viewerRating: string,
    likeCount: Number,
    moderationStatus?: string,
    publishedAt: string, // ISO 8601 formatted date type
    updatedAt: string // ISO 8601 formatted date type
  }
}
