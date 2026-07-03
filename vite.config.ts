import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

/** Ensures the Vite build process exits cleanly on CI/Vercel. */
function forceExitAfterBuild(): Plugin {
  return {
    name: "force-exit-after-build",
    apply: "build",
    closeBundle() {
      setImmediate(() => process.exit(0));
    },
  };
}

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    reportCompressedSize: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
  plugins: [react(), forceExitAfterBuild()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
