import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import { createBrowserHistory } from "history";
import MockAdapter from "axios-mock-adapter";
import toast from "react-hot-toast";
import { images } from "./mockData";
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

const mock = new MockAdapter(instance, { delayResponse: 100 });

mock.onGet("user").reply(200, {
  user: {
    name: "john",
    id: "123",
  },
  languages: ["bg", "en"],
});

mock.onGet("languages").reply(200, {
  data: ["bg", "en"],
});
// mock.onGet("logged").reply(401, {
//   message: "Login failed",
// });
// mock.onGet("logged").networkError();

// mock.onGet("categories").reply(200, [])
mock.onGet("categories").reply(200, [
  {
    name: "Категория 1",
    id: "123",
    description: "Lorem ipsum dolor sit amet",
    published: true,
    folders: [
      {
        name: "Услуги от България",
        id: "332ss13",
        fileGroups: [
          {
            name: "Група 1",
          },
        ],
      },
      {
        name: "Услуги от Italiq",
        id: "1",
        fileGroups: [
          {
            name: "Група 1",
          },
        ],
      },
    ],
  },
  {
    name: "Категория 2",
    id: "123s3",
    description: "Lorem ipsum dolor sit amet",
    published: true,
    folders: [
      {
        name: "Услуги от България",
        id: "332444dsa13",
        fileGroups: [
          {
            name: "Група 1",
          },
        ],
      },
    ],
  },
  {
    name: "Категория 3",
    id: "fds",
    description: "Lorem ipsum dolor sit amet",
    published: false,
    folders: [
      {
        name: "Услуги от България",
        id: "dsa",
        fileGroups: [
          {
            name: "Група 1",
          },
        ],
      },
    ],
  },
]);

mock.onPost("categories/save").reply(200, {
  name: "Категория 1",
  id: "123",
  description: "Lorem ipsum dolor sit amet",
  published: false,
  folders: [],
});

mock.onPost("categories/save-publish").reply(200, {
  name: "Категория 1",
  id: "123",
  description: "Lorem ipsum dolor sit amet",
  published: true,
  folders: [],
});

// mock.onPut("categories/update").reply(200);
mock.onPut("categories/update").reply(500);

mock.onGet("categories/123").reply(200, {
  data: {
    name: "Категория 3",
    id: "433443",
    description: "Lorem ipsum dolor sit amet",
    published: false,
    languages: {
      bg: {
        name: "Категория 3",
        description: "Lorem ipsum dolor sit amet",
      },
      en: {
        name: "Category 3",
        description: "Lorem fiesta test yeah so beat it",
      },
    },
    folders: [
      {
        name: "Услуги от България",
        id: "555",
        published: false,
      },
      {
        name: "Документи и файлове",
        id: "6666",
        published: true,
      },
      {
        name: "Глоби от продукции",
        id: "3421",
        published: true,
      },
    ],
  },
});

mock.onGet("categories/123/1").reply(200, {
  data: {
    name: "Категория 3",
    id: "433443",
    description: "Lorem ipsum dolor sit amet",
    published: false,
    languages: {
      bg: {
        name: "Категория 3",
        description: "Lorem ipsum dolor sit amet",
      },
      en: {
        name: "Category 3",
        description: "Lorem fiesta test yeah so beat it",
      },
    },
    folders: [
      {
        name: "Услуги от България",
        id: "555",
        published: false,
      },
      {
        name: "Документи и файлове",
        id: "6666",
        published: true,
      },
      {
        name: "Глоби от продукции",
        id: "3421",
        published: true,
      },
    ],
  },
});

// mock.onGet("categories/123").networkError();

mock.onGet("images").reply(200, images);

mock.onPost("upload-image").reply(200, {
  id: "31431",
  fileUrl: "http://localhost:3000/img/img.png",
});

// mock.onPost("upload-image").networkError();

mock.onGet("page/1").reply(200, {
  data: {
    name: "Услуги от Италия",
    isFolders: false,
    records: [
      {
        name: "Категория 1",
        id: "12s3",
        description: "Lorem ipsum dolor sit amet",
        published: true,
      },
    ],
  },
});

mock.onGet("page/2").reply(200, {
  data: {
    name: "Услуги от Италия",
    isFolders: true,
    records: [
      {
        name: "Категория 1",
        id: "12s3",
        description: "Lorem ipsum dolor sit amet",
        published: true,
      },
    ],
  },
});
mock.onGet("page/3").reply(200, {
  data: {
    name: "Услуги от Италия",
    isFolders: false,
    isGroup: true,
  },
});
export default instance;
