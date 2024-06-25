import { RefObject, forwardRef } from "react";

const WinnerCountForm = ({
  winnerCountInputRef,
}: {
  winnerCountInputRef: RefObject<HTMLInputElement>;
}) => (
  <form>
    <input
      className="w-6.5 h-3 pl-1 shadow-xl bg-yellow-50 focus:bg-yellow-100 focus:outline-none"
      ref={winnerCountInputRef}
    />
    명
  </form>
);

export default WinnerCountForm;
