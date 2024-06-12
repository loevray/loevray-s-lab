import SpinWheel, { SectorData } from "./components/SpinWheel";
import SpinWheelTextList from "./components/SpinWheelTextList";

const Home = () => {
  //diameter는 4의 배수여야 합니다
  const sectorData: any[] = [
    {
      id: 1,
      ratio: 1,
      style: { backgroundColor: "tomato" },
      text: "돌림판",
    },
    {
      id: 2,
      ratio: 1,
      style: { backgroundColor: "pink" },
      text: "입니다",
    },
    {
      id: 3,
      ratio: 1,
      style: { backgroundColor: "purple" },
      text: "입니다",
    },
  ];
  sectorData.reduce((acc, cur) => {
    cur.accRatio = acc;
    return acc + cur.ratio;
  }, 0);
  return (
    <div>
      <SpinWheel
        diameter={560}
        sectorData={sectorData}
        onStartRotate={() => console.log("돌림판 시작")}
        onStopRotate={() => console.log("돌림판 멈춤")}
      />
      <SpinWheelTextList sectorData={sectorData} />
    </div>
  );
};
export default Home;
