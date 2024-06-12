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

type UpdateSectorTextType = (id: number, text: string) => void;

const useSpinwheelStore = create<{
  sectorData: SectorData[];
  updateSectorText: UpdateSectorTextType;
}>((set) => ({
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
  updateSectorText: (id, text) =>
    set((state) => ({
      sectorData: state.sectorData.map((sector) =>
        sector.id === id ? { ...structuredClone(sector), text } : sector
      ),
    })),
}));

export default useSpinwheelStore;
