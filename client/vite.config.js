import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/LMS/",
  plugins: [react()],
   // this must match your GitHub repo name
});
