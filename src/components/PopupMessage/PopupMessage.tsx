import { Alert } from "@mantine/core"
import styles from "./PopupMessage.module.css"

const PopupMessage = () => {
  return (
    <Alert
      classNames={{
        root: styles.popupMessageRoot,
        message: styles.popupMessageMessage,
      }}
    >
      Hello, welcome to Career Bliss Academy. Thank you for your interest. Happy
      to answer any question related to our service.
    </Alert>
  )
}

export default PopupMessage
