import Button from "../common/Button";
import toast from "../common/toast/createObserver";

const Toasts = () => {
  return (
    <div>
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

export default Toasts;
