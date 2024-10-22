import { Message } from "@/types/message"
import { useSessionStorage } from "@/hooks/useSessionStorage"
import { useEffect, useState } from "react"
import { ChatAPI } from "@/apis/chat"
import { createDefaultMsg } from "@/utils/createDefaultMsg"

export const useChatHistory = (botId: string) => {
  // State to hold the default message configuration
  const [defaultMsg, setDefaultMsg] = useState<{
    businessName: string
    options: { text: string; value: string }[]
  }>({ businessName: "", options: [] })

  // State to hold the chat history, persisted in session storage
  const [chatHistory, setChatHistory] = useSessionStorage<Message[]>(
    [],
    "chatHistory"
  )

  // Effect to fetch the default message configuration from session storage or API
  useEffect(() => {
    const storedMsg = sessionStorage.getItem("defaultMsg")

    if (storedMsg) {
      // If default message is found in session storage, parse and set it
      setDefaultMsg(JSON.parse(storedMsg))
    } else {
      // Fetch default message from API if not found in session storage
      const fetchDefaultMsg = async () => {
        const response = await ChatAPI.getConfigs(botId)

        if (response.success) {
          const newDefaultMsg = {
            businessName: response.business_name,
            helperText: response.helper_text,
            options: response.options.map(
              (option: { text: string; value: string }) => ({
                text: option.text,
                value: option.value,
              })
            ),
          }
          setDefaultMsg(newDefaultMsg)
          sessionStorage.setItem("defaultMsg", JSON.stringify(newDefaultMsg))
        }
      }
      fetchDefaultMsg()
    }
  }, [botId])

  // Effect to initialize chat history with default message if it's empty
  useEffect(() => {
    if (defaultMsg.businessName && chatHistory.length === 0) {
      setChatHistory(
        createDefaultMsg(defaultMsg.businessName, defaultMsg.options)
      )
    }
  }, [defaultMsg, setChatHistory, chatHistory.length]) // Runs when defaultMsg changes

  // Function to add a new message to the chat history
  const addMessageToChatHistory = (message: string, sender: string) => {
    const newMessage = {
      message,
      sender: sender,
    }

    setChatHistory((chatHistory) => [...chatHistory, newMessage])
  }

  // Function to clear chat history and reset to default message
  const clearChatHistory = () => {
    if (defaultMsg.businessName) {
      setChatHistory(
        createDefaultMsg(defaultMsg.businessName, defaultMsg.options)
      )
    }
  }

  return { chatHistory, addMessageToChatHistory, clearChatHistory }
}
