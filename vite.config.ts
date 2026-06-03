import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  base: '/',
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: {
    preset: "vercel",
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000
  }
});
