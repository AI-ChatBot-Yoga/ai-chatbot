import "./App.css"
import "@mantine/core/styles.css"
import {
  MantineProvider,
  createTheme,
  Button,
  TextInput,
  Modal,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"

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
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <MantineProvider theme={theme}>
      <p>UI Components:</p>
      <ol>
        <li>
          {" "}
          Button using color from theme object <br />
          <Button color="sky-blue">This will appear on any screen size</Button>
        </li>
        <br />
        <li>
          Button with responsive design
          <Button
            color={theme.colors.yellow[9]}
            fullWidth
            className="breakpoints"
          >
            This will turn to red if screen size is below 576px
          </Button>
        </li>
        <br />
        <li>
          InputText <br />
          <TextInput size="sm" radius="xl" placeholder="Type your chat here" />
        </li>
        <br />
        <li>
          {" "}
          Modal <br />
          <div>
            <Modal opened={opened} onClose={close} title="Authentication">
              {/* Modal content */}
            </Modal>
            <Button onClick={open}>Open modal</Button>
          </div>
        </li>
      </ol>
    </MantineProvider>
  )
}

export default App
