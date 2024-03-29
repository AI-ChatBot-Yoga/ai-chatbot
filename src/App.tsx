import "./App.css"
import "@mantine/core/styles.css"
import { useMantineTheme, Button, TextInput, Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"

function App() {
  const theme = useMantineTheme()

  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
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
    </>
  )
}

export default App
