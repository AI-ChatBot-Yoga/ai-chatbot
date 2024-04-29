import API from "./base"

export const ChatAPI = {
  send: (data: Dict) => {
    return API.post("/users", data)
  },
}
