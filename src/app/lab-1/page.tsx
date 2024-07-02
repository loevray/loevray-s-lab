"use client";

import Button from "../ui/common/Button";
import toast from "../ui/common/toast/createObserver";

const Page = () => {
  return (
    <div className="flex">
      <Button onClick={() => toast("나는 토스트").notify()}>디폴트</Button>
      <Button onClick={() => toast("나는 토스트").error()}>에러</Button>
      <Button onClick={() => toast("나는 토스트").success()}>성공</Button>
      <Button onClick={() => toast("나는 토스트").warning()}>경고</Button>
    </div>
  );
};

export default Page;
