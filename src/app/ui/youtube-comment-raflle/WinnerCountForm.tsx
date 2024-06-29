import { ChangeEvent, ComponentProps, RefObject, forwardRef } from "react";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

interface WinnerCountFormProps {
  winnerCountLimit: number;
  winnerCountMin: number;
  handleSubmit: UseFormHandleSubmit<
    {
      winnerCount: number;
    },
    undefined
  >;
  disabled: ComponentProps<"input">["disabled"];
  errors: FieldErrors<{
    winnerCount: number;
  }>;
  register: UseFormRegister<{
    winnerCount: number;
  }>;
}

const WinnerCountForm = ({
  handleSubmit,
  winnerCountLimit,
  winnerCountMin,
  disabled = false,
  errors,
  register,
}: WinnerCountFormProps) => {
  const onSubmit = () => {};
  return (
    <form
      className="flex flex-col relative text-1.8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="number-of-winners" className="font-semibold">
        Number Of Winners
      </label>
      <div className="w-18 h-3.5 relative">
        <input
          id="number-of-winners"
          disabled={disabled}
          className=" pl-1 pr-2 text-right w-full h-full shadow-xl bg-yellow-50 focus:bg-yellow-100 focus:outline-none disabled:cursor-not-allowed disabled:bg-yellow-600"
          {...register("winnerCount", {
            required: "추첨인원을 기입해주세요",
            pattern: {
              value: /^[0-9]*$/,
              message: "양의 정수만 입력 가능합니다",
            },
            min: {
              value: winnerCountMin,
              message: `추첨인원은 최소 ${winnerCountMin}명 이상입니다`,
            },
            max: {
              value: winnerCountLimit,
              message: `추첨인원은 최대 ${winnerCountLimit}명 입니다`,
            },
          })}
        />
        <span className="absolute right-0 top-0 h-full flex items-center font-semibold">
          명
        </span>
        <label className="absolute bottom-[-2rem] left-0 text-1.2 w-20 text-red-500">
          {errors.winnerCount?.message}
        </label>
      </div>
    </form>
  );
};

export default WinnerCountForm;
