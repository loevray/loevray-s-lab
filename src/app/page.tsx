"use client";

import { DEFAULT_VALUES } from "@/constants/SpinWheel";
import SpinWheel from "./ui/main/SpinWheel";
import SpinWheelTextList from "./ui/main/SpinWheelTextList";

const Home = () => {
  return (
    <main className="w-screen h-screen flex items-center">
      <section className="pl-[50px] w-1/2">
        <article>
          <SpinWheel
            diameter={DEFAULT_VALUES.CIRCLE_DIAMETER} //지름은 무조건 4의 배수여야 함
            onStartRotate={() => console.log("돌림판 시작")}
            onStopRotate={() => console.log("돌림판 멈춤")}
          />
        </article>
      </section>
      <section className="w-1/2">
        <article className="flex flex-col gap-5">
          <SpinWheelTextList />
        </article>
      </section>
    </main>
  );
};
export default Home;
