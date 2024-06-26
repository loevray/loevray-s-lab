import { useAccordionContext } from "@/app/ui/common/accordion/provider/AccordionContextProvider";
import { HTMLAttributes, ReactNode } from "react";

interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {}

const AccordionContent = ({
  children,
  className,
  ...rest
}: AccordionContentProps) => {
  const { expanded } = useAccordionContext();
  return (
    <div
      className={`transition-opacity px-1 w-full ${
        expanded ? "opacity-100 visible h-auto" : "opacity-0 invisible h-0"
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export const AccordionContentType = (<AccordionContent />).type;

export default AccordionContent;
