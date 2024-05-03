import styles from "./ChatIcon.module.css"
import ConversationIcon from "../../assets/ConversationIcon.tsx"

type Props = {
  onChatActivation: () => void
}

const ChatIcon = ({ onChatActivation }: Props) => {
  return (
    <button onClick={onChatActivation} className={styles.chatIcon}>
      <ConversationIcon />
    </button>
  )
}

export default ChatIcon
