import styles from "./ChatWindow.module.css"
import {
  Box,
  Paper,
  TextInput,
  Text,
  ScrollArea,
  CloseButton,
} from "@mantine/core"
import { IconSend2 } from "@tabler/icons-react"
import { ChangeEvent, useState, KeyboardEvent } from "react"

type Props = {
  onChatActivation: () => void
}

const ChatWindow = ({ onChatActivation }: Props) => {
  const [message, setMessage] = useState<string>("")
  const [chatHistory, setChatHistory] = useState<string[]>([])

  const handleSendClick = () => {
    if (message.trim() !== "") {
      setChatHistory([...chatHistory, message])
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

      <ScrollArea scrollbarSize={2} className={styles.scrollArea}>
        {chatHistory.map((msg, index) => (
          <Text key={index} className={styles.msgBubble} ta="right">
            {msg}
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
