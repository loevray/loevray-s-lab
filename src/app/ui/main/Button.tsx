interface ButtonProps {
  text?: string;
  disabled?: boolean;
  width?: string;
  height?: string;
  onClick: () => void;
  children?: React.ReactNode;
}

const Button = ({
  text,
  onClick,
  disabled = false,
  children,
  width = "w-[100px]",
  height = "h-[30px]",
}: ButtonProps) => {
  return (
    <button
      className={`bg-cyan-500 cursor-pointer hover:bg-cyan-400 rounded-sm text-white shadow-md ${width} ${height}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text ? text : children}
    </button>
  );
};

export default Button;
