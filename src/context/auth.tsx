import React, { createContext, useState } from "react";

type User = {
  name: string;
  id: string;
};

type AuthContextType = {
  user: User | null;
  setUser: (user?: any) => void;
  languages: any[];
  setLanguages: (langs?: any) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  languages: [],
  setLanguages: () => {},
});

interface Props {
  children: JSX.Element;
}

export const useProvideAuth = () => {
  const [user, setUser] = useState<User | null>({
    name: "john",
    id: "123",
  });
  const [languages, setLanguages] = useState<any[]>([]);

  return {
    user,
    setUser,
    languages,
    setLanguages,
  };
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
