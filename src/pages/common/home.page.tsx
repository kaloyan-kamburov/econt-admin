import { useEffect, FC } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import axiosOrg, { AxiosError, AxiosResponse } from "axios";

import axios from "../../utils/api";

interface Props {}

const PageHome: FC<Props> = () => {
  const navigate = useNavigate();
  const { refetch: getUser } = useQuery(
    "getUser",
    async () => {
      const data = await axios("logged");
      return data;
    },
    {
      enabled: false,
      onSuccess: (data: AxiosResponse<any>) => {
        if (axiosOrg.isAxiosError(data)) {
          navigate("login");
        }
      },
    }
  );

  useEffect(() => {
    getUser();
  }, []);

  return null;
};

export default PageHome;
