import { ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { AppContextProvider, useAppContext } from "../context";
import { LOGIN_USER } from "../context/actions";
import { firebase } from "../firebase/firebase";
import WithOauthState from "../hoc/withOauthState";

import "../styles/globals.css";
import appTheme from "../theme/appTheme";
import { defaultLayout } from "./layout/default";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || defaultLayout;
  const [loadingPage, setLoadingPage] = useState(false);
  const comp = getLayout(<Component {...pageProps} firebase={firebase} />);

  return (
    <AppContextProvider>
      <ThemeProvider theme={appTheme}>
        <WithOauthState>{comp}</WithOauthState>
      </ThemeProvider>
    </AppContextProvider>
  );
}

export default MyApp;
