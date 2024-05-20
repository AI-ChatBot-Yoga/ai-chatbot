import styles from "./ChatWindow.module.css"
import { useDisclosure } from "@mantine/hooks"
import { IconSend2, IconReload, IconX } from "@tabler/icons-react"
import { Box, Paper, TextInput, Text, ScrollArea } from "@mantine/core"
import { ChangeEvent, useState, KeyboardEvent } from "react"
import { useAutoScrollToBottom } from "../../utils/useAutoScrollToBottom.ts"
import { Message } from "../../types/message.ts"
import { DEFAULT_MSG } from "../../constant/message.ts"
import { useSessionStorage } from "../../utils/useSessionStorage.ts"
import ConfirmationModal from "../Confirmation Modal/ConfirmationModal.tsx"

type Props = {
  onChatActivation: () => void
}

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

  const handleSendClick = () => {
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
        <p>Conversation with AI Chatbot</p>

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
          placeholder="Type your message"
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={styles.textInput}
        />

        <IconSend2
          stroke={1.5}
          size={30}
          onClick={handleSendClick}
          className={styles.sendBtn}
        />
      </div>
    </Paper>
  )
}

export default ChatWindow
