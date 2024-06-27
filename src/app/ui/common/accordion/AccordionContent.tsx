import { useAccordionContext } from "@/app/ui/common/accordion/provider/AccordionContextProvider";
import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {}

const AccordionContent = ({
  children,
  className,
  ...rest
}: AccordionContentProps) => {
  const { expanded } = useAccordionContext();
  const classNames = twMerge("transition-opacity px-1 w-full", className);
  return (
    <div
      className={`${classNames} ${
        expanded ? "opacity-100 visible h-auto" : "opacity-0 invisible h-0"
      }`}
      {...rest}
    >
      {children}
    </div>
  );
};

export const AccordionContentType = (<AccordionContent />).type;

export default AccordionContent;
