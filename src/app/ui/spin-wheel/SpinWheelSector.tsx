import getTruncateText from "@/utils/getTruncateText";
import { SectorData } from "../../../store/useSpinwheelStore";

interface SpinWheelSectorProps extends SectorData {
  radius: number;
  totalSector: number;
}

const SpinWheelSector = ({
  ratio,
  text,
  style,
  totalSector,
  accRatio = 0,
  radius,
}: SpinWheelSectorProps) => {
  const sectorRatio = ratio / totalSector;
  const sectorPercentage = sectorRatio * 100;
  const circumference = 2 * Math.PI * radius;

  const sectorRotationDeg = (360 / totalSector) * accRatio;
  const sectorTextRotationDeg = ((360 * sectorRatio) / 2).toFixed(1);
  console.log(text);
  const truncatedText = getTruncateText(text, 9);
  return (
    <g transform={`rotate(${sectorRotationDeg})`} className="origin-center">
      <circle
        className="origin-center"
        r={radius}
        strokeWidth={radius * 2}
        strokeDasharray={`${
          (sectorPercentage * circumference) / 100
        } ${circumference}`}
        stroke={style.backgroundColor}
        cx="50%"
        cy="50%"
        fill="transparent"
      />
      <text className="origin-center hidden">{text}</text>
      <text
        className="origin-center"
        textAnchor="middle"
        fontSize="25px"
        strokeWidth="4"
        paintOrder="stroke"
        stroke="black"
        x="50%"
        y="50%"
        fill="white"
        transform={`rotate(${sectorTextRotationDeg}) translate(${radius} 10)`}
      >
        {truncatedText}
      </text>
    </g>
  );
};

export default SpinWheelSector;
