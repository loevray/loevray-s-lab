const ELLIPSIS = "...";

const svgEllipsis = <T extends SVGSVGElement, U>(element: T, maxWidth: U) => {
  let text = element.textContent;
  const textLength = text?.length || 0;
  const bbox = element.getBBox();

  if (bbox.width <= maxWidth) return;
};

export default svgEllipsis;
