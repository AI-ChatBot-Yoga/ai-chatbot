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

type Props = {
  onChatActivation: () => void
}

const ChatWindow = ({ onChatActivation }: Props) => {
  const [message, setMessage] = useState<string>("")
  const [chatHistory, setChatHistory] = useState<Message[]>([
    {
      message: `Hello ☀️ Welcome to XXX Dry Cleaning service. Let us care for your clothes by choosing one of the following services 👇`,
      sender: "bot",
    },
    {
      message: `- Wash & Fold
- Dry Cleaning
- Stain Removal
- Special Care Fabric Cleaning
- Sewing & Alternations
- Others
Learn more about us 💛`,
      sender: "bot",
    },
  ])

  // Auto scroll to bottom when there is new message
  const viewport = useAutoScrollToBottom(chatHistory)

  const handleSendClick = () => {
    if (message.trim() !== "") {
      const newMessage = {
        message,
        sender: "user",
      }

      setChatHistory((chatHistory) => [...chatHistory, newMessage])
      setMessage("")
    }
  }

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

        <IconSend2 stroke={1.5} size={30} onClick={handleSendClick} />
      </div>
    </Paper>
  )
}

export default ChatWindow
