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
}: SpinWheelTextItemProps) => {
  const hoverRef = useRef<HTMLDivElement>(null);
  const { isHover } = useHover({ hoverRef });
  return (
    <div
      className="flex gap-3 items-center bg-green-200 h-[45px] w-[470px]"
      ref={hoverRef}
    >
      <div>{index}</div>
      {isHover && <div>x</div>}
      <EditableDiv
        isDisabled={isLocked}
        text={text}
        onInput={onInput}
        onKeyDown={(e: KeyEventWithChangeEventType) => onKeyDown(e)}
      />
      <div>{`x${ratio}`}</div>
      <div className="flex flex-col">
        <button
          className="rounded-full size-5 bg-yellow-100 flex justify-center items-center hover:bg-yellow-300"
          disabled={isLocked}
          onClick={() => onModifyButtonClick(ratio + 1)}
        >
          +
        </button>
        <button
          className="rounded-full size-5 bg-yellow-100 flex justify-center items-center hover:bg-yellow-300"
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
