"use client";
import useSpinwheelStore from "../../store/useSpinwheelStore";
import EditableDiv from "./EditableDiv";

export type KeyEventWithChangeEventType = React.KeyboardEvent &
  React.ChangeEvent<HTMLDivElement>;

const SpinWheelTextList = () => {
  const { sectorData, totalRatio, updateSectorText, addSector, deleteSector } =
    useSpinwheelStore();

  const onKeyDown = (e: KeyEventWithChangeEventType, id: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSector(id);
      //microtask queue로 임시로 옮겨서 사용...업데이트된 상태 반영이 바로 안되기 때문
      setTimeout(() => {
        const nextNode = (e.target.parentNode as HTMLDivElement)
          .nextElementSibling?.firstChild;
        (nextNode as HTMLDivElement).focus();
      }, 0);
    }
    if (e.key === "Backspace") {
      if (sectorData.length <= 2 || e.target.textContent !== "") return;
      deleteSector(id);
      const prevNode = (e.target.parentNode as HTMLDivElement)
        .previousElementSibling?.firstChild;
      (prevNode as HTMLDivElement).focus();
    }
  };

  return (
    <article className="flex flex-col gap-5 max-h-[50vh] overflow-y-scroll w-max p-5">
      {sectorData.map(({ id, text, ratio }) => (
        <div key={id} className="flex gap-3">
          <EditableDiv
            text={text}
            onInput={(text: string) => updateSectorText(id, text)}
            onKeyDown={(e: KeyEventWithChangeEventType) => onKeyDown(e, id)}
          />
          <div>{`x${ratio}`}</div>
          <div>{`${((ratio / totalRatio) * 100).toFixed(2)}%`}</div>
        </div>
      ))}
    </article>
  );
};

export default SpinWheelTextList;
