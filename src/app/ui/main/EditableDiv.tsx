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
    if (divRef.current) {
      divRef.current.textContent = text;
    }
  }, [text]);

  return (
    <div
      className="w-[300px] h-[35px] flex items-center flex-shrink-0 bg-blue-50 pl-3 align-middle leading-8 whitespace-nowrap overflow-hidden"
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
