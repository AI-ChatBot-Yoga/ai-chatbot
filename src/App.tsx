import "./App.css"
import "@mantine/core/styles.css"
import { MantineProvider, createTheme } from "@mantine/core"
import { Button } from "@mantine/core"

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

function App() {
  return (
    <MantineProvider theme={theme}>
      <Button color="sky-blue">Ocean blue button</Button>
      <Button color="yellow">Bright pink button</Button>
    </MantineProvider>
  )
}

export default App
