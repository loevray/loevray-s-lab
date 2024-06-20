import { useAccordionContext } from "@/provider/AccordionContextProvider";
import { ReactNode } from "react";

const AccordionContent = ({ children }: { children?: ReactNode }) => {
  const { expanded } = useAccordionContext();
  return expanded && <div>{children}</div>;
};

export const AccordionContentType = (<AccordionContent />).type;

export default AccordionContent;
