import { useState } from "react"
import { useChatHistory } from "./useChatHistory"
import { ChatAPI } from "@/apis/chat"
import { ROLES } from "@/constant/roles"

export const useChatHandler = (botId: string, CHAT_SESSION_ID: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  // Vu: Custom hook to manage chat history.
  /* 
Vu: in the old commit, I use useChatHistory directly in ChatWindow.
- In ChatWindow, it needs chatHistory and clearChatHistory from useChatHistory
- In this useChatHandler, it needs addMessageToChatHistory from useChatHistory
- If I declare both useChatHistory in both ChatWindow and useChatHandler, it will create 2 separated instances in both places. Resulting an error: when user chat, it doesn't show in UI although the server responded and have new data in Session Storage.
- That's why we include useChatHistory inside this hook, and return all useChatHistory's values so that they can be used in ChatWindow.
  */
  const { chatHistory, addMessageToChatHistory, clearChatHistory } =
    useChatHistory(botId)

  // Vu: This function display new message (from message input and clickable options) to UI, also send data to server and display answer in UI
  const sendMessageToServerAndDisplay = async (messageFrom: string) => {
    setIsError(false)
    addMessageToChatHistory(messageFrom, "user")

    // Send the message to the server
    try {
      setIsLoading(true)
      const response = await ChatAPI.send({
        botId,
        chatSessionId: CHAT_SESSION_ID,
        command: messageFrom,
      })

      // Handle edge cases such as when frontend doesn't provide enough data to server
      if (!response.output) throw Error

      // Handle the response from the server and update chat history
      addMessageToChatHistory(response.output, ROLES.Bot)
    } catch (error: unknown) {
      console.error("Error sending message:", error)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    isError,
    setIsError,
    chatHistory,
    clearChatHistory,
    sendMessageToServerAndDisplay,
  }
}
