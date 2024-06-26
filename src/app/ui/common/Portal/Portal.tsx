import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }: { children: ReactNode }) => {
  const [portalElement, setPortalElement] = useState<Element | null>(null);
  useEffect(() => {
    setPortalElement(document.body);
  }, []);

  if (!portalElement) return null;
  return createPortal(children, portalElement);
};

export default Portal;
