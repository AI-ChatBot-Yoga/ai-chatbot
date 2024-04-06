import { ChangeEvent, useState, KeyboardEvent } from "react"
import { Paper, TextInput, Button, Text, ScrollArea } from "@mantine/core"
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
        <ScrollArea style={{ height: 200 }} scrollbarSize={2}>
          {chatHistory.map((msg, index) => (
            <Text key={index} className={styles.msgBubble}>
              {msg}
            </Text>
          ))}
        </ScrollArea>
        <TextInput
          placeholder="Type your message"
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={handleSendClick} className={styles.sendMessageButton}>
          Send
        </Button>
      </Paper>
    </div>
  )
}

export default ChatWindow
