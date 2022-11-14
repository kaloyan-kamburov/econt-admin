import { createTheme } from "@mui/material/styles";

//general colors
export const mainColor = "#212121";
export const lightColor = "#616161";
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
  },
  typography: {
    allVariants: {
      color: mainColor,
    },
    fontFamily: [
      '"Open Sans"',
      "-apple-system, BlinkMacSystemFont",
      '"Segoe UI"',
      '"Roboto"',
      '"Oxygen"',
      '"Ubuntu"',
      '"Cantarell"',
      '"Fira Sans"',
      '"Droid Sans"',
      '"Helvetica Neue"',
      "sans-serif",
    ].join(","),
    body1: {
      fontSize: "15px",
      lineHeight: "24px",
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
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          overflow: "visible",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: "56px !important",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "&:disabled": {
            opacity: 0.3,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none !important",
          borderRadius: "20px",
          height: "40px",
          fontSize: "18px",
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
        // contained: {
        //   color: "#fff",
        //   borderRadius: "3px",
        //   fontSize: "18px",
        //   lineHeight: "22px",
        //   padding: "7px 9px",
        //   minWidth: "90px",
        //   height: "38px",
        //   textTransform: "none",
        //   // "&:hover": {
        //   //   background: "#4f6987",
        //   // },
        // },
        // outlined: {
        //   fontSize: "18px",
        //   lineHeight: "22px",
        //   padding: "7px 9px",
        //   minWidth: "90px",
        //   textTransform: "none",
        // },
        // text: {
        //   textTransform: "none",
        //   "&.nav-link": {
        //     color: "#fff",
        //     position: "relative",
        //     borderRadius: 0,
        //     borderBottom: "2px solid transparent",
        //     fontSize: "22px",
        //     letterSpacing: "0.5px",

        //     "&:hover": {
        //       background: "#3e4956",
        //     },

        //     "&.active": {
        //       borderBottom: "2px solid #fff",
        //     },

        //     "&.log-out": {
        //       fontSize: "16px",
        //     },
        //   },
        // },
      },
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          // top: "8px",
          // fontSize: "15px",
          fontStyle: "italic",
          // color: lightColor,
          // transform: "translate(14px, 14px) scale(1)",
          // "&.Mui-focused": {
          //   transform: "translate(14px, -9px) scale(0.75)",
          // },
          // background: "transparent",
        },
      },
    },
    // MuiFormControl: {
    //   styleOverrides: {
    //     root: {
    //       width: "100%",
    //       height: "50px",
    //     },
    //   },
    // },
    // MuiInputBase: {
    //   styleOverrides: {
    //     root: {
    //       height: "50px",
    //     },
    //   },
    // },
    // MuiOutlinedInput: {
    //   styleOverrides: {
    //     root: {
    //       width: "100%",
    //       minHeight: "50px",
    //     },
    //   },
    // },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          paddingBottom: "20px",
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&:disabled": {
            opacity: 0.5,
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
  },
});
