const YOUTUBE_API_BASE_URL = 'https://youtube.googleapis.com/youtube/v3';

const YOUTUBE_API = {
  COMMENTS:{
    THREAD:{
      API_END_POINT:`${YOUTUBE_API_BASE_URL}/commentThreads`,
      PARTS:"snippet",
      MAX_RESULTS:100,
    },
    LIST:{
      API_END_POINT:`${YOUTUBE_API_BASE_URL}/comments`,
      PARTS:"snippet"
    }
  },
  VIDEO:{
    API_END_POINT:`${YOUTUBE_API_BASE_URL}/videos`,
    PARTS:"snippet,statistics"
  },
  TEST_VIDEO_ID: "ZHaOU6E4pWU",
  
}

export default YOUTUBE_API
