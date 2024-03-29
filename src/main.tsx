import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { MantineProvider, createTheme } from "@mantine/core"

const theme = createTheme({
  /** Your theme override here */
  fontFamily: "Open Sans, sans-serif",
  colors: {
    "sky-blue": [
      "#e1f9ff",
      "#ccedff",
      "#9ad7ff",
      "#64c1ff",
      "#3baefe",
      "#20a2fe",
      "#099cff",
      "#0088e4",
      "#0078cd",
      "#0069b6",
    ],
    yellow: [
      "#fdfce5",
      "#f8f6d3",
      "#f0ecaa",
      "#e7e17c",
      "#e0d957",
      "#dbd33e",
      "#d9d02f",
      "#c0b820",
      "#aaa316",
      "#938c03",
    ],
  },
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </React.StrictMode>
)
