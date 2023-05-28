import { createTheme, ThemeProvider } from "@mui/material/styles";
import AllRoutes from "./routes";
import ReduxToastr from "react-redux-toastr";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFCD36",
      contrastText: "white",
    },
    white: {
      main: "#ffffff",
      contrastText: "white",
    },

    activeStatus: {
      main: "#4C6FFF",
      contrastText: "#fff",
    },
    secondary: {
      main: "#F7FAFC",
    },
    greenClr: {
      main: "#66CB9F",
      contrastText: "#fff",
    },
    yellowClr: {
      main: "#FFCD1E",
      contrastText: "#fff",
    },
    redClr: {
      main: "#FF7171",
      // contrastText: "#fff",
    },
    orangeClr: {
      main: "#F2994A",
      contrastText: "#fff",
    },
    yellow2: {
      main: "#F2C94C",
      contrastText: "#fff",
    },
    pinkClr: {
      main: "#E4405F",
      contrastText: "#fff",
    },
    ytRed: {
      main: "#CD201F",
      contrastText: "#fff",
    },
    purpleClr: {
      main: "#7952B3",
      contrastText: "#fff",
    },
    textClr: {
      main: "#000000",
      light: "#425466",
    },
    textLightClr: {
      main: "#425466",
    },
    grey300: {
      main: "#E2E8F0",
      contrastText: "#718096",
    },
    grey200: {
      main: "#EDF2F7",
      contrastText: "#000",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 32,
          textTransform: "capitalize",
          padding: "0.6rem 1.3rem",
          boxShadow: "none",
          "&:disabled": {
            opacity: 0.6,
            cursor: "not-allowed",
            // PointerEvent: "init"
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,

      md: 600,
      mc: 800,
      lg: 900,
      xll: 1190,
      xl: 1200,
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <AllRoutes />
    </ThemeProvider>
  );
}

export default App;
