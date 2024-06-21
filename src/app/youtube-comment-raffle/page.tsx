import YOUTUBE_COMMENTS from "@/constants/YoutubeComment";
import { testFn } from "@/lib/actions";
const { COMMENTS_THREAD, PARTS, TEST_VIDEO_ID } = YOUTUBE_COMMENTS;
const url = `${COMMENTS_THREAD}?part=${PARTS}&videoId=${TEST_VIDEO_ID}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`;

const Page = () => {
  return (
    <main className="w-full h-full flex justify-center items-center">
      <form className="flex flex-col" action={testFn}>
        <label>여기 주소입력ㄱ</label>
        <input
          placeholder="주소를 입력하쇼"
          className="w-50 border-2 border-black border-solid"
          name="link"
        />
        <button className="border-2 border-solid border-black w-10 mt-1">
          추첨하깅~
        </button>
      </form>
    </main>
  );
};

export default Page;
