import { ComponentProps, useEffect, useRef } from "react";
import { KeyEventWithChangeEventType } from "../spin-wheel/SpinWheelTextList";
import { twJoin, twMerge } from "tailwind-merge";

interface EdtiableDiv {
  text: string;
  isDisabled: boolean;
  onInput: (text: string) => void;
  onKeyDown: (e: KeyEventWithChangeEventType) => void;
  className?: ComponentProps<"div">["className"];
}

const EditableDiv = ({
  text,
  isDisabled,
  onInput,
  onKeyDown,
  className,
}: EdtiableDiv) => {
  const divRef = useRef<HTMLDivElement>(null);

  const mergedClass = twMerge(
    `w-[70%] md:w-28 h-3.2 flex items-center flex-shrink-0
       bg-cyan-200 pl-1.4 align-middle leading-[3rem] whitespace-nowrap 
       overflow-hidden bg-opacity-60 focus:outline-none hover:bg-cyan-300 hover:bg-opacity-60 
       focus:bg-cyan-300 focus:bg-opacity-60`,
    className
  );

  useEffect(() => {
    if (divRef.current) {
      divRef.current.textContent = text;
    }
  }, [text]);

  return (
    <div
      className={mergedClass}
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
