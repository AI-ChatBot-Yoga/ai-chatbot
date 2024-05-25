import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import {
  MantineProvider,
  createTheme,
  CSSVariablesResolver,
} from "@mantine/core"

/* 
theme.colors object is required to have 10 shades. So I use Mantine's CSS variables resolver. It must be used with resolver function, which requires 3 keys (variables, light, dark)
*/
const theme = createTheme({
  /** Your theme override here */
  fontFamily: "Open Sans, sans-serif",
  other: {
    blueVivid: "rgba(7, 151, 255, 1)",
    blueLight: " rgba(102, 191, 255, 0.51)",
    blueMedium: "rgba(102, 191, 255, 0.83)",
    blueSoft: " rgba(182, 224, 255, 1)",
    blueActive: "rgba(75, 180, 255, 1)",
    yellowSoft: "rgba(246, 218, 94, 0.51)",
    yellowVivid: "rgba(246, 218, 94, 1)",
  },
})

const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    "--mantine-blue-vivid": theme.other.blueVivid,
    "--mantine-blue-light": theme.other.blueLight,
    "--mantine-blue-medium": theme.other.blueMedium,
    "--mantine-blue-soft": theme.other.blueSoft,
    "--mantine-blue-active": theme.other.blueActive,
    "--mantine-yellow-soft": theme.other.yellowSoft,
    "--mantine-yellow-vivid": theme.other.yellowVivid,
  },
  light: {},
  dark: {},
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme} cssVariablesResolver={resolver}>
      <App />
    </MantineProvider>
  </React.StrictMode>
)
