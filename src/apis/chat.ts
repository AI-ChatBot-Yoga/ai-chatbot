import API from "./base"
import { Dict } from "@/types"

export const ChatAPI = {
  send: (data: Dict) => {
    return API.post(data)
  },
}
