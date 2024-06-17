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
      className="w-[280px] h-[32px] flex items-center flex-shrink-0
       bg-cyan-200 pl-3 align-middle leading-8 whitespace-nowrap 
       overflow-hidden bg-opacity-60 focus:outline-none hover:bg-cyan-300 hover:bg-opacity-60 
       focus:bg-cyan-300 focus:bg-opacity-60"
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
