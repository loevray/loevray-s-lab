import handleCaretPosition from "@/utils/handleCaretPosition";
import useSpinwheelStore from "../../../store/useSpinwheelStore";
import Button from "../common/Button";
import SpinWheelTextItem from "./SpinWheelTextItem";
import { DEFAULT_VALUES } from "@/constants/SpinWheel";

export type KeyEventWithChangeEventType = React.KeyboardEvent &
  React.ChangeEvent<HTMLDivElement>;

const SpinWheelTextList = ({ isLocked }: { isLocked: boolean }) => {
  const {
    sectorData,
    totalRatio,
    updateSectorText,
    addSector,
    deleteSector,
    updateSectorRatio,
    initializeSectorData,
  } = useSpinwheelStore();

  const onKeyDown = (id: string) => (e: KeyEventWithChangeEventType) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSector(id);

      setTimeout(() => {
        const nextNode = (
          e.target.parentNode as HTMLDivElement
        ).nextElementSibling?.querySelector(
          "[contentEditable]"
        ) as HTMLDivElement;

        nextNode.focus();
      }, 0);
    }
    if (e.key === "Backspace") {
      if (
        sectorData.length <= DEFAULT_VALUES.TOTAL_RATIO ||
        e.target.textContent !== ""
      )
        return;
      if (e.target.textContent === "") e.preventDefault();
      deleteSector(id);

      const prevNode = (
        e.target.parentNode as HTMLDivElement
      ).previousElementSibling?.querySelector(
        "[contentEditable]"
      ) as HTMLDivElement;
      prevNode.focus();
      handleCaretPosition(prevNode);
    }
  };

  const onModifyButtonClick = (id: string) => (ratio: number) =>
    updateSectorRatio(id, ratio);

  const onInput = (id: string) => (text: string) => updateSectorText(id, text);

  const onRemoveButtonClick = (id: string) => () => deleteSector(id);
  return (
    <>
      <Button
        disabled={isLocked}
        onClick={() => {
          initializeSectorData();
          console.log("초기화 됨", sectorData);
        }}
        text="룰렛초기화"
      />
      <article className="flex flex-col gap-1.4 max-h-[60vh] overflow-y-auto mt-5 pr-5 pb-5 w-fit">
        {sectorData.map(({ id, text, ratio }, index) => (
          <SpinWheelTextItem
            key={id}
            text={text}
            ratio={ratio}
            index={index}
            isLocked={isLocked}
            percentage={`${((ratio / totalRatio) * 100).toFixed(2)}%`}
            onInput={onInput(id)}
            onKeyDown={onKeyDown(id)}
            onModifyButtonClick={onModifyButtonClick(id)}
            onRemoveButtonClick={onRemoveButtonClick(id)}
          />
        ))}
      </article>
    </>
  );
};

export default SpinWheelTextList;
