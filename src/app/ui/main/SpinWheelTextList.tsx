"use client";

import useSpinwheelStore from "../../store/useSpinwheelStore";
import EditableDiv from "./EditableDiv";

const SpinWheelTextList = () => {
  const { sectorData, updateSectorText } = useSpinwheelStore();

  return (
    <>
      {sectorData.map(({ id, text }) => (
        <EditableDiv
          text={text}
          key={id}
          onInput={(text: string) => updateSectorText(id, text)}
        />
      ))}
    </>
  );
};

export default SpinWheelTextList;
