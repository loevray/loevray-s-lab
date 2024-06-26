import { ChangeEvent, RefObject, forwardRef } from "react";

const WinnerCountForm = ({
  winnerLimitState,
  onChange,
}: {
  winnerLimitState: number;
  onChange: (e: number) => void;
}) => (
  <form>
    <input
      className="w-7 h-3 pl-1 shadow-xl bg-yellow-50 focus:bg-yellow-100 focus:outline-none"
      type="number"
      value={winnerLimitState}
      onChange={(e) => onChange(+e.target.value)}
    />
    명
  </form>
);

export default WinnerCountForm;
