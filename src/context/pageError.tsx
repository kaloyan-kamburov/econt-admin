import React, { createContext, useEffect, useState } from "react";

type PageErrorContextType = {
  errorMsg?: string | undefined;
  setErrorMsg?: (newMsg: string) => void;
  visibleError: boolean;
  setVisibleError: (visible: boolean) => void;
  retryFn: { execute: () => void };
  setRetryFn: any;
};

interface Props {
  children: JSX.Element;
}

export const PageErrorContext = createContext<PageErrorContextType>({
  errorMsg: "",
  setErrorMsg: () => {},
  visibleError: false,
  setVisibleError: () => {},
  retryFn: { execute: () => {} },
  setRetryFn: () => {},
});

export const useProvidePageError = () => {
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const [visibleError, setVisibleError] = useState<boolean>(false);
  const [retryFn, setRetryFn] = useState<any>({ execute: () => {} });

  return {
    errorMsg,
    setErrorMsg,
    visibleError,
    setVisibleError,
    retryFn,
    setRetryFn,
  };
};

export const PageErrorProvider: React.FC<Props> = ({ children }) => {
  const pageErrorData = useProvidePageError();
  return <PageErrorContext.Provider value={pageErrorData}>{children}</PageErrorContext.Provider>;
};
