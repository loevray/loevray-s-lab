import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { DEFAULT_VALUES } from "@/constants/SpinWheel";
import { persist, createJSONStorage } from "zustand/middleware";

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

const INITIAL_SECTOR_DATA = [
  {
    id: "default_id_1",
    text: "돌림판",
    ratio: 1,
    style: { backgroundColor: DEFAULT_VALUES.COLOR_PALLETTE[0] },
  },
  {
    id: "default_id_2",
    text: "입니다",
    ratio: 1,
    style: { backgroundColor: DEFAULT_VALUES.COLOR_PALLETTE[1] },
  },
];

const getInitialSectorData = () => structuredClone(INITIAL_SECTOR_DATA);

const STORAGE_KEY = {
  SPIN_WHEEL: "Spin-Wheel-Storage",
};
const mixSectorBackground = (sectorData: SectorData[]) =>
  sectorData.map((sector, i) => ({
    ...structuredClone(sector),
    style: {
      backgroundColor:
        DEFAULT_VALUES.COLOR_PALLETTE[i % DEFAULT_VALUES.COLOR_PALLETTE.length],
    },
  }));

type UpdateSectorTextType = (id: string, text: string) => void;

type AddSectorType = (prevId: string) => void;

type DeleteSectorType = (deleteId: string) => void;

type UpdateSectorRatioType = (id: string, newRatio: number) => void;

const useSpinwheelStore = create<{
  sectorData: SectorData[];
  totalRatio: number;
  updateSectorText: UpdateSectorTextType;
  addSector: AddSectorType;
  deleteSector: DeleteSectorType;
  updateSectorRatio: UpdateSectorRatioType;
  initializeSectorData: () => void;
}>()(
  persist(
    (set, get) => ({
      sectorData: calculateAccRatio(getInitialSectorData()),
      totalRatio: DEFAULT_VALUES.TOTAL_RATIO,

      updateSectorText: (id, text) =>
        set({
          sectorData: get().sectorData.map((sector) =>
            sector.id === id ? { ...structuredClone(sector), text } : sector
          ),
          totalRatio: get().totalRatio,
        }),

      addSector: (prevId) =>
        set(() => {
          const newSectorData = get().sectorData;
          const prevIndex = newSectorData.findIndex(({ id }) => prevId === id);
          const newSector = {
            id: uuidv4(),
            text: "",
            ratio: 1,
            style: {
              backgroundColor:
                DEFAULT_VALUES.COLOR_PALLETTE[
                  newSectorData.length % DEFAULT_VALUES.COLOR_PALLETTE.length
                ],
            }, //이부분은 컬러팔레트에서 가져오게
          };
          newSectorData.splice(prevIndex + 1, 0, newSector);
          return {
            sectorData: mixSectorBackground(calculateAccRatio(newSectorData)),
            totalRatio: get().totalRatio + 1,
          };
        }),
      deleteSector: (deleteId) => {
        if (get().sectorData.length <= DEFAULT_VALUES.TOTAL_RATIO) return;

        set(() => ({
          sectorData: mixSectorBackground(
            calculateAccRatio(
              get().sectorData.filter(({ id }) => id !== deleteId)
            )
          ),
          totalRatio:
            get().totalRatio -
            (get().sectorData.find(({ id }) => id === deleteId)?.ratio ?? 0),
        }));
      },
      updateSectorRatio: (id, newRatio) => {
        if (newRatio < DEFAULT_VALUES.RATIO_STANDARD) return;

        set(() => {
          const prevRatio =
            get().sectorData.find((sector) => sector.id === id)?.ratio ?? 0;

          return {
            sectorData: calculateAccRatio(
              get().sectorData.map((sector) =>
                sector.id === id
                  ? { ...structuredClone(sector), ratio: newRatio }
                  : sector
              )
            ),
            totalRatio: get().totalRatio + (newRatio - prevRatio),
          };
        });
      },
      initializeSectorData: () => {
        set(() => ({
          sectorData: calculateAccRatio(getInitialSectorData()),
          totalRatio: 2,
        }));
      },
    }),
    {
      name: STORAGE_KEY.SPIN_WHEEL,
    }
  )
);

export default useSpinwheelStore;
