import { useAccordionContext } from "@/provider/AccordionContextProvider";
import { HTMLAttributes, ReactNode } from "react";

interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {}

const AccordionContent = ({ children, ...rest }: AccordionContentProps) => {
  const { expanded } = useAccordionContext();
  return (
    <div
      className={`transition-opacity px-1  ${
        expanded ? "opacity-100 visible h-auto" : "opacity-0 invisible h-0"
      } `}
      {...rest}
    >
      {children}
    </div>
  );
};

export const AccordionContentType = (<AccordionContent />).type;

export default AccordionContent;
