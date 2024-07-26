import DUMMY from "@/constants/Dummys"
import parsedYoutubeCommentThread from "./parsedYoutubeCommentThread"



test('parse youtube comment like { name: comment }', () => {
  const result = {
    'comments':{
      'comment1':{
      authorDisplayName: "User1",
      authorChannelId:'channelId1',
      textOriginal: "This is a comment",
      publishedAt: "2023-01-01T00:00:00Z",
      authorProfileImageUrl:'http://example.com/image1.jpg',
      updatedAt: "2023-01-01T00:00:00Z",
      likeCount: 5,
      isModified: false,
      commentId:'comment1'
    },
    'comment2':{
      authorDisplayName: "User2",
      authorChannelId:'channelId2',
      textOriginal: "This is another comment",
      publishedAt: "2023-01-02T00:00:00Z",
      authorProfileImageUrl:'http://example.com/image2.jpg',
      updatedAt: "2023-01-03T00:00:00Z",
      likeCount: 3,
      isModified: true,
      commentId:'comment2'
    },
    },
    'allIds':['comment1','comment2']
  }
  expect(parsedYoutubeCommentThread(DUMMY.YOUTUBE_COMMENTS)).toEqual(result)
})
