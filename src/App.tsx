import { Suspense } from "react";
import { QueryClient, QueryClientProvider, QueryCache } from "react-query";
import toast from "react-hot-toast";
import "moment/locale/en-gb";
import {
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

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
import PageHome from "./pages/common/home.page";
import PageLogin from "./pages/common/login.page";
import PageBegin from "./pages/authenticated/Begin/begin.page";

//Utils
import theme from "./styles/theme";

//i18n
import "./utils/i18n";

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
const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/login" element={<PageLogin />} />,
    <Route path="/" element={<PageHome />} errorElement={<div>error</div>}>
      <Route path="/home" element={<PageBegin />} />
    </Route>,
  ])
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>loading</div>}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppWrapper>
              <RouterProvider router={router} />
            </AppWrapper>
            <Loader />
          </ThemeProvider>
        </LocalizationProvider>
      </Suspense>
      <Toast />
    </QueryClientProvider>
  );
}

export default App;
