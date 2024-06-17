import { RefObject } from "react";
import useSpinwheelStore from "../../../store/useSpinwheelStore";
import SpinWheelSector from "./SpinWheelSector";
import { DEFAULT_VALUES } from "@/constants/SpinWheel";

interface SpinWheelProps {
  diameter: number;
  spinWheelRef: RefObject<SVGSVGElement>;
  arrowRef: RefObject<HTMLElement>;
}

const SpinWheel = ({ diameter, spinWheelRef, arrowRef }: SpinWheelProps) => {
  const { sectorData } = useSpinwheelStore();
  const totalSector = sectorData.reduce((acc, cur) => acc + cur.ratio, 0);

  return (
    <figure
      className="relative"
      style={{
        width: `${diameter}px`,
        height: `${diameter}px`,
      }}
    >
      <span
        className="bg-blue-500 w-10 h-10 absolute left-1/2 translate-x-[-50%] z-10"
        style={{ clipPath: "polygon(50% 100%, 25% 0, 75% 0)" }}
      />
      <span
        className="display:none size-[1px] absolute left-1/2 translate-x-[-50%]"
        ref={arrowRef}
      />
      <svg
        ref={spinWheelRef}
        viewBox={`0 0 ${diameter} ${diameter}`}
        width={diameter}
        height={diameter}
        transform={`rotate(${DEFAULT_VALUES.DEG})`}
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
    </figure>
  );
};

export default SpinWheel;
