import useHover from "@/app/hooks/useHover";
import EditableDiv from "./EditableDiv";
import { KeyEventWithChangeEventType } from "./SpinWheelTextList";
import { useRef } from "react";

interface SpinWheelTextItemProps {
  text: string;
  ratio: number;
  index: number;
  isLocked: boolean;
  percentage: string;
  onInput: (text: string) => void;
  onKeyDown: (e: KeyEventWithChangeEventType) => void;
  onModifyButtonClick: (ratio: number) => void;
  onRemoveButtonClick: () => void;
}

const SpinWheelTextItem = ({
  text,
  ratio,
  index,
  isLocked,
  percentage,
  onInput,
  onKeyDown,
  onModifyButtonClick,
  onRemoveButtonClick,
}: SpinWheelTextItemProps) => {
  const hoverRef = useRef<HTMLDivElement>(null);
  const { isHover } = useHover({ hoverRef });
  return (
    <div
      className="flex shrink-0  items-center justify-between 
      border-cyan-400 border-solid border-2  h-[45px] w-[470px] rounded-md text-sm px-2 shadow-md"
      ref={hoverRef}
    >
      <div className="w-5 flex justify-center relative">
        {index}
        {isHover && (
          <button
            disabled={isLocked}
            className="rounded-full size-5 bg-white text-red-500 flex justify-center items-center absolute border-[1px] border-solid border-gray-300"
            onClick={onRemoveButtonClick}
          >
            X
          </button>
        )}
      </div>
      <EditableDiv
        isDisabled={isLocked}
        text={text}
        onInput={onInput}
        onKeyDown={(e: KeyEventWithChangeEventType) => onKeyDown(e)}
      />
      <div className="w-[40px]">{`x${ratio}`}</div>
      <div className="flex flex-col gap-1">
        <button
          className="rounded-full size-4 bg-teal-300 hover:bg-teal-400 flex justify-center items-center "
          disabled={isLocked}
          onClick={() => onModifyButtonClick(ratio + 1)}
        >
          +
        </button>
        <button
          className="rounded-full size-4 bg-teal-300 hover:bg-teal-400 flex justify-center items-center "
          disabled={isLocked}
          onClick={() => onModifyButtonClick(ratio - 1)}
        >
          -
        </button>
      </div>
      <div className="w-[50px]">{percentage}</div>
    </div>
  );
};

export default SpinWheelTextItem;
