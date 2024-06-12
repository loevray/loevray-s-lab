import { useEffect, useRef } from "react";

interface EdtiableDiv {
  text: string;
  onInput: (text: string) => void;
}

const EditableDiv = ({ text, onInput }: EdtiableDiv) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current && text) {
      divRef.current.textContent = text;
    }
  }, [text]);

  return (
    <div
      className="w-[300px] h-[35px] border-solid border-black border-2"
      onInput={(e: React.ChangeEvent<HTMLDivElement>) => {
        onInput(e.target.textContent || "");
        divRef.current && (divRef.current.textContent = e.target.textContent);
      }}
      contentEditable
      ref={divRef}
    />
  );
};

export default EditableDiv;
