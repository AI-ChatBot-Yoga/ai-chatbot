import { useEffect, useRef } from "react"
import { Message } from "../types/message"

export const useAutoScrollToBottom = (dependency: Message[]) => {
  const viewport = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (viewport.current) {
      viewport.current.scrollTo({
        top: viewport.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [dependency])

  return viewport
}
