const getBotIdFromScripTag = () => {
  const scriptTag = document.currentScript as HTMLScriptElement
  const botId = scriptTag?.getAttribute("botId") ?? import.meta.env.VITE_BOT_ID // If botId is not provided as attribute in script tag, use the botId from environment variables
  if (!botId)
    throw new Error(
      "Bot ID is not provided, thus failing to call API, please contact the admin or add botId in script tag or .env file"
    )
  return botId
}

export default getBotIdFromScripTag
