import DUMMY from "@/constants/Dummys"
import parsedYoutubeCommentThread from "./parsedYoutubeCommentThread"



test('parse youtube comment like { name: comment }', () => {
  const result = {
    "@Jmsae": "ㅅㅂ 한인이었던거냐고ㅋㅋㅋㅋㅋㅋㅋㅋ",
    "@belltea584": "ㅋㅋㅋㅋㅋㅋㅋㅋ",
    "@mcskyhorse": "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
    "@mono_5323": "기다렸다고오",
    "@natuur033": "ㅋㅋㅋㅋㅋㅋㅋ",
    "@propital": "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ <br>개재밌네",
    "@user-kt9dz2zl1b": "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
    "@user-qk4cz4df5q": "마지막ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
    "@user-tk6fi1gp7g": "아니 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ뻘짓님 왤케 재밌어요 ㅋㅋㅋㅋㅋㅋ복숭아 테디베어 외국인 진짜 개웃기네 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
    "@user-up8wv4jk6t": "빅헤드님 많이 많이 괴롭혀주세요😊",
    }
  expect(parsedYoutubeCommentThread(DUMMY.YOUTUBE_COMMENTS)).toEqual(result)
})
