import { useState, useEffect } from "react"

export function useLocalStorage<T>(
  initialState: T,
  keyName: string
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const item = localStorage.getItem(keyName)
    return item ? JSON.parse(item) : initialState
  })

  useEffect(() => {
    localStorage.setItem(keyName, JSON.stringify(value))
  }, [value, keyName])

  return [value, setValue]
}
