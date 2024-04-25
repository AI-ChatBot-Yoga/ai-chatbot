import ChatWindow from "../ChatWindow"
import ChatIcon from "../ChatIcon"
import { useState } from "react"

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)

  function handleChatActivation() {
    setIsOpen((is) => !is)
  }

  return (
    <>
      {isOpen && <ChatWindow onChatActivation={handleChatActivation} />}
      <ChatIcon onChatActivation={handleChatActivation} />
    </>
  )
}

export default ChatBot
