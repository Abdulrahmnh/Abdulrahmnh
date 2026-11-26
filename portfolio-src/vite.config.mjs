import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
export default defineConfig({
 build:{outDir:fileURLToPath(new URL('../portfolio/',import.meta.url)),emptyOutDir:false,rollupOptions:{input:{app:fileURLToPath(new URL('./entry.tsx',import.meta.url))},output:{entryFileNames:'app.js'}}}
});
