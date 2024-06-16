const getRemInPx = () =>
  parseFloat(getComputedStyle(document.documentElement).fontSize);

const convertToPx = (value: string) => {
  const units = value.match(/[a-z%]+$/i);
  const number = parseFloat(value);

  if (!units) {
    return number;
  }

  switch (units[0]) {
    case "px":
      return number;
    case "rem":
      return number * getRemInPx();
    default:
      return number;
  }
};

export default convertToPx;
