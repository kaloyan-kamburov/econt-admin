import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import { createBrowserHistory } from "history";
import MockAdapter from "axios-mock-adapter";
import toast from "react-hot-toast";
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

// instance.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   (error: AxiosError) => {
//     toast.error(error?.message || "An error occured");
//     return error;
//     // if (error?.response?.status === 401 || error?.response?.status === 403) {
//     //   localStorage.removeItem("auth");
//     //   history.replace("/login");
//     //   history.push("/login");
//     //   window.location.href = "/login";
//     // }
//     // return error;
//   }
// );

const mock = new MockAdapter(instance, { delayResponse: 1000 });

// mock.onGet("logged").reply(500, {
//   message: "Login failed",
// });

// mock.onGet("logged").networkError();

mock.onGet("logged").reply(200, {
  user: {
    name: "john",
  },
});
// mock.onGet("categories").reply(200, [])
mock.onGet("categories").reply(200, [
  {
    name: "Категория 1",
    id: "123",
    description: "Lorem ipsum dolor sit amet",
    folders: [
      {
        name: "Услуги от България",
        fileGroups: [
          {
            name: "Група 1",
          },
        ],
      },
    ],
  },
]);

// mock.onGet("logged").networkError();

export default instance;
