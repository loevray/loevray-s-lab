interface AccordionSummaryProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
}
const AccordionSummary = ({ children, icon = "▽" }: AccordionSummaryProps) => (
  <summary className="cursor-pointer list-none flex justify-between">
    {children}
    <span>{icon}</span>
  </summary>
);

interface AccordionProps {
  defaultExpanded?: boolean;
  onChange?: () => void;
}
const Accordion = ({ defaultExpanded = false, onChange }: AccordionProps) => {
  return (
    <details className="text-white p-1" open={defaultExpanded}>
      <AccordionSummary>메뉴</AccordionSummary>
      <span>세부내용</span>
    </details>
  );
};

/* 
  1. 제어-비제어 컴포넌트가 가능해야한다.
  2. compound패턴을 사용한다.
*/
export default Accordion;
