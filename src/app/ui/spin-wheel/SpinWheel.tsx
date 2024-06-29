import { RefObject } from "react";
import useSpinwheelStore from "../../../store/useSpinwheelStore";
import { DEFAULT_VALUES } from "@/constants/SpinWheel";
import CircularSector from "./CircularSector";
import Arrow from "./Arrow";
import BorderCircle from "./BorderCircle";
import CircularSectorContainer from "./CircularSectorContainer";

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
      <Arrow className="stroke-white storke-1" ref={arrowRef} />
      <BorderCircle diameter={diameter} borderWidth={3} />
      <CircularSectorContainer
        ref={spinWheelRef}
        diameter={diameter}
        defaultRotateDeg={DEFAULT_VALUES.DEG}
      >
        {sectorData.map((data) => (
          <CircularSector
            key={data.id}
            radius={diameter / 4}
            totalSector={totalSector}
            {...data}
          />
        ))}
      </CircularSectorContainer>
    </figure>
  );
};

export default SpinWheel;
