import { useState } from "react"
import ChatWindow from "../ChatWindow"
import ChatIcon from "../ChatIcon"
import { useChatHistory } from "@/hooks/useChatHistory"
import PopupMessage from "../PopupMessage"
import getBotIdFromScripTag from "@/utils/getBotIdFromScripTag"

const botId = getBotIdFromScripTag()

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isPopupVisible, setIsPopupVisible] = useState(true) // this useState ensure that the popup message will only show once. After ChatWindow is open, the popup message will not show again until user refresh the page.

  // Fetch config API when mount to get object of businessName, helperText, options,... and store in sessionStorage
  useChatHistory(botId)

  const businessName = sessionStorage.getItem("defaultMsg")
    ? JSON.parse(sessionStorage.getItem("defaultMsg")!).businessName
    : ""

  function handleChatActivation() {
    setIsOpen((is) => !is)
    setIsPopupVisible(false)
  }

  return (
    <>
      {isPopupVisible && <PopupMessage businessName={businessName} />}
      {isOpen && <ChatWindow onChatActivation={handleChatActivation} />}
      <ChatIcon onChatActivation={handleChatActivation} />
    </>
  )
}

export default ChatBot
