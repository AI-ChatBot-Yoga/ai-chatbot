import ChatWindow from "../ChatWindow"
import ChatIcon from "../ChatIcon"
import { useState } from "react"

function ChatBot() {
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

export default ChatBot
