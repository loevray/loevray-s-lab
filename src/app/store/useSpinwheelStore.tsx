import { create } from "zustand";

export interface SectorStyle {
  backgroundColor: string;
}

export interface SectorData {
  id: number;
  ratio: number;
  text: string;
  style: SectorStyle;
  accRatio?: number;
}

const initializeSecotorData = (sectorData: SectorData[]) => {
  sectorData.reduce((acc, cur) => {
    cur.accRatio = acc;
    return acc + cur.ratio;
  }, 0);
  return sectorData;
};

const useSpinwheelStore = create<{ sectorData: SectorData[] }>((set) => ({
  sectorData: initializeSecotorData([
    {
      id: 0,
      text: "돌림판",
      ratio: 1,
      style: { backgroundColor: "tomato" },
    },
    {
      id: 1,
      text: "입니다",
      ratio: 1,
      style: { backgroundColor: "pink" },
    },
  ]),
}));

export default useSpinwheelStore;
