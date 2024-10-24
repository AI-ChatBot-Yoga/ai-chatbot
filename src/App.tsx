import "./App.css"
import "@mantine/core/styles.css"
import ChatBot from "./components/ChatBot"
import PopupMessage from "./components/PopupMessage"
import { useChatHistory } from "@/hooks/useChatHistory"

const scriptTag = document.currentScript as HTMLScriptElement
const botId = scriptTag?.getAttribute("botId") ?? import.meta.env.VITE_BOT_ID // If botId is not provided as attribute in script tag, use the botId from environment variables
if (!botId)
  throw new Error(
    "Bot ID is not provided, thus failing to call API, please contact the admin or add botId in script tag or .env file"
  )

function App() {
  // Fetch config API when mount to get object of businessName, helperText, options,... and store in sessionStorage
  useChatHistory(botId)

  // Get businessName from sessionStorage
  const businessName = sessionStorage.getItem("defaultMsg")
    ? JSON.parse(sessionStorage.getItem("defaultMsg")!).businessName
    : ""

  return (
    <>
      <PopupMessage businessName={businessName} />
      <ChatBot />
    </>
  )
}

export default App
