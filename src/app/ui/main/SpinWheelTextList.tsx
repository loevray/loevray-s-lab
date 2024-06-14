"use client";
import useSpinwheelStore from "../../store/useSpinwheelStore";
import Button from "./Button";
import EditableDiv from "./EditableDiv";

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

  const onKeyDown = (e: KeyEventWithChangeEventType, id: string) => {
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
        console.log(nextNode);
      }, 0);
    }
    if (e.key === "Backspace") {
      if (sectorData.length <= 2 || e.target.textContent !== "") return;
      deleteSector(id);

      const prevNode = (
        e.target.parentNode as HTMLDivElement
      ).previousElementSibling?.querySelector(
        "[contentEditable]"
      ) as HTMLDivElement;
      prevNode.focus();
    }
  };

  return (
    <article className="flex flex-col gap-5 max-h-[60vh] overflow-y-auto w-max p-5">
      <button
        disabled={isLocked}
        className="bg-indigo-300 w-30"
        onClick={initializeSectorData}
      >
        룰렛 초기화
      </button>
      {sectorData.map(({ id, text, ratio }, index) => (
        <div
          key={id}
          className="flex gap-3 items-center bg-green-200 h-[45px] w-[470px]"
        >
          <div>{index + 1}</div>
          <EditableDiv
            isDisabled={isLocked}
            text={text}
            onInput={(text: string) => updateSectorText(id, text)}
            onKeyDown={(e: KeyEventWithChangeEventType) => onKeyDown(e, id)}
          />
          <div>{`x${ratio}`}</div>
          <div className="flex flex-col">
            <button
              className="rounded-full size-5 bg-yellow-100 flex justify-center items-center hover:bg-yellow-300"
              disabled={isLocked}
              onClick={() => updateSectorRatio(id, ratio + 1)}
            >
              +
            </button>
            <button
              className="rounded-full size-5 bg-yellow-100 flex justify-center items-center hover:bg-yellow-300"
              disabled={isLocked}
              onClick={() => updateSectorRatio(id, ratio - 1)}
            >
              -
            </button>
          </div>
          <div>{`${((ratio / totalRatio) * 100).toFixed(2)}%`}</div>
        </div>
      ))}
    </article>
  );
};

export default SpinWheelTextList;
