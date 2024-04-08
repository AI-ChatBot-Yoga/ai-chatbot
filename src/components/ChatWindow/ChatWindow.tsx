import { ChangeEvent, useState, KeyboardEvent } from "react"
import { Box, Paper, TextInput, Button, Text, ScrollArea } from "@mantine/core"
import styles from "./ChatWindow.module.css"

const ChatWindow = () => {
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
    <div className="chatWindow">
      <Paper shadow="sm" withBorder className={styles.chatWindow}>
        <Box className={styles.chatWindowHeader}>
          Conversation with AI Chatbot
        </Box>
        <ScrollArea style={{ height: 350 }} scrollbarSize={2}>
          {chatHistory.map((msg, index) => (
            <Text key={index} className={styles.msgBubble} ta="right">
              {msg}
            </Text>
          ))}
        </ScrollArea>
        <div className={styles.flexContainer}>
          <TextInput
            placeholder="Type your message"
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={styles.textInput}
          />

          <Button
            onClick={handleSendClick}
            className={styles.sendMessageButton}
          >
            Send
          </Button>
        </div>
      </Paper>
    </div>
  )
}

export default ChatWindow
