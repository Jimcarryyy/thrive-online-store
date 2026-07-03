import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return;
          }

          if (
            id.includes("react") ||
            id.includes("scheduler") ||
            id.includes("@tanstack/react-query") ||
            id.includes("react-router")
          ) {
            return "react-vendor";
          }

          if (
            id.includes("@radix-ui") ||
            id.includes("lucide-react") ||
            id.includes("framer-motion") ||
            id.includes("sonner") ||
            id.includes("embla-carousel-react") ||
            id.includes("vaul") ||
            id.includes("cmdk")
          ) {
            return "ui-vendor";
          }

          if (
            id.includes("react-hook-form") ||
            id.includes("@hookform") ||
            id.includes("zod")
          ) {
            return "form-vendor";
          }

          if (
            id.includes("recharts") ||
            id.includes("react-day-picker") ||
            id.includes("date-fns")
          ) {
            return "data-vendor";
          }

          return "vendor";
        },
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
