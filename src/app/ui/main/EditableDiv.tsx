import { useEffect, useRef } from "react";
import { KeyEventWithChangeEventType } from "./SpinWheelTextList";

interface EdtiableDiv {
  text: string;
  isDisabled: boolean;
  onInput: (text: string) => void;
  onKeyDown: (e: KeyEventWithChangeEventType) => void;
}

const EditableDiv = ({ text, isDisabled, onInput, onKeyDown }: EdtiableDiv) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current && text) {
      divRef.current.textContent = text;
    }
  }, [text]);

  return (
    <div
      className="w-[300px] h-[35px] border-solid border-black border-2 flex-shrink-0"
      onInput={(e: React.ChangeEvent<HTMLDivElement>) => {
        onInput(e.target.textContent || "");
        divRef.current && (divRef.current.textContent = e.target.textContent);
      }}
      onKeyDown={(e: KeyEventWithChangeEventType) => {
        onKeyDown(e);
      }}
      contentEditable={!isDisabled}
      ref={divRef}
    />
  );
};

export default EditableDiv;
