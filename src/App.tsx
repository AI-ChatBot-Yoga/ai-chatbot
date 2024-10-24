import "./App.css"
import "@mantine/core/styles.css"
import ChatBot from "./components/ChatBot"
import PopupMessage from "./components/PopupMessage"

function App() {
  return (
    <>
      <PopupMessage />
      <ChatBot />
    </>
  )
}

export default App
