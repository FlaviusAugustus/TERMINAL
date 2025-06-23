import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";
import viteTsConfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
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
