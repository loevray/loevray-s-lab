import SpinWheel from "./components/SpinWheel";
import SpinWheelTextList from "./components/SpinWheelTextList";
import useSpinwheelStore from "./store/useSpinwheelStore";

const Home = () => {
  const { sectorData } = useSpinwheelStore();
  return (
    <div>
      <SpinWheel
        diameter={560} //지름은 무조건 4의 배수여야 함
        sectorData={sectorData}
        onStartRotate={() => console.log("돌림판 시작")}
        onStopRotate={() => console.log("돌림판 멈춤")}
      />
      <SpinWheelTextList sectorData={sectorData} />
    </div>
  );
};
export default Home;
