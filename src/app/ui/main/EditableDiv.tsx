interface EdtiableDiv {
  text: string;
  onInput: (text: string) => void;
}

const EditableDiv = ({ text, onInput }: EdtiableDiv) => {
  return (
    <div
      onInput={(event) =>
        onInput((event.target as HTMLDivElement).textContent || "")
      }
      contentEditable
    >
      {text}
    </div>
  );
};

export default EditableDiv;
