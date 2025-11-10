import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    base: "",
    build: { rollupOptions: { input: {
                main: resolve(__dirname, "index.html"),
                catalog: resolve(__dirname, "catalog.scss.html"),
                blog: resolve(__dirname, "blog.html"),
                about: resolve(__dirname, "about.html"),
            }}},
});
