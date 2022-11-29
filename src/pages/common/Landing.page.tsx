import { useEffect, FC } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import axiosOrg, { AxiosError, AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { Outlet } from "react-router-dom";

import axios from "../../utils/api";
import useAuth from "../../hooks/useAuth";
import PageLogin from "./Login.page";

interface Props {}

const PageHome: FC<Props> = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const { t } = useTranslation();

  // useEffect(() => {
  //   if (user) {
  //     navigate("/home");
  //   }
  // }, [user]);

  const { refetch: getUser, isLoading: isLoadingUser } = useQuery(
    "getUser",
    async () => {
      const data = await axios("logged");
      return data;
    },
    {
      onSuccess: (data: AxiosResponse<any>) => {
        if (!axiosOrg.isAxiosError(data)) {
          setTimeout(() => {
            setUser(data?.data?.user);
          });
        }
        // navigate("/");
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || `${t("pages.login.loginError")}`);
      },
    }
  );

  const { refetch: getCategories } = useQuery(
    "getCategories",
    async () => {
      const data = await axios("categories");
      return data;
    },
    {
      onSuccess: (data: AxiosResponse<any>) => {
        if (!axiosOrg.isAxiosError(data)) {
          setTimeout(() => {
            setUser(data?.data?.user);
          });
        }
        navigate("/home");
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || `${t("pages.login.loginError")}`);
        navigate("/login");
      },
    }
  );

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return user ? <Outlet /> : isLoadingUser ? null : <PageLogin />;
};

export default PageHome;
