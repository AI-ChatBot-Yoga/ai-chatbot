import ChatWindow from "../ChatWindow"
import ChatIcon from "../ChatIcon"
import { useState } from "react"

const ChatBot = ({
  setIsPopupVisible,
}: {
  setIsPopupVisible: (is: boolean) => void
}) => {
  const [isOpen, setIsOpen] = useState(false)

  function handleChatActivation() {
    setIsOpen((is) => !is)
    setIsPopupVisible(false)
  }

  return (
    <>
      {isOpen && <ChatWindow onChatActivation={handleChatActivation} />}
      <ChatIcon onChatActivation={handleChatActivation} />
    </>
  )
}

export default ChatBot
