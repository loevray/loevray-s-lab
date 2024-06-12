import { SectorData } from "../store/useSpinwheelStore";
import SpinWheelSector from "./SpinWheelSector";

interface SpinWheelProps {
  diameter: number;
  sectorData: SectorData[];
  onStopRotate: () => void;
  onStartRotate: () => void;
}

const SpinWheel = ({
  diameter,
  sectorData,
  onStopRotate,
  onStartRotate,
}: SpinWheelProps) => {
  const totalSector = sectorData.reduce((acc, cur) => acc + cur.ratio, 0);

  return (
    <div>
      돌림판 자리
      <svg
        viewBox={`0 0 ${diameter} ${diameter}`}
        width={diameter}
        height={diameter}
        transform="rotate(-90)"
      >
        {sectorData.map((data) => (
          <SpinWheelSector
            key={data.id}
            radius={diameter / 4}
            totalSector={totalSector}
            {...data}
          />
        ))}
      </svg>
    </div>
  );
};

export default SpinWheel;
