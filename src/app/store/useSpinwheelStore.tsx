import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export interface SectorStyle {
  backgroundColor: string;
}

export interface SectorData {
  id: string;
  ratio: number;
  text: string;
  style: SectorStyle;
  accRatio?: number;
}

const calculateAccRatio = (sectorData: SectorData[]) => {
  sectorData.reduce((acc, cur) => {
    cur.accRatio = acc;
    return acc + cur.ratio;
  }, 0);
  return sectorData;
};

type UpdateSectorTextType = (id: string, text: string) => void;

type AddSectorType = (prevId: string) => void;

type DeleteSectorType = (deleteId: string) => void;
const useSpinwheelStore = create<{
  sectorData: SectorData[];
  updateSectorText: UpdateSectorTextType;
  addSector: AddSectorType;
  deleteSector: DeleteSectorType;
}>((set) => ({
  sectorData: calculateAccRatio([
    {
      id: "default_id_1",
      text: "돌림판",
      ratio: 1,
      style: { backgroundColor: "tomato" },
    },
    {
      id: "default_id_2",
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
  addSector: (prevId) =>
    set((state) => {
      const prevIndex = state.sectorData.findIndex(({ id }) => prevId === id);
      const newSectorData = structuredClone(state.sectorData);
      const newSector = {
        id: uuidv4(),
        text: "",
        ratio: 1,
        style: { backgroundColor: "green" }, //이부분은 컬러팔레트에서 가져오게
      };
      newSectorData.splice(prevIndex + 1, 0, newSector);
      return { sectorData: calculateAccRatio(newSectorData) };
    }),
  deleteSector: (deleteId) =>
    set((state) => ({
      sectorData: calculateAccRatio(
        state.sectorData.filter(({ id }) => id !== deleteId)
      ),
    })),
}));

export default useSpinwheelStore;
