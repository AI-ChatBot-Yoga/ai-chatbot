import styles from "./ChatWindow.module.css"
import { useDisclosure } from "@mantine/hooks"
import { IconSend2, IconReload, IconX } from "@tabler/icons-react"
import { Box, Paper, TextInput, Text, ScrollArea } from "@mantine/core"
import { ChangeEvent, useState, KeyboardEvent } from "react"
import { useAutoScrollToBottom } from "@/utils/useAutoScrollToBottom"
import { Message } from "@/types/message"
import { DEFAULT_MSG } from "@/constant/message"
import { useSessionStorage } from "@/utils/useSessionStorage"
import ConfirmationModal from "@/components/ConfirmationModal"
import { ChatAPI } from "@/apis/chat"

type Props = {
  onChatActivation: () => void
}

const BOT_ID = "71c0c33f-5952-43b1-8608-70bfe362f537" // Hard code for now, make it dynamic later
const CHAT_SESSION_ID = "71c0c33f-5952-43b1-8608-70bfe362f537" // Hard code for now, make it dynamic later

const ChatWindow = ({ onChatActivation }: Props) => {
  const [message, setMessage] = useState<string>("")

  // this hook is used for Modal component (ConfirmationModal)
  const [openedModal, { open, close }] = useDisclosure(false)

  // custom hook useSessionStorage is used to set initial value for previous chat, if there is no chat, it uses default DEFAULT_MSG as initial value. Then whenever there is new chatHistory, it is stored in sessionStorage
  const [chatHistory, setChatHistory] = useSessionStorage<Message[]>(
    DEFAULT_MSG,
    "chatHistory"
  )

  // Auto scroll to bottom when there is new message
  const viewport = useAutoScrollToBottom(chatHistory)

  const handleSendClick = async () => {
    // prevent function from running when there is no chat
    if (!message) return

    if (message.trim() !== "") {
      const newMessage = {
        message,
        sender: "user",
      }

      setChatHistory((chatHistory) => [...chatHistory, newMessage])
      setMessage("")
    }

    // Send the message to the server
    try {
      const response = await ChatAPI.send({
        botId: BOT_ID,
        chatSessionId: CHAT_SESSION_ID,
        command: message,
      })

      // TODO: Vu - Please handle the response answer from the LLM and return it to the UI
      console.log("response", response)
    } catch (error) {
      console.error("Error sending message:", error)
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

  const handleClearChat = () => {
    // prevent function from running when there is no chat
    if (!chatHistory.find((chat) => chat.sender === "user")) {
      close()
      return
    }

    setChatHistory(DEFAULT_MSG)
    close()
  }

  return (
    <Paper shadow="sm" withBorder className={styles.chatWindow}>
      <ConfirmationModal
        openedModal={openedModal}
        close={close}
        onClearChat={handleClearChat}
        modalMessage="Do you want to clear the previous chat?"
      />

      <Box className={styles.chatWindowHeader}>
        <h4>Conversation with AI Chatbot</h4>

        <div className={styles.buttons}>
          <IconReload
            aria-label="Reload button"
            onClick={open}
            className={styles.reloadBtn}
          />
          <IconX
            aria-label="Close button"
            onClick={onChatActivation}
            className={styles.closeBtn}
          />
        </div>
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

      <div className={styles.textInputContainer}>
        <TextInput
          placeholder="Type a message..."
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={styles.textInput}
        />

        <IconSend2
          stroke={1.5}
          size={35}
          onClick={handleSendClick}
          className={styles.sendBtn}
        />
      </div>
    </Paper>
  )
}

export default ChatWindow
