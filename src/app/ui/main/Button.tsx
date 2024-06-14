interface ButtonProps {
  text?: string;
  disabled?: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

const Button = ({ text, onClick, disabled = false, children }: ButtonProps) => {
  return (
    <button
      className="w-20 h-10 bg-purple-400 border-solid rounded-md border-purple-600 border-2"
      onClick={onClick}
      disabled={disabled}
    >
      {text ? text : children}
    </button>
  );
};

export default Button;
