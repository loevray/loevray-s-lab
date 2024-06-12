"use client";

import SpinWheel from "./ui/main/SpinWheel";
import SpinWheelTextList from "./ui/main/SpinWheelTextList";

const Home = () => {
  return (
    <div>
      <SpinWheel
        diameter={560} //지름은 무조건 4의 배수여야 함
        onStartRotate={() => console.log("돌림판 시작")}
        onStopRotate={() => console.log("돌림판 멈춤")}
      />
      <SpinWheelTextList />
    </div>
  );
};
export default Home;
