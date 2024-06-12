import { useEffect, useRef } from "react";

interface EdtiableDiv {
  text: string;
  onInput: (text: string) => void;
}

const EditableDiv = ({ text, onInput }: EdtiableDiv) => {
  /* 
    1. 렌더링될땐 컴포넌트 내부에 텍스트 값이 없으므로 props를 받아옴
    2. 이후엔 ref값으로 대체하면 초기화가 안 될것 같다?
  */
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current && text) {
      divRef.current.textContent = text;
    }
  }, [text]);

  return (
    <div
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
