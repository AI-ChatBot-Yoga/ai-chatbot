import styles from "./ChatIcon.module.css"
import { IconMessageChatbot } from "@tabler/icons-react"

type Props = {
  onChatActivation: () => void
}

const ChatIcon = ({ onChatActivation }: Props) => {
  return (
    <button onClick={onChatActivation} className={styles.chatIcon}>
      <IconMessageChatbot stroke={2} opacity={0.2} />
    </button>
  )
}

export default ChatIcon
