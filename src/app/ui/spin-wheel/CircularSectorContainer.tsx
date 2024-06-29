import { ComponentProps, ForwardedRef, forwardRef } from "react";

interface CircularSectorContainerProps extends ComponentProps<"svg"> {
  diameter: number;
  defaultRotateDeg: number;
}
const CircularSectorContainer = forwardRef<
  SVGSVGElement,
  CircularSectorContainerProps
>(
  (
    { children, diameter, defaultRotateDeg, ...rest },
    ref: ForwardedRef<SVGSVGElement>
  ) => {
    return (
      <svg
        viewBox={`0 0 ${diameter} ${diameter}`}
        width={diameter}
        height={diameter}
        transform={`rotate(${defaultRotateDeg})`}
        {...rest}
        ref={ref}
      >
        {children}
      </svg>
    );
  }
);

CircularSectorContainer.displayName = "CircularSectorContainer";
export default CircularSectorContainer;
