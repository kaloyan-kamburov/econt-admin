import React, { createContext, useState } from "react";

type TitleContextType = {
  title: string | null;
  setTitle: (newTitle: string | null) => void;
};

interface Props {
  children: JSX.Element;
}

export const PageTitleContext = createContext<TitleContextType>({
  title: null,
  setTitle: () => {},
});

export const useProvidePageTitle = () => {
  const [title, setTitle] = useState<string | null>(null);

  return {
    title,
    setTitle,
  };
};

export const PageTitleProvider: React.FC<Props> = ({ children }) => {
  const pageTitle = useProvidePageTitle();
  return <PageTitleContext.Provider value={pageTitle}>{children}</PageTitleContext.Provider>;
};
