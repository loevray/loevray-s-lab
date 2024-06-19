import { Children, ReactNode, isValidElement } from "react";

const divideChildrenTwoTypes = <T,>(children: ReactNode, typeA: T) => {
  const childrenArray = Children.toArray(children);
  const typeAChildren = childrenArray.filter(
    (child) => isValidElement(child) && child.type === typeA
  );
  const restChildren = childrenArray.filter(
    (child) => !typeAChildren.includes(child)
  );
  return { typeAChildren, restChildren };
};

export default divideChildrenTwoTypes;
