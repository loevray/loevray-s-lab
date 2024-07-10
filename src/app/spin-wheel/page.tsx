"use client";

import { DEFAULT_VALUES } from "@/constants/SpinWheel";
import useSpinWheel from "../ui/spin-wheel/hooks/useSpinWheel";
import SpinWheel from "../ui/spin-wheel/SpinWheel";
import Button from "../ui/common/Button";
import SpinWheelTextList from "../ui/spin-wheel/SpinWheelTextList";
import isDesktop from "@/utils/isDesktop";

const Page = () => {
  const {
    start,
    stop,
    quickStop,
    isRotating,
    spinWheelRef,
    arrowRef,
    winTextRef,
  } = useSpinWheel({});

  return (
    <main className="w-full h-full flex flex-col md:flex-row items-center">
      <section className="w-full md:w-1/2 h-full flex justify-center items-center flex-col md:gap-1">
        <span ref={winTextRef} className="italic text-3 pb-5">
          돌려잇
        </span>
        <SpinWheel
          diameter={isDesktop() ? DEFAULT_VALUES.CIRCLE_DIAMETER : 320}
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
      <section className="w-full md:w-1/2 h-full flex flex-col items-center pt-5 md:pt-10">
        <SpinWheelTextList isLocked={isRotating} />
      </section>
    </main>
  );
};

export default Page;
