"use client";

import { DEFAULT_VALUES } from "@/constants/SpinWheel";
import useSpinWheel from "../ui/spin-wheel/hooks/useSpinWheel";
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
    <main className="w-full h-full flex items-center">
      <section className="w-1/2 h-full flex justify-center items-center flex-col gap-1">
        <span ref={winTextRef} className="italic text-3 pb-5">
          돌려잇
        </span>
        <SpinWheel
          diameter={DEFAULT_VALUES.CIRCLE_DIAMETER}
          spinWheelRef={spinWheelRef}
          arrowRef={arrowRef}
        />
        <div className="w-[200px] flex justify-center pt-10">
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
      <section className="w-1/2 h-full flex flex-col pt-10">
        <SpinWheelTextList isLocked={isRotating} />
      </section>
    </main>
  );
};

export default Page;
