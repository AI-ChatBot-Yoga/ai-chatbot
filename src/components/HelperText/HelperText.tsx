import styles from "./HelperText.module.css"
import { Alert } from "@mantine/core"

const HelperText = () => {
  const helperText = sessionStorage.getItem("defaultMsg")
    ? JSON.parse(sessionStorage.getItem("defaultMsg")!).helperText
    : ""

  if (!helperText) return

  return (
    <Alert
      classNames={{
        root: styles.helperTextRoot,
        message: styles.helperTextMessage,
      }}
    >
      <span dangerouslySetInnerHTML={{ __html: helperText }} />
    </Alert>
  )
}

export default HelperText
