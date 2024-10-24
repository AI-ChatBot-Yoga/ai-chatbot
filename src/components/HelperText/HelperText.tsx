import { useEffect, useState } from "react"
import styles from "./HelperText.module.css"
import { Alert } from "@mantine/core"

const HelperText = () => {
  const [helperText, setHelperText] = useState("")

  useEffect(() => {
    const getHelperText = sessionStorage.getItem("defaultMsg")
      ? JSON.parse(sessionStorage.getItem("defaultMsg")!).helperText
      : ""

    setHelperText(getHelperText)
  }, [])

  if (!helperText) return

  return (
    <Alert
      classNames={{
        root: styles.helperTextRoot,
        message: styles.helperTextMessage,
      }}
    >
      {/* use dangerouslySetInnerHTML to render HTML content from sessionStorage (string) */}
      <span dangerouslySetInnerHTML={{ __html: helperText }} />
    </Alert>
  )
}

export default HelperText
