"use client";

import useSpinwheelStore from "../../store/useSpinwheelStore";
import EditableDiv from "./EditableDiv";

export type KeyEventWithChangeEventType = React.KeyboardEvent &
  React.ChangeEvent<HTMLDivElement>;

const SpinWheelTextList = () => {
  const { sectorData, updateSectorText, addSector, deleteSector } =
    useSpinwheelStore();

  const onKeyDown = (e: KeyEventWithChangeEventType, id: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSector(id);
      //microtask queue로 임시로 옮겨서 사용...업데이트된 상태 반영이 바로 안되기 때문
      setTimeout(() => {
        const nextNode = e.target.nextElementSibling;
        (nextNode as HTMLDivElement).focus();
      }, 0);
    }
    if (e.key === "Backspace") {
      if (sectorData.length <= 2 || e.target.textContent !== "") return;
      deleteSector(id);
      const prevNode = e.target.previousElementSibling;
      (prevNode as HTMLDivElement).focus();
    }
  };

  return (
    <>
      {sectorData.map(({ id, text }) => (
        <EditableDiv
          text={text}
          key={id}
          onInput={(text: string) => updateSectorText(id, text)}
          onKeyDown={(e: KeyEventWithChangeEventType) => onKeyDown(e, id)}
        />
      ))}
    </>
  );
};

export default SpinWheelTextList;
