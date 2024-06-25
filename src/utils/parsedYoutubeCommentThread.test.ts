import DUMMY from "@/constants/Dummys"
import parsedYoutubeCommentThread from "./parsedYoutubeCommentThread"



test('parse youtube comment like { name: comment }', () => {
  const result = [
    {
      authorDisplayName: "User1",
      textOriginal: "This is a comment",
      publishedAt: "2023-01-01T00:00:00Z",
      authorProfileImageUrl:'http://example.com/image1.jpg',
      updatedAt: "2023-01-01T00:00:00Z",
      likeCount: 5,
      isModified: false,
      id:'comment1'
    },
    {
      authorDisplayName: "User2",
      textOriginal: "This is another comment",
      publishedAt: "2023-01-02T00:00:00Z",
      authorProfileImageUrl:'http://example.com/image2.jpg',
      updatedAt: "2023-01-03T00:00:00Z",
      likeCount: 3,
      isModified: true,
      id:'comment2'
    }
  ]
  expect(parsedYoutubeCommentThread(DUMMY.YOUTUBE_COMMENTS)).toEqual(result)
})
