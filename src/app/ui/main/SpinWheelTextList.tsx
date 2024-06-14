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
  } = useSpinwheelStore();

  const onKeyDown = (e: KeyEventWithChangeEventType, id: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSector(id);

      setTimeout(() => {
        const nextNode = (e.target.parentNode as HTMLDivElement)
          .nextElementSibling?.firstChild as HTMLDivElement;
        nextNode.focus();
      }, 0);
    }
    if (e.key === "Backspace") {
      if (sectorData.length <= 2 || e.target.textContent !== "") return;
      deleteSector(id);

      const prevNode = (e.target.parentNode as HTMLDivElement)
        .previousElementSibling?.firstChild as HTMLDivElement;
      prevNode.focus();
    }
  };

  return (
    <article className="flex flex-col gap-5 max-h-[50vh] overflow-y-auto w-max p-5">
      {sectorData.map(({ id, text, ratio }, index) => (
        <div key={id} className="flex gap-3">
          <div>{index + 1}</div>
          <EditableDiv
            isDisabled={isLocked}
            text={text}
            onInput={(text: string) => updateSectorText(id, text)}
            onKeyDown={(e: KeyEventWithChangeEventType) => onKeyDown(e, id)}
          />
          <div>{`x${ratio}`}</div>
          <Button
            disabled={isLocked}
            onClick={() => updateSectorRatio(id, ratio + 1)}
          >
            +
          </Button>
          <Button
            disabled={isLocked}
            onClick={() => updateSectorRatio(id, ratio - 1)}
          >
            -
          </Button>
          <div>{`${((ratio / totalRatio) * 100).toFixed(2)}%`}</div>
        </div>
      ))}
    </article>
  );
};

export default SpinWheelTextList;
