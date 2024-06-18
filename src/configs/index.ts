const Configs = {
  CORE_API_BASE_URL: import.meta.env.VITE_CORE_API_BASE_URL as string,
  API_VERSION: import.meta.env.VITE_API_VERSION as string,
  X_API_KEY: import.meta.env.VITE_X_API_KEY as string,
  AUTHORIZATION_KEY: import.meta.env.VITE_AUTHORIZATION_KEY as string,
  DEV_CHAT_SESSION_ID: import.meta.env.VITE_DEV_CHAT_SESSION_ID as string,
  DEV_BOT_ID: import.meta.env.VITE_DEV_BOT_ID as string,
}

export default Configs
