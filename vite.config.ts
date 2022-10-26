import { join } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import optimizer from 'vite-plugin-optimizer';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': join(__dirname, './src')
    },
    extensions: ['.json', '.js', '.mjs', '.ts', '.tsx']
  },
  server: {
    port: 4000
  },
  plugins: [
    react(),
    optimizer({
      'fs': 'const fs=require("fs");export default fs;',
      'path': 'const path=require("path");export default path;',
      'electron': `const electron=require('electron');export default electron;`
    })
  ],
})
