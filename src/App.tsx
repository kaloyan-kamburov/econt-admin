import { Suspense } from "react";
import { QueryClient, QueryClientProvider, QueryCache } from "react-query";
import toast from "react-hot-toast";
import "moment/locale/en-gb";
import { Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider, BrowserRouter } from "react-router-dom";

//MUI components
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";

//Custom components
import { AppWrapper } from "./components/layout/layout.components";
import Loader from "./components/common/Loader/Loader.component";
import Toast from "./components/common/Toast/Toast.component";

//pages
import PageLanding from "./pages/common/Landing.page";
import PageBegin from "./pages/authenticated/Begin/Begin.page";
import PageCategory from "./pages/authenticated/Category/Category.page";
import PageFolder from "./pages/authenticated/Folder/Folder.page";

//Utils
import theme from "./styles/theme";

//context
import { AuthProvider } from "./context/auth";
import { PageTitleProvider } from "./context/pageTitle";

//i18n
import "./utils/i18n";
import ProtectedRoute from "./pages/authenticated/ProtectedRoute";
import useAuth from "./hooks/useAuth";

//React query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error: any) => {
        toast.error(error?.message || "Something went wrong.");
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      cacheTime: 0,
      enabled: false,
    },
    mutations: {
      retry: false,
      // cacheTime: 0,
      onError: (error: any) => {
        toast.error(error?.message || "Something went wrong.");
      },
    },
  },
});

//router
const routes = createBrowserRouter([
  {
    path: "/",
    element: <PageLanding />,
    children: [
      {
        path: "/",
        element: (
          <AppWrapper>
            <PageBegin />
          </AppWrapper>
        ),
      },
      {
        path: "category/:id",
        element: (
          // <AuthProvider>
          <AppWrapper>
            <PageCategory />
          </AppWrapper>
          // </AuthProvider>
        ),
      },
      {
        path: "category/:id/:folderId",
        element: (
          // <AuthProvider>
          <AppWrapper>
            <PageFolder />
          </AppWrapper>
          // </AuthProvider>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loader />}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
              <PageTitleProvider>
                <RouterProvider router={routes} />
              </PageTitleProvider>
            </AuthProvider>
            <Loader />
          </ThemeProvider>
        </LocalizationProvider>
      </Suspense>
      <Toast />
    </QueryClientProvider>
  );
}

export default App;
