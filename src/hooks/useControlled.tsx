import { useCallback, useRef, useState } from "react";

interface IUseControlledArgs<T = any> {
  valueProp?: T;
  defaultValue?: T;
}

type IUseControlledReturn<T = any> = [
  T,
  React.Dispatch<React.SetStateAction<T>>
];

function useControlled<T = any>(
  args: IUseControlledArgs<T> = {}
): IUseControlledReturn {
  const { valueProp, defaultValue } = args;

  const { current: isControlled } = useRef(valueProp !== undefined);

  const [state, setState] = useState<T | undefined>(defaultValue);

  const value = isControlled ? valueProp : state;
  const setValue: React.Dispatch<React.SetStateAction<T | undefined>> =
    useCallback((newState) => {
      !isControlled && setState(newState);
    }, []);

  return [value, setValue];
}
