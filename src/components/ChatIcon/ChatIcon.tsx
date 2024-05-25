import Icon from "../Icon"
import styles from "./ChatIcon.module.css"

type Props = {
  onChatActivation: () => void
}

const ChatIcon = ({ onChatActivation }: Props) => {
  return (
    <button onClick={onChatActivation} className={styles.chatIcon}>
      <Icon name="chat-icon" />
    </button>
  )
}

export default ChatIcon
