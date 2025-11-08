import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import basicSsl from "@vitejs/plugin-basic-ssl";
import viteTsConfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      includeAssets: ["favicon.ico", "512x512.png", "192x192.png"],
      manifest: {
        name: "Terminal",
        short_name: "Terminal",
        description: "Manage processes and recipes",
        start_url: "/",
        background_color: "#ffffff",
        display: "fullscreen",
        icons: [
          {
            src: "192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
    basicSsl({
      name: "test",
      domains: ["localhost"],
      certDir: "../cert",
    }),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
  ],
});
