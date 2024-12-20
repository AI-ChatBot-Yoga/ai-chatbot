import styles from "./ChatWindow.module.css"
import { useDisclosure } from "@mantine/hooks"
import { IconReload, IconMinus } from "@tabler/icons-react"
import {
  Box,
  Paper,
  TextInput,
  Text,
  ScrollArea,
  Loader,
  Alert,
  Button,
  Title,
} from "@mantine/core"
import { ChangeEvent, useState, KeyboardEvent, useCallback } from "react"
import { useAutoScrollToBottom } from "@/hooks/useAutoScrollToBottom"
import ConfirmationModal from "@/components/ConfirmationModal"
import { useChatHandler } from "@/hooks/useChatHandler"
import { ROLES } from "@/constant/roles"
import useUuid from "@/hooks/useUuid"
import SendBtn from "../SendBtn"
import HelperText from "../HelperText"
import getBotIdFromScripTag from "@/utils/getBotIdFromScripTag"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
const botId = getBotIdFromScripTag()

type Props = {
  onChatActivation: () => void
}

const ChatWindow = ({ onChatActivation }: Props) => {
  const [messageInput, setMessageInput] = useState<string>("")
  const { uuid, generateUuid, clearUuid } = useUuid()
  const chatSessionId = uuid

  // Hook for Modal component (ConfirmationModal)
  const [openedModal, { open, close }] = useDisclosure(false)

  // Hook for handling chat messages
  const {
    isLoading,
    isError,
    setIsError,
    chatHistory,
    clearChatHistory,
    sendMessageToServerAndDisplay,
  } = useChatHandler(botId, chatSessionId)

  // Auto scroll to bottom when there is new message
  const viewport = useAutoScrollToBottom(chatHistory)

  // Memoized event handlers
  const handleSendClick = useCallback(() => {
    if (!messageInput.trim()) return
    sendMessageToServerAndDisplay(messageInput)
    setMessageInput("")
  }, [messageInput, sendMessageToServerAndDisplay])

  const handleOptionClick = useCallback(
    (optionValue: string) => {
      if (isLoading) return

      sendMessageToServerAndDisplay(optionValue)
    },
    [isLoading, sendMessageToServerAndDisplay]
  )

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setMessageInput(event.target.value)
    },
    []
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handleSendClick()
      }
    },
    [handleSendClick]
  )

  const handleClearChat = useCallback(() => {
    if (!chatHistory.find((chat) => chat.sender === ROLES.User)) {
      close()
      return
    }

    setIsError(false)
    clearChatHistory()
    close()
    clearUuid()
    generateUuid()
  }, [
    chatHistory,
    clearChatHistory,
    close,
    setIsError,
    clearUuid,
    generateUuid,
  ])

  // Get botName from sessionStorage
  const botName = (() => {
    const storedData = sessionStorage.getItem("defaultMsg")
    const parsedData = storedData ? JSON.parse(storedData) : null
    return parsedData?.botName || "AI Assistant" // Fallback to "AI Assistant" if botName is undefined
  })()

  return (
    <Paper shadow="sm" withBorder className={styles.chatWindow}>
      <ConfirmationModal
        openedModal={openedModal}
        close={close}
        onClearChat={handleClearChat}
        modalMessage="Do you want to restart the chat?"
      />

      <Box className={styles.chatWindowHeader}>
        <Title order={4}>{botName}</Title>
        <div className={styles.buttons}>
          <IconReload
            aria-label="Reload button"
            onClick={open}
            className={styles.reloadBtn}
          />
          <IconMinus
            aria-label="Close button"
            onClick={onChatActivation}
            className={styles.closeBtn}
          />
        </div>
      </Box>

      <ScrollArea className={styles.scrollArea} viewportRef={viewport}>
        <HelperText />

        {chatHistory.length === 0 ? (
          <Loader type="dots" className={styles.loader} />
        ) : (
          chatHistory.map((msg, index) => (
            <div key={index}>
              {msg.message && (
                <Text
                  component="div"
                  className={`${styles.msgBubble} ${msg.sender === ROLES.User ? styles.rightSide : ""}`}
                >
                  {/* Use Markdown to format markdown to link. Plugin rehypeRaw to format html tag */}
                  <Markdown rehypePlugins={[rehypeRaw]}>{msg.message}</Markdown>
                </Text>
              )}
              {msg.options && (
                <Button.Group className={styles.optionsContainer}>
                  {msg.options.map((option, idx) => (
                    <Button
                      key={idx}
                      disabled={isLoading}
                      variant="transparent"
                      className={`${styles.optionText} ${isLoading && styles.disabledOptions}`}
                      onClick={() => handleOptionClick(option.value)}
                    >
                      {option.text}
                    </Button>
                  ))}
                </Button.Group>
              )}
            </div>
          ))
        )}
        {isLoading && <Loader type="dots" className={styles.loader} />}
        {isError && (
          <Alert className={styles.alert}>
            Something went wrong. Please try again.
          </Alert>
        )}
      </ScrollArea>

      <div
        className={`${styles.textInputContainer} ${isLoading && styles.disabled}`}
      >
        <TextInput
          disabled={isLoading}
          placeholder="Type a message..."
          value={messageInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          classNames={{ root: styles.textInputRoot, input: styles.textInput }}
        />
        <SendBtn handleSendClick={handleSendClick} isLoading={isLoading} />
      </div>
    </Paper>
  )
}

export default ChatWindow
