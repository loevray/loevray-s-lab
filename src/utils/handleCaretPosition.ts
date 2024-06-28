const handleCaretPosition = (node: Node) => {
  const range = document.createRange();
  const selection = document.getSelection();
  range.selectNodeContents(node);
  range.collapse(false);
  selection?.removeAllRanges();
  selection?.addRange(range);
}

export default handleCaretPosition
