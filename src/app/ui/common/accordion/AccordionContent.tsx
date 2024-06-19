import { ReactNode } from "react";

const AccordionContent = ({ children }: { children?: ReactNode }) => (
  <div>{children}</div>
);

export const AccordionContentType = (<AccordionContent />).type;

export default AccordionContent;
