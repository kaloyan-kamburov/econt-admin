import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import toast from "react-hot-toast";
import "moment/locale/en-gb";
import { useTranslation } from "react-i18next";

//MUI components
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";

//Custom components
import { AppWrapper } from "./components/layout/layout.components";

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

function App() {
  const { t, i18n } = useTranslation();
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>loading</div>}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppWrapper>
              <div>
                {t("pages.home.hi")}
                <button onClick={() => i18n.changeLanguage("asd")}>
                  click
                </button>
              </div>
            </AppWrapper>
          </ThemeProvider>
        </LocalizationProvider>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
