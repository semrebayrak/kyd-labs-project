import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/components": path.resolve(__dirname, "src/components"),
      "@/routes": path.resolve(__dirname, "src/routes"),
      "@/utils": path.resolve(__dirname, "src/utils"),
      "@/assets": path.resolve(__dirname, "src/assets"),
      "@/services": path.resolve(__dirname, "src/services"),
      "@/ui": path.resolve(__dirname, "src/ui"),
    },
  },
});
