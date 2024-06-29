import { Dispatch, SetStateAction, useState } from "react";

export type LoadingStateType = "initial" | "pending" | "fulfilled";

export type UseLoadingStateType<K extends string> = {
  [key in K]: LoadingStateType;
};
const useLoadingState = <K extends string>(
  initialState: UseLoadingStateType<K>
): [
  UseLoadingStateType<K>,
  Dispatch<SetStateAction<UseLoadingStateType<K>>>
] => {
  const [isLoading, setIsLoading] =
    useState<UseLoadingStateType<K>>(initialState);

  return [isLoading, setIsLoading];
};

export default useLoadingState;
