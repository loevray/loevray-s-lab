export interface YoutubeCommentsThreadListResponse {
    kind: "youtube#commentListResponse",
    etag: string
    nextPageToken: string,
    pageInfo: {
      totalResults: number,
      resultsPerPage: number
    },
    items: YoutubeCommentThread[]
}

export interface YoutubeCommentThread {
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

export interface YoutubeComments {
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

type YoutubeThumbnailKeyType = 'default' | 'high' | 'maxres' | 'medium' | 'standard'

export type YoutubeThunmbnailPropertyType = {
  url: string;
  width: number;
  height: number;
}

type YoutubeThumbnailType = {
  [key in YoutubeThumbnailKeyType] :YoutubeThunmbnailPropertyType
}
export interface YoutubeVideo {
  kind: "youtube#video";
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: YoutubeThumbnailType;
    channelTitle: string;
    tags: string[];
    categoryId: string;
    liveBroadcastContent: string;
    defaultLanguage: string;
    localized: {
      title: string;
      description: string;
    };
    defaultAudioLanguage: string;
  };
  contentDetails: {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
    regionRestriction: {
      allowed: string[];
      blocked: string[];
    };
    contentRating: {
      [key: string]: string;
    };
    projection: string;
    hasCustomThumbnail: boolean;
  };
  status: {
    uploadStatus: string;
    failureReason: string;
    rejectionReason: string;
    privacyStatus: string;
    publishAt: string;
    license: string;
    embeddable: boolean;
    publicStatsViewable: boolean;
    madeForKids: boolean;
    selfDeclaredMadeForKids: boolean;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    dislikeCount: string;
    favoriteCount: string;
    commentCount: string;
  };
  player: {
    embedHtml: string;
    embedHeight: number;
    embedWidth: number;
  };
  topicDetails: {
    topicIds: string[];
    relevantTopicIds: string[];
    topicCategories: string[];
  };
  recordingDetails: {
    recordingDate: string;
  };
  fileDetails: {
    fileName: string;
    fileSize: number;
    fileType: string;
    container: string;
    videoStreams: {
      widthPixels: number;
      heightPixels: number;
      frameRateFps: number;
      aspectRatio: number;
      codec: string;
      bitrateBps: number;
      rotation: string;
      vendor: string;
    }[];
    audioStreams: {
      channelCount: number;
      codec: string;
      bitrateBps: number;
      vendor: string;
    }[];
    durationMs: number;
    bitrateBps: number;
    creationTime: string;
  };
  processingDetails: {
    processingStatus: string;
    processingProgress: {
      partsTotal: number;
      partsProcessed: number;
      timeLeftMs: number;
    };
    processingFailureReason: string;
    fileDetailsAvailability: string;
    processingIssuesAvailability: string;
    tagSuggestionsAvailability: string;
    editorSuggestionsAvailability: string;
    thumbnailsAvailability: string;
  };
  suggestions: {
    processingErrors: string[];
    processingWarnings: string[];
    processingHints: string[];
    tagSuggestions: {
      tag: string;
      categoryRestricts: string[];
    }[];
    editorSuggestions: string[];
  };
  liveStreamingDetails: {
    actualStartTime: string;
    actualEndTime: string;
    scheduledStartTime: string;
    scheduledEndTime: string;
    concurrentViewers: number;
    activeLiveChatId: string;
  };
  localizations: {
    [key: string]: {
      title: string;
      description: string;
    };
  };
}

export interface YoutubeVideoListResponse {
  kind: "youtube#videoListResponse";
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YoutubeVideo[];
}
