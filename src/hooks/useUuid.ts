import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"

const useUuid = () => {
  const [uuid, setUuid] = useState("")

  useEffect(() => {
    const storedUuid = sessionStorage.getItem("myUuid")
    if (storedUuid) {
      setUuid(storedUuid)
    } else {
      const initialUuid = uuidv4()
      setUuid(initialUuid)
      sessionStorage.setItem("myUuid", initialUuid) // Save initial UUID to sessionStorage
    }
  }, [])

  const generateUuid = () => {
    const newUuid = uuidv4()
    setUuid(newUuid)
    sessionStorage.setItem("myUuid", newUuid) // Save new UUID to sessionStorage
  }

  const clearUuid = () => {
    sessionStorage.removeItem("myUuid")
    setUuid("")
  }

  return { uuid, generateUuid, clearUuid }
}

export default useUuid
