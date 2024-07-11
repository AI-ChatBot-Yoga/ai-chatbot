import * as React from "react"
import * as ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import {
  MantineProvider,
  createTheme,
  CSSVariablesResolver,
  rem,
} from "@mantine/core"

/* 
theme.colors object is required to have 10 shades. So I use Mantine's CSS variables resolver. It must be used with resolver function, which requires 3 keys (variables, light, dark)
*/
const theme = createTheme({
  /** Your theme override here */
  fontFamily: "Intel, sans-serif",
  fontSizes: { md: rem(15) },
  headings: {
    fontFamily: "Intel, sans-serif",
    sizes: {
      h4: {
        fontWeight: "400",
        fontSize: rem(20),
      },
    },
  },
  other: {
    blueVivid: "rgba(7, 151, 255, 1)",
    blueLight: " rgba(102, 191, 255, 0.51)",
    blueMedium: "rgba(102, 191, 255, 0.83)",
    blueSoft: " rgba(211, 236, 255, 1)",
    blueActive: "rgba(75, 180, 255, 1)",
    yellowSoft: "rgba(255, 245, 203, 1)",
    yellowVivid: "rgba(246, 218, 94, 1)",
    lightGray: "rgba(225, 233, 239, 1)",
    darkGray: "rgba(189, 200, 207, 1)",
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
    "--mantine-light-gray": theme.other.lightGray,
    "--mantine-dark-gray": theme.other.darkGray,
  },
  light: {},
  dark: {},
})

/* From Vu:
- Customer's HTML site might not have #root like usual React project so I create 'div' as a container for project. 
- The DOMContentLoaded event listener ensures that your script only runs after the HTML document has been fully loaded and parsed. It Appends div element with the ID chat-widget-container to body of document
*/
document.addEventListener("DOMContentLoaded", () => {
  const widgetDiv = document.createElement("div")
  widgetDiv.id = "chat-widget-container"
  document.body.appendChild(widgetDiv)

  ReactDOM.createRoot(widgetDiv).render(
    <React.StrictMode>
      <MantineProvider theme={theme} cssVariablesResolver={resolver}>
        <App />
      </MantineProvider>
    </React.StrictMode>
  )
})
