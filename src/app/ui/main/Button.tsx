interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      className="w-20 h-10 bg-purple-400 border-solid rounded-md border-purple-600 border-2"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
