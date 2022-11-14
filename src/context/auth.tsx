import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useMutation } from "@tanstack/react-query";
import axios from "axios";
// import jwt_decode from "jwt-decode";
import toast from "react-hot-toast";

type User = {
  name: string;
};

type AuthContextType = {
  // loading: boolean;
  user: User | null;
  // role: string | null;
  // id: string | null;
  // login: ((loginData: LoginType) => void) | (() => void);
  // logout: () => void;
  setUser: (user?: any) => void;
};

export const AuthContext = createContext<AuthContextType>({
  // loading: false,
  // user: { name: "John" },
  user: null,
  // role: null,
  // id: null,
  // login: () => {},
  // logout: () => {},
  setUser: () => {},
});

interface Props {
  children: JSX.Element;
}

type LoginType = {
  username: string;
  password: string;
  from?: any;
};

type ApiResponse = {
  access_token: string;
  from?: string | null;
};

export const useProvideAuth = () => {
  const [user, setLoggedUser] = useState<User | null>({
    name: "john",
  });
  // const [role, setRole] = useState<string | null>(null);
  // const [id, setId] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const lsAuth = localStorage.getItem("auth");
    const auth = lsAuth ? JSON.parse(lsAuth) : null;
    // setUser(auth?.user || null);
    // setRole(auth?.role || null);
  }, []);

  // const loginUser = useMutation(
  //   async ({ username, password, from }: LoginType) => {
  //     const { data } = await axios.post(
  //       `${process.env.REACT_APP_API_URL}/login`,
  //       {
  //         username,
  //         password,
  //       }
  //     );

  //     return {
  //       ...data,
  //       from: from || null,
  //     };
  //   },
  //   {
  //     onSuccess: (data: ApiResponse) => {
  //       const response: any = data.access_token
  //         ? jwt_decode(data.access_token)
  //         : null;
  //       if (response) {
  //         localStorage.setItem(
  //           "auth",
  //           JSON.stringify({
  //             user: response?.name,
  //             role: response?.is_admin ? "admin" : "user",
  //             id: response?._id || null,
  //           })
  //         );
  //         localStorage.setItem("access_token", data.access_token);
  //         setUser(response?.name);
  //         setRole(response?.is_admin ? "admin" : "user");
  //         setId(response?._id || null);
  //         navigate(data.from || "/master_tasks");
  //         toast.success("Successful login.");
  //       }
  //     },
  //     onError: (error: any) => {
  //       toast.error(error?.message);
  //     },
  //   }
  // );

  // const login = ({ username, password, from }: LoginType) =>
  //   loginUser.mutate({ username, password, from });

  const setUser = (user: any) => setLoggedUser(user);

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("access_token");
    // setUser(null);
    // setRole(null);
    // setId(null);
    navigate("/");
    toast("Logged out.");
  };

  return {
    // login,
    setUser,
    logout,
    user,
    // role,
    // id,
    // loading: loginUser.isLoading || false,
  };
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
  // return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
