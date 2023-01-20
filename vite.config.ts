import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      {
        find: '@Component',
        replacement: path.resolve(__dirname, './src/components'),
      },
      {
        find: '@Locale',
        replacement: path.resolve(__dirname, './src/locales'),
      },
      {
        find: '@Middleware',
        replacement: path.resolve(__dirname, './src/middlewares'),
      },
      {
        find: '@Mutation',
        replacement: path.resolve(__dirname, './src/mutations'),
      },
      { find: '@Page', replacement: path.resolve(__dirname, './src/pages') },
      { find: '@Query', replacement: path.resolve(__dirname, './src/queries') },
      { find: '@Style', replacement: path.resolve(__dirname, './src/styles') },
      { find: '@Type', replacement: path.resolve(__dirname, './src/types') },
    ],
  },
  plugins: [
    react(),
    checker({
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"', // for example, lint .ts & .tsx
      },
      typescript: true,
    }),
    federation({
      name: 'parzival-stack',
      filename: 'remoteEntry.js',
      // Choose between one of the two
      // Modules to expose
      exposes: {
        // './Button': './src/Button.tsx'
      },
      // Remote to imports
      remotes: {
        // home: 'https://parzival-stack.localtest.me/assets/remoteEntry.js'
      },
    }),
  ],
})
