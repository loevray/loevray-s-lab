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
    <form className="flex flex-col relative" onSubmit={handleSubmit(onSubmit)}>
      <label className="absolute top-[-2rem] left-[-2rem] text-1.2 w-20 text-red-500">
        {errors.winnerCount?.message}
      </label>
      <div>
        <input
          disabled={disabled}
          className="w-7 h-3 pl-1 shadow-xl bg-yellow-50 focus:bg-yellow-100 focus:outline-none disabled:cursor-not-allowed disabled:bg-yellow-600"
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
        <span>명</span>
      </div>
    </form>
  );
};

export default WinnerCountForm;
