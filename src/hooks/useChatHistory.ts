import { Message } from "@/types/message"
import { useSessionStorage } from "@/hooks/useSessionStorage"
import { useEffect, useState } from "react"
import { ChatAPI } from "@/apis/chat"
import { createDefaultMsg } from "@/constant/message"

const botId = "ba4a65b3-56be-4696-b351-c76d41fa1e79"

export const useChatHistory = () => {
  const [defaultMsg, setDefaultMsg] = useState<{
    businessName: string
    options: { text: string; value: string }[]
  }>({ businessName: "", options: [] })

  useEffect(() => {
    const fetchDefaultMsg = async () => {
      const response = await ChatAPI.getConfigs(botId)

      if (response.success) {
        setDefaultMsg({
          businessName: response.business_name,
          options: response.options.map(
            (option: { text: string; value: string }) => ({
              text: option.text,
              value: option.value,
            })
          ),
        })
      }
    }
    fetchDefaultMsg()
  }, [])

  // custom hook useSessionStorage is used to set initial value for previous chat, if there is no chat, it uses empty [] as initial value. Then whenever there is new chatHistory, it is stored in sessionStorage
  const [chatHistory, setChatHistory] = useSessionStorage<Message[]>(
    [],
    "chatHistory"
  )

  useEffect(() => {
    if (defaultMsg.businessName) {
      setChatHistory(
        createDefaultMsg(defaultMsg.businessName, defaultMsg.options)
      )
    }
  }, [defaultMsg, setChatHistory])

  const addMessageToChatHistory = (message: string, sender: string) => {
    const newMessage = {
      message,
      sender: sender,
    }

    setChatHistory((chatHistory) => [...chatHistory, newMessage])
  }

  const clearChatHistory = () =>
    setChatHistory(
      createDefaultMsg(defaultMsg.businessName, defaultMsg.options)
    )

  return { chatHistory, addMessageToChatHistory, clearChatHistory }
}
