"use client";

import { DEFAULT_VALUES } from "@/constants/SpinWheel";
import SpinWheel from "./ui/main/SpinWheel";
import SpinWheelTextList from "./ui/main/SpinWheelTextList";
import Button from "./ui/main/Button";
import useSpinWheel from "./hooks/useSpinWheel";

const Home = () => {
  //useSpinWheel?
  const onStart = () => console.log("돌림판 시작");
  const onStop = () => console.log("돌림판 멈춤");

  const { start, stop, spinWheelRef, arrowRef, winTextRef } = useSpinWheel({
    onStart,
    onStop,
  });

  return (
    <main className="w-screen h-screen flex items-center">
      <section className="pl-[50px] w-1/2 flex items-center flex-col gap-10">
        <span ref={winTextRef} className="text-xl">
          돌려돌려 돌림판!
        </span>
        <SpinWheel
          diameter={DEFAULT_VALUES.CIRCLE_DIAMETER} //지름은 무조건 4의 배수여야 함
          spinWheelRef={spinWheelRef}
          arrowRef={arrowRef}
        />
        <div className="w-[200px] flex justify-between pt-20">
          <Button onClick={start}>회전</Button>
          <Button onClick={stop}>멈춤</Button>
        </div>
      </section>
      <section className="w-1/2">
        <SpinWheelTextList />
      </section>
    </main>
  );
};
export default Home;
