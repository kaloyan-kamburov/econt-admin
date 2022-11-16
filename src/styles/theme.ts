import { createTheme } from "@mui/material/styles";

//general colors
export const mainColor = "#212121";
export const lightColor = "#616161";
export const infoColor = "#D7D7D7";
export const infoColorContast = "#424242";
export const bgHeaders = "#fff";
export const bgSections = "#fff";
export const linkColor = "#003F85";

//toast (alert) messages
export const informationBgColor = "#E2F6FC";
export const informationColor = "#18435E";
export const informationColorFocus = "#3683B2";

export const successBgColor = "#D4EAA7";
export const successColor = "#145817";
export const successColorFocus = "#298D2E";

export const warningBgColor = "#FFF27D";
export const warningColor = "#8E5006";
export const warningColorFocus = "#D67C11";

export const errorBgColor = "#FFCFCF";
export const errorColor = "#E24E4A";
export const errorColorFocus = "#BE0000";

//forms
export const inputBorder = "#C4C4C4";
export const bgForms = "#fff";

//buttons
export const btnContainedPrimaryBgColor = "#234182";
export const btnContainedPrimaryBgColorHover = "#162a54";

//theme
export default createTheme({
  palette: {
    background: {
      default: "#E3E3E3",
    },
    primary: {
      main: mainColor,
      light: lightColor,
    },
    error: {
      main: errorColor,
    },
    info: {
      main: infoColor,
      contrastText: infoColorContast,
    },
  },
  typography: {
    allVariants: {
      color: mainColor,
    },
    fontFamily: ['"Open Sans"', "-apple-system, BlinkMacSystemFont", '"Segoe UI"', '"Roboto"', '"Oxygen"', '"Ubuntu"', '"Cantarell"', '"Fira Sans"', '"Droid Sans"', '"Helvetica Neue"', "sans-serif"].join(","),
    body1: {
      fontSize: "calc(3 * var(--atom))px",
      lineHeight: "calc(4.8 * var(--atom))px",
      fontWeight: "300 !important",
      small: {
        fontSize: "10px",
        lineHeight: "16px",
      },
      span: {
        "&.small": {
          fontSize: "10px",
          lineHeight: "16px",
        },
        "&.big": {
          fontSize: "18px",
          lineHeight: "24px",
        },
        "&.large": {
          fontSize: "26px",
          lineHeight: "30px",
        },
      },
    },
    h1: {
      fontSize: "36px",
      lineHeight: "40px",
      fontWeight: "normal",
    },
    h2: {
      fontSize: "24px",
      lineHeight: "30px",
      fontWeight: "normal",
    },
    h3: {
      fontSize: "20px",
      lineHeight: "24px",
      fontWeight: "normal",
    },
    h4: {
      fontSize: "18px",
      lineHeight: "22px",
      fontWeight: "normal",
    },
    h5: {
      fontSize: "14px",
      lineHeight: "18px",
      fontWeight: "normal",
    },
  },
  components: {
    //header
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    //buttons
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none !important",
          borderRadius: "calc(4 * var(--atom))",
          height: "calc(8 * var(--atom))",
          fontSize: "calc(3.6 * var(--atom))",
          fontWeight: "300",
          width: "100%",
          textTransform: "none",
        },
        containedPrimary: {
          background: btnContainedPrimaryBgColor,
          "&:hover": {
            background: btnContainedPrimaryBgColorHover,
          },
        },
        containedInfo: {
          background: infoColor,
          "&:hover": {
            color: bgHeaders,
          },
        },
      },
    },
    //modals
    MuiDialog: {
      styleOverrides: {
        paper: {
          "&.big": {
            width: "100%",
            maxWidth: "calc(138 * var(--atom))",
          },
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: "calc(5.6 * var(--atom))",
          lineHeight: "calc(6.4 * var(--atom))",
          fontWeight: 300,
          padding: "calc(3 * var(--atom)) calc(4 * var(--atom))",
          display: "flex",
          justifyContent: "space-between",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          paddingBottom: "20px",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: "calc(4 * var(--atom))",
        },
      },
    },
    //form elements
    MuiFilledInput: {
      styleOverrides: {
        root: {
          background: bgHeaders,
          border: `1px solid ${inputBorder}`,
          borderRadius: "5px",
          "&.Mui-error": {
            borderColor: errorColor,
            background: bgHeaders,
          },
          "&:after": {
            display: "none",
          },
          "&:before": {
            display: "none",
          },
          "&:hover": {
            background: bgHeaders,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontStyle: "italic",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          input: {
            background: bgHeaders + " !important",
            borderRadius: "var(--atom)",
          },
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&:disabled": {
            opacity: 0.5,
          },
          "&.MuiTab-root": {
            fontWeight: 300,
            fontSize: "calc(3.6 * var(--atom))",
            padding: "calc(2.4 * var(--atom)) calc(3.2 * var(--atom))",
          },
        },
      },
    },
    // MuiSelect: {
    //   styleOverrides: {
    //     outlined: {
    //       width: "100%",
    //       background: tableFilterInputsBg,
    //       paddingTop: "10px",
    //       paddingBottom: "10px",
    //       ".MuiButtonBase-root": {
    //         marginRight: "10px",
    //       },
    //     },
    //   },
    // },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginBottom: "calc(6.4 * var(--atom))",
        },
      },
    },
  },
});
