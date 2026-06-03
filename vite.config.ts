import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  base: '/',
  tanstackStart: {
    server: { entry: "server" },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});
