import "./App.css"
import "@mantine/core/styles.css"
import ChatWindow from "./components/ChatWindow"
import ChatIcon from "./components/ChatIcon"
import { useState } from "react"

function App() {
  const [isOpen, setIsOpen] = useState(false)

  function handleChatActivation() {
    setIsOpen((is) => !is)
  }

  return (
    <>
      {isOpen && <ChatWindow />}
      <ChatIcon onChatActivation={handleChatActivation} />
    </>
  )
}

export default App
