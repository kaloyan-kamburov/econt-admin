import { useEffect, FC, useState } from "react";
import { useQuery } from "react-query";
import axiosOrg, { AxiosError, AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { Outlet } from "react-router-dom";

//pages
import PageLogin from "./Login.page";

//utils
import axios from "../../utils/api";

//hooks
import { useAuth, useCategories } from "../../hooks/hooks";

interface Props {}

const PageHome: FC<Props> = () => {
  const [appLoaded, setAppLoaded] = useState<boolean>(false);
  const [loadFailed, setLoadFailed] = useState<boolean>(false);
  const { user, setUser, setLanguages } = useAuth();
  const { categories, setCategories } = useCategories();
  const { t } = useTranslation();

  const { refetch: getUser } = useQuery(
    "getUser",
    async () => {
      const data = await axios("user");
      return data;
    },
    {
      onSuccess: (data: AxiosResponse<any>) => {
        if (!axiosOrg.isAxiosError(data)) {
          setUser({
            ...(data?.data?.user || {}),
          });
        }
      },
      onError: (error: AxiosError) => {
        setLoadFailed(true);
        toast.error(error?.message || `${t("pages.login.loginError")}`);
      },
    }
  );

  const { refetch: getLanguages } = useQuery(
    "getLanguages",
    async (userId) => {
      const data = await axios("languages");
      return data;
    },
    {
      onSuccess: (data: AxiosResponse<any>) => {
        if (!axiosOrg.isAxiosError(data)) {
          setLanguages(data.data);
          getCategories();
        }
      },
      onError: (error: AxiosError) => {
        setLoadFailed(true);
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
          setCategories(data?.data || []);
          setAppLoaded(true);
        }
      },
      onError: (error: AxiosError) => {
        setLoadFailed(true);
        toast.error(error?.message || `${t("pages.login.loginError")}`);
      },
    }
  );

  useEffect(() => {
    if (user) {
      getLanguages();
    }
  }, [user]);

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loadFailed ? <PageLogin /> : appLoaded ? <Outlet /> : null;

  // return appLoaded ? <Outlet /> : loadFailed ? <PageLogin /> : null;
};

export default PageHome;
