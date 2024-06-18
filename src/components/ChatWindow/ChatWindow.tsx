import styles from "./ChatWindow.module.css"
import { useDisclosure } from "@mantine/hooks"
import { IconSend2, IconReload, IconX } from "@tabler/icons-react"
import {
  Box,
  Paper,
  TextInput,
  Text,
  ScrollArea,
  Loader,
  Alert,
  Button,
} from "@mantine/core"
import { ChangeEvent, useState, KeyboardEvent } from "react"
import { useAutoScrollToBottom } from "@/utils/useAutoScrollToBottom"
import ConfirmationModal from "@/components/ConfirmationModal"
import { useChatHandler } from "@/utils/useChatHandler"
import Configs from "@/configs"
import { ROLES } from "@/constant/roles"

type Props = {
  onChatActivation: () => void
}

const scriptTag = document.currentScript as HTMLScriptElement
const botId = scriptTag?.getAttribute("botId") || Configs.DEV_BOT_ID // TODO: remove fallback case when use in production
console.log("Script tag is:", scriptTag)
console.log("botId is: ", botId)

const ChatWindow = ({ onChatActivation }: Props) => {
  const [messageInput, setMessageInput] = useState<string>("")

  // this hook is used for Modal component (ConfirmationModal)
  const [openedModal, { open, close }] = useDisclosure(false)

  const {
    isLoading,
    isError,
    setIsError,
    chatHistory,
    clearChatHistory,
    sendMessageToServerAndDisplay,
  } = useChatHandler(botId, Configs.DEV_CHAT_SESSION_ID) // Hard code for now, make it dynamic later

  // Auto scroll to bottom when there is new message
  const viewport = useAutoScrollToBottom(chatHistory)

  const handleSendClick = () => {
    // prevent function from running when input is an empty or whitespace-only input
    if (!messageInput.trim()) return

    sendMessageToServerAndDisplay(messageInput)
    setMessageInput("")
  }

  const handleOptionClick = (optionValue: string) => {
    sendMessageToServerAndDisplay(optionValue)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessageInput(event.target.value)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendClick()
    }
  }

  const handleClearChat = () => {
    // prevent function from running when there is no chat
    if (!chatHistory.find((chat) => chat.sender === ROLES.User)) {
      close()
      return
    }

    setIsError(false)
    clearChatHistory()
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
        <h4>Laundry Services Chatbot</h4>

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
            component="div" // Change component to avoid nesting <p> tags error
            className={`${styles.msgBubble} ${
              msg.sender === ROLES.User ? styles.rightSide : ""
            }`}
          >
            {msg.message}
            {msg.options && (
              <Button.Group orientation="vertical">
                {msg.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="transparent"
                    className={styles.optionText}
                    onClick={() => handleOptionClick(option.value)}
                  >
                    {option.text}
                  </Button>
                ))}
              </Button.Group>
            )}
          </Text>
        ))}
        {isLoading && <Loader type="dots" className={styles.loader} />}
        {isError && (
          <Alert className={styles.alert}>
            Something went wrong. Please try again.
          </Alert>
        )}
      </ScrollArea>

      <div className={styles.textInputContainer}>
        <TextInput
          placeholder="Type a message..."
          value={messageInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={styles.textInput}
        />

        <IconSend2
          stroke={1.5}
          onClick={handleSendClick}
          className={styles.sendBtn}
        />
      </div>
    </Paper>
  )
}

export default ChatWindow
