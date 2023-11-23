import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as pkg from "./package.json";
import { generateVersion, getShortMode } from "./src/version/version";

// get modeString from process.env.NODE_ENV if is not defined use dev and if is development use dev and if is production use prod
const mode = getShortMode(process.env.NODE_ENV || "development");
const appVersion = generateVersion(pkg.version, mode);

export default defineConfig({
    base: "./",
    plugins: [react()],
    build: {
        outDir: `./dist/${appVersion}`,
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            output: {
                manualChunks: id => {
                    if (id.includes("@fluentui/react-icons")) {
                        return "fluentui-icons";
                    } else if (id.includes("@fluentui/react")) {
                        return "fluentui-react";
                    } else if (id.includes("node_modules")) {
                        return "vendor";
                    }
                }
            }
        },
        target: "esnext"
    },
    server: {
        proxy: {
            "/content/": "http://localhost:50505",
            "/auth_setup": "http://localhost:50505",
            "/ask": "http://localhost:50505",
            "/chat": "http://localhost:50505"
        }
    },
    define: {
        // Define la versión como una variable global en el navegador
        // 'process.env': {},
        // 'window.process.env.APP_VERSION': JSON.stringify(appVersion),
        "import.meta.env.VITE_APP_VERSION": JSON.stringify(appVersion),
        "import.meta.env.VITE_MODE": JSON.stringify(mode)
    }
});
