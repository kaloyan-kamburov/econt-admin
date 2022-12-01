import React, { createContext, useState } from "react";

type User = {
  name: string;
  languages: string[];
};

type AuthContextType = {
  user: User | null;
  setUser: (user?: any) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

interface Props {
  children: JSX.Element;
}

export const useProvideAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  return {
    setUser,
    user,
  };
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
