import { RefObject } from "react";
import useSpinwheelStore from "../../../store/useSpinwheelStore";
import { DEFAULT_VALUES } from "@/constants/SpinWheel";
import CircularSector from "./CircularSector";
import Arrow from "./Arrow";
import BorderCircle from "./BorderCircle";

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
      <Arrow className="stroke-white storke-1" />
      <span
        className="display:none size-[1px] absolute left-1/2 translate-x-[-50%]"
        ref={arrowRef}
      />
      <BorderCircle diameter={diameter} borderWidth={3} />
      <svg
        ref={spinWheelRef}
        viewBox={`0 0 ${diameter} ${diameter}`}
        width={diameter}
        height={diameter}
        transform={`rotate(${DEFAULT_VALUES.DEG})`}
      >
        {sectorData.map((data) => (
          <CircularSector
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
