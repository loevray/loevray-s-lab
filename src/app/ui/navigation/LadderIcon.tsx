import React, { forwardRef, Ref } from "react";

interface LadderIconProps extends React.ComponentPropsWithoutRef<"svg"> {}

const LadderIcon = forwardRef<SVGSVGElement, LadderIconProps>(
  ({ ...props }: LadderIconProps, svgRef: Ref<SVGSVGElement>) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
        data-slot="icon"
        ref={svgRef}
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 2v20M16 2v20M8 6h8M8 10h8M8 14h8M8 18h8"
        />
      </svg>
    );
  }
);

LadderIcon.displayName = "LadderIcon";

export default LadderIcon;
