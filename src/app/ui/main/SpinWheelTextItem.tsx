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
      className="flex  items-center justify-evenly bg-green-200 hover:bg-green-300 h-[45px] w-[470px] rounded-md text-sm"
      ref={hoverRef}
    >
      <div className="w-5 flex justify-center relative">
        {index}
        {isHover && (
          <button
            className="rounded-full size-5 bg-white text-red-500 flex justify-center items-center absolute"
            onClick={onRemoveButtonClick}
          >
            x
          </button>
        )}
      </div>
      <EditableDiv
        isDisabled={isLocked}
        text={text}
        onInput={onInput}
        onKeyDown={(e: KeyEventWithChangeEventType) => onKeyDown(e)}
      />
      <div>{`x${ratio}`}</div>
      <div className="flex flex-col gap-1">
        <button
          className="rounded-full size-4 bg-yellow-100 flex justify-center items-center hover:bg-yellow-300"
          disabled={isLocked}
          onClick={() => onModifyButtonClick(ratio + 1)}
        >
          +
        </button>
        <button
          className="rounded-full size-4 bg-yellow-100 flex justify-center items-center hover:bg-yellow-300"
          disabled={isLocked}
          onClick={() => onModifyButtonClick(ratio - 1)}
        >
          -
        </button>
      </div>
      <div>{percentage}</div>
    </div>
  );
};

export default SpinWheelTextItem;
