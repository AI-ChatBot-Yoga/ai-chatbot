import { useState } from "react"
import { useChatHistory } from "./useChatHistory"
import { ChatAPI } from "@/apis/chat"

export const useChatHandler = (botId: string, CHAT_SESSION_ID: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  // custom hook to manage chat history
  const { chatHistory, addMessageToChatHistory, clearChatHistory } =
    useChatHistory()

  const sendMessageToServerAndDisplay = async (messageFrom: string) => {
    addMessageToChatHistory(messageFrom, "user")

    // Send the message to the server
    try {
      setIsLoading(true)
      const response = await ChatAPI.send({
        botId,
        chatSessionId: CHAT_SESSION_ID,
        command: messageFrom,
      })

      // Handle the response from the server and update chat history
      addMessageToChatHistory(response.output, "bot")
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
