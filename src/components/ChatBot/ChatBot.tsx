import ChatWindow from "../ChatWindow"
import ChatIcon from "../ChatIcon"
import { useState } from "react"
import { useChatHistory } from "@/hooks/useChatHistory"
import PopupMessage from "../PopupMessage"
import getBotIdFromScripTag from "@/utils/getBotIdFromScripTag"

const botId = getBotIdFromScripTag()

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isPopupVisible, setIsPopupVisible] = useState(true)

  function handleChatActivation() {
    setIsOpen((is) => !is)
    setIsPopupVisible(false)
  }

  // Fetch config API when mount to get object of businessName, helperText, options,... and store in sessionStorage
  useChatHistory(botId)

  // Get businessName from sessionStorage
  const businessName = sessionStorage.getItem("defaultMsg")
    ? JSON.parse(sessionStorage.getItem("defaultMsg")!).businessName
    : ""

  return (
    <>
      {isPopupVisible && <PopupMessage businessName={businessName} />}
      {isOpen && <ChatWindow onChatActivation={handleChatActivation} />}
      <ChatIcon onChatActivation={handleChatActivation} />
    </>
  )
}

export default ChatBot
