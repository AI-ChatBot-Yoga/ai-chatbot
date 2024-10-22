import { useEffect, useState } from "react"
import styles from "./HelperText.module.css"
import { Alert } from "@mantine/core"

const HelperText = () => {
  const [helperText, setHelperText] = useState("")

  useEffect(() => {
    const storedValue = sessionStorage.getItem("defaultMsg")
    if (storedValue) {
      setHelperText(JSON.parse(storedValue).helperText)
    }
  }, [])

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
