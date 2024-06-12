import { SectorData } from "./SpinWheel";

interface SpinWheelSectorProps extends SectorData {
  radius: number;
  totalSector: number;
}

const SpinWheelSector = ({
  ratio,
  text,
  style,
  totalSector,
  accRatio,
  radius,
}: SpinWheelSectorProps) => {
  const sectorRatio = ratio / totalSector;
  const sectorPercentage = sectorRatio * 100;
  const circumference = 2 * Math.PI * radius;

  return (
    <g
      transform={`rotate(${(360 / totalSector) * accRatio})`}
      className="origin-center"
    >
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
      <text
        className="origin-center"
        textAnchor="middle"
        fontSize="25"
        strokeWidth="4"
        paintOrder="stroke"
        stroke="black"
        x="50%"
        y="50%"
        fill="white"
        transform={`rotate(${((360 * sectorRatio) / 2).toFixed(
          1
        )}) translate(${radius} 10)`}
      >
        {text}
      </text>
    </g>
  );
};

export default SpinWheelSector;
