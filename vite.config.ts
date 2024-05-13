import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 3000,
  },
  base: "/ai-chatbot/", // For deploying to Github Pages
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Ensuring it points to the src directory
    },
  },
})
