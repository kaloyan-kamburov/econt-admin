import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import { createBrowserHistory } from "history";
// import { useRoutes } from "react-router-dom";

const baseURL = process.env.REACT_APP_API_URL;
const instance = axios.create({
  baseURL,
  timeout: 20000,
  // withCredentials: true,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

// instance.interceptors.request.use((config: AxiosRequestConfig<any>) => {
//   const token = localStorage.getItem("access_token");

//   if (token && config?.headers) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// instance.defaults.headers.common = {
//   Authorization: `Bearer ${localStorage.getItem("access_token")}`,
// };

const history = createBrowserHistory();

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      localStorage.removeItem("auth");
      history.replace("/login");
      history.push("/login");
      window.location.href = "/login";
    }
    return error;
  }
);

export default instance;
