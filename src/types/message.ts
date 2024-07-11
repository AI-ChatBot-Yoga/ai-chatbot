export type Message = {
  message: string
  sender: string
  options?: { text: string; value: string }[]
}
