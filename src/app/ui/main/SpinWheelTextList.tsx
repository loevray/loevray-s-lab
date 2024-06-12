"use client";

import useSpinwheelStore from "../../store/useSpinwheelStore";
import EditableDiv from "./EditableDiv";

const SpinWheelTextList = () => {
  const { sectorData, updateSectorText } = useSpinwheelStore();

  return (
    <div>
      {sectorData.map(({ id, text }) => (
        <EditableDiv
          text={text}
          key={id}
          onInput={(text: string) => updateSectorText(id, text)}
        />
      ))}
    </div>
  );
};

export default SpinWheelTextList;
