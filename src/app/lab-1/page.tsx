"use client";

import Button from "../ui/common/Button";
import toast from "../ui/common/toast/createObserver";

const Page = () => {
  return (
    <div className="flex">
      <Button onClick={() => toast({ message: "기본 토스트" })}>디폴트</Button>
      <Button
        onClick={() => toast({ message: "에러 토스트", eventType: "error" })}
      >
        에러
      </Button>
      <Button
        onClick={() => toast({ message: "성공 토스트", eventType: "success" })}
      >
        성공
      </Button>
      <Button
        onClick={() => toast({ message: "경고 토스트", eventType: "warning" })}
      >
        경고
      </Button>
    </div>
  );
};

export default Page;
