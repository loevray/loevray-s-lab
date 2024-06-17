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

  const {
    start,
    stop,
    quickStop,
    isRotating,
    spinWheelRef,
    arrowRef,
    winTextRef,
  } = useSpinWheel({
    onStart,
    onStop,
  });

  return (
    <main className="w-screen h-screen flex items-center py-20">
      <section className="pl-[50px] w-1/2 flex items-center flex-col gap-10 h-full">
        <span ref={winTextRef} className="text-xl">
          돌려돌려 돌림판!
        </span>
        <SpinWheel
          diameter={DEFAULT_VALUES.CIRCLE_DIAMETER} //지름은 무조건 4의 배수여야 함
          spinWheelRef={spinWheelRef}
          arrowRef={arrowRef}
        />
        <div className="w-[200px] flex justify-center pt-20">
          {isRotating ? (
            <div className="flex gap-2">
              <button
                className="bg-cyan-500 w-[100px] h-[30px] rounded-sm text-white shadow-md"
                onClick={stop}
              >
                멈춤
              </button>
              <button
                className="bg-cyan-500 w-[100px] h-[30px] rounded-sm text-white shadow-md"
                onClick={quickStop}
              >
                바로 멈춤
              </button>
            </div>
          ) : (
            <button
              className="bg-cyan-500 w-[100px] h-[30px] rounded-sm text-white shadow-md"
              onClick={start}
            >
              회전
            </button>
          )}
        </div>
      </section>
      <section className="w-1/2 h-full">
        <SpinWheelTextList isLocked={isRotating} />
      </section>
    </main>
  );
};
export default Home;
