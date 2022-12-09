import { createTheme } from "@mui/material";

const appTheme = createTheme({
  palette: {
    primary: {
      lighter: "#D0F2FF",
      light: "#74CAFF",
      main: "#1890FF",
      dark: "#0C53B7",
      darker: "#04297A",
    },
    secondary: {
      lighter: "#EBD6FD",
      light: "#B985F4",
      main: "#7635dc",
      dark: "#431A9E",
      darker: "#200A69",
    },
    info: {
      lighter: "#D1FFFC",
      light: "#76F2FF",
      main: "#1CCAFF",
      dark: "#0E77B7",
      darker: "#053D7A",
    },
    success: {
      lighter: "#C8FACD",
      light: "#5BE584",
      main: "#00AB55",
      dark: "#007B55",
      darker: "#005249",
    },
    warning: {
      lighter: "#FFF7CD",
      light: "#FFE16A",
      main: "#FFC107",
      dark: "#B78103",
      darker: "#7A4F01",
    },
    error: {
      lighter: "#FFE7D9",
      light: "#FFA48D",
      main: "#FF4842",
      dark: "#B72136",
      darker: "#7A0C2E",
    },
    grey: {
      100: "#F9FAFB",
      200: "#F4F6F8",
      300: "#DFE3E8",
      400: "#C4CDD5",
      500: "#919EAB",
      600: "#637381",
      700: "#454F5B",
      800: "#212B36",
      900: "#161C24",
    },
    black: {
      light: "#212B36",
      main: "#161C24",
      dark: "#0D1117",
    },
  },
  typography: {
    fontFamily: '"Public Sans","Roboto", sans-serif',
    h1: {
      fontSize: "4rem",
      fontWeight: "600",
    },

    h2: {
      fontSize: "3rem",
      fontWeight: "600",
    },
    h3: {
      fontSize: "2rem",
      fontWeight: "600",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: "600",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: "600",
    },
    h6: {
      fontSize: "0.875rem",
      fontWeight: "600",
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: "600",
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: "600",
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: "500",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: "500",
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: "700",
      letterSpacing: "1.2",
    },
    button: {
      fontWeight: "700",
    },
  },
  shadows: {
    0: "none",
    1: "0px 1px 2px rgba(145, 158, 171, 0.12)",
    8: "0px 8px 16px rgba(145, 158, 171, 0.12)",
    12: "0px 12px 24px -4px  rgba(145, 158, 171, 0.12)",
    16: "0px 16px 32px -4px rgba(145, 158, 171, 0.12)",
    20: "0px 20px 40px -4px  rgba(145, 158, 171, 0.12)",
    24: "0px 24px 48px  rgba(145, 158, 171, 0.2)",
    success: "0px 8px 16px rgba(0, 171, 85, 0.24)",
    primary: "0px 8px 16px rgba(24, 144, 255, 0.24)",
    warning: "0px 8px 16px rgba(255, 193, 7, 0.24)",
    error: "0px 8px 16px rgba(255, 72, 66, 0.24)",
    secondary: " 0px 8px 16px rgba(118, 53 ,220 , 0.24)",
    info: "0px 8px 16px rgba(28, 202, 255, 0.24)",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        sizeLarge: {
          fontSize: "0.9375rem",
          lineHeight: "26px",
        },
        sizeMedium: {
          fontSize: "0.875rem",
          lineHeight: "24px",
        },
        sizeSmall: {
          fontSize: "0.8125rem",
          lineHeight: "22px",
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        sizeMedium: {
          width: "58px",
          height: "38px",
          padding: "9px 13px 9px 12px",
          display: "flex",
        },
        switchBase: {
          padding: "12px",
          left: "3px",
        },

        thumb: {
          width: "14px",
          height: "14px",
        },
        track: {
          borderRadius: "14px",
        },
      },
      defaultProps: {
        size: "medium",
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: {
          borderRadius: "0.5rem",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "0.5rem",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          borderRadius: "0.5rem",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "0.5rem",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          borderRadius: "1rem",
        },
      },
    },
  },
});

export default appTheme;
