"use client";

import { DEFAULT_VALUES } from "@/constants/SpinWheel";
import useSpinWheel from "../../hooks/useSpinWheel";
import SpinWheel from "../ui/spin-wheel/SpinWheel";
import Button from "../ui/common/Button";
import SpinWheelTextList from "../ui/spin-wheel/SpinWheelTextList";

const Page = () => {
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
    <main className="w-full flex items-center">
      <section className="w-1/2 h-full flex justify-center items-center flex-col gap-6">
        <span ref={winTextRef} className="italic text-2xl">
          돌려돌려 돌림판!
        </span>
        <SpinWheel
          diameter={DEFAULT_VALUES.CIRCLE_DIAMETER} //지름은 무조건 4의 배수여야 함
          spinWheelRef={spinWheelRef}
          arrowRef={arrowRef}
        />
        <div className="w-[200px] flex justify-center">
          {isRotating ? (
            <div className="flex gap-2">
              <Button onClick={stop} text="멈춤" />
              <Button onClick={quickStop} text="바로 멈춤" />
            </div>
          ) : (
            <Button onClick={start} text="회전" />
          )}
        </div>
      </section>
      <section className="w-1/2 h-full">
        <SpinWheelTextList isLocked={isRotating} />
      </section>
    </main>
  );
};

export default Page;
