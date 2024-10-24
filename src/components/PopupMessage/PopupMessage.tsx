import { Alert } from "@mantine/core"
import styles from "./PopupMessage.module.css"

const PopupMessage = ({ businessName }: { businessName: string }) => {
  if (!businessName) return

  return (
    <Alert
      classNames={{
        root: styles.popupMessageRoot,
        message: styles.popupMessageMessage,
      }}
    >
      Hello, welcome to {businessName}. Thank you for your interest. Happy to
      answer any question related to our service.
    </Alert>
  )
}

export default PopupMessage
