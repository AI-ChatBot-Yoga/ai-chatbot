import { Message } from "@/types/message"
import { DEFAULT_MSG } from "@/constant/message"
import { useSessionStorage } from "@/hooks/useSessionStorage"

export const useChatHistory = () => {
  // custom hook useSessionStorage is used to set initial value for previous chat, if there is no chat, it uses default DEFAULT_MSG as initial value. Then whenever there is new chatHistory, it is stored in sessionStorage
  const [chatHistory, setChatHistory] = useSessionStorage<Message[]>(
    DEFAULT_MSG,
    "chatHistory"
  )

  const addMessageToChatHistory = (message: string, sender: string) => {
    const newMessage = {
      message,
      sender: sender,
    }

    setChatHistory((chatHistory) => [...chatHistory, newMessage])
  }

  const clearChatHistory = () => setChatHistory(DEFAULT_MSG)

  return { chatHistory, addMessageToChatHistory, clearChatHistory }
}
