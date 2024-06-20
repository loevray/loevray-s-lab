import useControlled from "@/hooks/useControlled";
import {
  RefObject,
  SyntheticEvent,
  createContext,
  useContext,
  useRef,
} from "react";

export interface AccordionContextProps {
  iconRef?: RefObject<HTMLElement>;
  expanded?: boolean;
  onToggle?: (e: SyntheticEvent, expanded: boolean) => void;
}
const AccordionContext = createContext<AccordionContextProps>({});

interface AccordionContextProviderProps extends AccordionContextProps {
  defaultExpanded?: boolean;
  expanded?: boolean;
  children: React.ReactNode;
  handleToggle?: (e: SyntheticEvent, expanded: boolean) => void;
}

const AccordionContextProvider = ({
  children,
  handleToggle,
  expanded,
  defaultExpanded = false,
}: AccordionContextProviderProps) => {
  const [expandedState, setExpandedState] = useControlled({
    valueProp: expanded,
    defaultValue: defaultExpanded,
  });

  const iconRef = useRef<HTMLElement>(null);

  const onToggle = (e: SyntheticEvent, expanded: boolean) => {
    setExpandedState((prev: boolean) => !prev);

    handleToggle?.(e, !expanded);
    if (iconRef.current) {
      const deg = expanded ? "" : "rotate(-90deg)";
      iconRef.current.style.transform = deg;
    }
  };

  return (
    <AccordionContext.Provider
      value={{ iconRef, expanded: expandedState, onToggle }}
    >
      {children}
    </AccordionContext.Provider>
  );
};

export const useAccordionContext = () => useContext(AccordionContext);
export default AccordionContextProvider;
