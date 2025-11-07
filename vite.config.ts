import { defineConfig } from "vitest/config";
import react from '@vitejs/plugin-react-swc'
import federation from '@originjs/vite-plugin-federation'
import path from 'path'
import dts from "vite-plugin-dts";

import packageJson from './package.json'

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      federation({
        name: 'remote-characters',
        filename: 'remoteEntry.js',
        exposes: {
          './mf-characters': './src/App.tsx'
        },
        shared: packageJson.dependencies
      }),
      dts({ include: ["src"] })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        react: path.resolve('./node_modules/react'),
        'react-dom': path.resolve('./node_modules/react-dom'),
      }
    },
    build: {
      modulePreload: false,
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
      rollupOptions: {
        external: [
          "react",
          "react-dom",
          "@mui/material",
          "@emotion/react",
          "@emotion/styled",
        ],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.ts",
      pool: "forks",
      include: ["src/**/*.test.{ts,tsx}"],
      isolate: false,
      deps: {
        interopDefault: true, // permite importar CJS como default
        inline: [/rick-morty-card/], // fuerza a Vitest a transformar ese paquete
      },
    },
  }
})
