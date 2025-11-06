import federation from '@originjs/vite-plugin-federation'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'

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
      })
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
      cssCodeSplit: false
    }
  }
})
