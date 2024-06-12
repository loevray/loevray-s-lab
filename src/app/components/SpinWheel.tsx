import SpinWheelSector from "./SpinWheelSector";

interface SpinWheelProps {
  diameter: number;
  sectorData: SectorData[];
  onStopRotate: () => void;
  onStartRotate: () => void;
}

interface SpinWheelStypeProps {
  backgroundColor: string;
}

export interface SectorData {
  id: number;
  ratio: number;
  text: string;
  style: SpinWheelStypeProps;
  accRatio?: number;
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
