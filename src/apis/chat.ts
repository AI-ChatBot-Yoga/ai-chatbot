import API from "./base"
import { Dict } from "@/types"

export const ChatAPI = {
  send: (payload: Dict) => {
    return API.post("/completions", payload)
  },

  getConfigs: (botId: string) => {
    return API.get(`/configs/${botId}`)
  },
}
