"use client";
import useSpinwheelStore, { SectorData } from "../../store/useSpinwheelStore";
import SpinWheelSector from "./SpinWheelSector";

interface SpinWheelProps {
  diameter: number;
  onStopRotate: () => void;
  onStartRotate: () => void;
}

const SpinWheel = ({
  diameter,
  onStopRotate,
  onStartRotate,
}: SpinWheelProps) => {
  const { sectorData } = useSpinwheelStore();
  const totalSector = sectorData.reduce((acc, cur) => acc + cur.ratio, 0);

  return (
    <div>
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
