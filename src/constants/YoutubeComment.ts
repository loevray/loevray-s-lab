const YOUTUBE_COMMENTS = {
  COMMENTS_THREAD : {
    API_END_POINT:"https://youtube.googleapis.com/youtube/v3/commentThreads",
    PARTS:"snippet"
  },
  COMMENTS_LIST: {
    API_END_POINT:"https://youtube.googleapis.com/youtube/v3/comments",
    PARTS:"snippet"
  },
  VIDEO_METADATA:{
    API_END_POINT:"https://youtube.googleapis.com/youtube/v3/videos",
    PARTS:"snippet,contentDetails,statistics"
  },
  TEST_VIDEO_ID: "ZHaOU6E4pWU"
}

export default YOUTUBE_COMMENTS
