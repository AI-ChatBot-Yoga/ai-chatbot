import "./App.css"
import "@mantine/core/styles.css"
import ChatBot from "./components/ChatBot"
import PopupMessage from "./components/PopupMessage"
import { useChatHistory } from "@/hooks/useChatHistory"
import getBotIdFromScripTag from "@/utils/getBotIdFromScripTag"
import { useState } from "react"

const botId = getBotIdFromScripTag()

function App() {
  const [isPopupVisible, setIsPopupVisible] = useState(true)

  // Fetch config API when mount to get object of businessName, helperText, options,... and store in sessionStorage
  useChatHistory(botId)

  // Get businessName from sessionStorage
  const businessName = sessionStorage.getItem("defaultMsg")
    ? JSON.parse(sessionStorage.getItem("defaultMsg")!).businessName
    : ""

  return (
    <>
      {isPopupVisible && <PopupMessage businessName={businessName} />}
      <ChatBot setIsPopupVisible={setIsPopupVisible} />
    </>
  )
}

export default App
