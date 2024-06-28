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
      <svg
        className="absolute left-1/2 top-[-1rem] translate-x-[-50%] z-10"
        width="45"
        height="45"
        viewBox="0 0 100 100"
      >
        <polygon points="50,100 25,0 75,0" className="fill-slate-800" />
      </svg>
      <span
        className="display:none size-[1px] absolute left-1/2 translate-x-[-50%]"
        ref={arrowRef}
      />
      <svg
        viewBox={`0 0 ${diameter * 1.1} ${diameter * 1.1}`}
        width={diameter * 1.1}
        height={diameter * 1.1}
        className="absolute left-1/2 top-1/2 translate-y-[-50%] translate-x-[-50%]"
      >
        <circle
          r={diameter / 1.96}
          cx="50%"
          cy="50%"
          className="fill-cyan-400"
        />
      </svg>
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
