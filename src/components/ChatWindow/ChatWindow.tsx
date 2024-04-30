import styles from "./ChatWindow.module.css"
import { IconSend2 } from "@tabler/icons-react"
import {
  Box,
  Paper,
  TextInput,
  Text,
  ScrollArea,
  CloseButton,
} from "@mantine/core"
import { ChangeEvent, useState, KeyboardEvent } from "react"
import { useAutoScrollToBottom } from "../../utils/useAutoScrollToBottom.ts"
import { Message } from "../../types/message.ts"
import { DEFAULT_MSG } from "../../constant/message.ts"
import { useSessionStorage } from "../../utils/useSessionStorage.ts"
import { ChatAPI } from "@/apis/chat"

type Props = {
  onChatActivation: () => void
}

const ChatWindow = ({ onChatActivation }: Props) => {
  const [message, setMessage] = useState<string>("")

  // custom hook useSessionStorage is used to set initial value for previous chat, if there is no chat, it uses default DEFAULT_MSG as initial value. Then whenever there is new chatHistory, it is stored in sessionStorage
  const [chatHistory, setChatHistory] = useSessionStorage<Message[]>(
    DEFAULT_MSG,
    "chatHistory"
  )

  // Auto scroll to bottom when there is new message
  const viewport = useAutoScrollToBottom(chatHistory)

  // test:

  const handleSend = async () => {
    const newMessage = {
      message,
      sender: "user",
    }

    const payload = {
      botId: "1",
      sessionId: "1",
      question: newMessage.message,
    }

    ChatAPI.send(payload).then((response) => {
      console.log(response)
    })
  }

  // const handleSendClick = () => {
  //   if (message.trim() !== "") {
  //     const newMessage = {
  //       message,
  //       sender: "user",
  //     }

  //     setChatHistory((chatHistory) => [...chatHistory, newMessage])
  //     setMessage("")
  //   }
  // }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendClick()
    }
  }

  return (
    <Paper shadow="sm" withBorder className={styles.chatWindow}>
      <Box className={styles.chatWindowHeader}>
        <p>Conversation with AI Chatbot</p>

        <CloseButton
          aria-label="Close modal"
          iconSize={50}
          onClick={onChatActivation}
        />
      </Box>

      <ScrollArea className={styles.scrollArea} viewportRef={viewport}>
        {chatHistory.map((msg, index) => (
          <Text
            key={index}
            className={`${styles.msgBubble} ${msg.sender === "user" ? styles.rightSide : ""}`}
          >
            {msg.message}
          </Text>
        ))}
      </ScrollArea>

      <div className={styles.textInput}>
        <TextInput
          placeholder="Type your message"
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <IconSend2 stroke={1.5} size={30} onClick={handleSend} />
      </div>
    </Paper>
  )
}

export default ChatWindow
