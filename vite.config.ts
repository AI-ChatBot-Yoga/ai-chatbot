import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import svgr from "vite-plugin-svgr"
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js"

export default defineConfig({
  // cssInjectedByJsPlugin helps to combine CSS to only 1 JS file when bundling
  plugins: [react(), svgr(), cssInjectedByJsPlugin()],
  server: {
    port: 3000,
  },
  base: "/ai-chatbot/", // For deploying to Github Pages
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  /*
  From Vu:
  - without 'define', customer's site will have 'undefined process' error because 'process' belong to backend
  - define: Replaces occurrences of process.env.NODE_ENV with the actual environment value. This is necessary because process is not defined in the browser environment by default.
  - rollupOptions: Normally we include react and react-dom to optimize bundle size because some websites already have react. But in case some websites don't use react, we include react libraries when bundling although it may increase size 
  */
  define: {
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "development"
    ),
  },
  build: {
    lib: {
      // Configures the build to create a library
      entry: "src/main.tsx", // Specifies the entry file for the library.
      name: "ChatWidget", // The global variable name for the library.
      fileName: "chat-widget", //The output file name for the library.
      formats: ["iife"], // Output format is an Immediately Invoked Function Expression (IIFE), which is suitable for embedding in a script tag.
    },
    rollupOptions: {
      // This ensure that React and ReactDOM are bundled with the widget
      external: [],
      output: {},
    },
  },
})
