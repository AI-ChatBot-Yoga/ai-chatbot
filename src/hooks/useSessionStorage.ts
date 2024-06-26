import { useState, useEffect } from "react"

export function useSessionStorage<T>(
  initialState: T,
  keyName: string
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const item = sessionStorage.getItem(keyName)
    return item ? JSON.parse(item) : initialState
  })

  useEffect(() => {
    sessionStorage.setItem(keyName, JSON.stringify(value))
  }, [value, keyName])

  return [value, setValue]
}
