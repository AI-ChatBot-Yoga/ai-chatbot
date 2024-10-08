import API from "./base"
import { Dict } from "@/types"

export const ChatAPI = {
  send: (payload: Dict) => {
    return API.post("/completions", payload)
  },
  getConfigs: (botId: string) => {
    const params = new URLSearchParams({ botId })

    return API.get(`/configs?${params.toString()}`)
  },
}
