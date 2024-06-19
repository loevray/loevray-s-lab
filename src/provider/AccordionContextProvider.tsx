import {
  RefObject,
  SyntheticEvent,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";

export interface AccordionContextProps {
  iconRef?: RefObject<HTMLElement>;
  expanded?: boolean;
  onToggle?: (e: SyntheticEvent<HTMLDetailsElement>) => void;
}
const AccordionContext = createContext<AccordionContextProps>({});

interface AccordionContextProviderProps extends AccordionContextProps {
  defaultExpanded?: boolean;
  children: React.ReactNode;
}

const AccordionContextProvider = ({
  children,
  defaultExpanded = false,
}: AccordionContextProviderProps) => {
  const [expanded, setExpanded] = useState(false);
  const iconRef = useRef<HTMLElement>(null);
  const handleToggle = (e: SyntheticEvent<HTMLDetailsElement>) => {
    setExpanded((prev) => !prev);
    if (iconRef.current) {
      const deg = expanded ? "" : "rotate(-90deg)";
      iconRef.current.style.transform = deg;
    }
  };
  return (
    <AccordionContext.Provider
      value={{ iconRef, expanded: defaultExpanded, onToggle: handleToggle }}
    >
      {children}
    </AccordionContext.Provider>
  );
};

export const useAccordionContext = () => useContext(AccordionContext);
export default AccordionContextProvider;
