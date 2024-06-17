const getRemInPx = () =>
  parseFloat(getComputedStyle(document.documentElement).fontSize);

export default getRemInPx
