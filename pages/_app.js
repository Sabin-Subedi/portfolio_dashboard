import { ThemeProvider } from "@mui/material";
import "../styles/globals.css";
import appTheme from "../theme/appTheme";
import { defaultLayout } from "./layout/default";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || defaultLayout;

  return (
    <ThemeProvider theme={appTheme}>
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
}

export default MyApp;
