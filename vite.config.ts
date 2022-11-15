import { join } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import optimizer from 'vite-plugin-optimizer';
import { getThemeVariables } from 'antd/dist/theme';
import { cyan } from './config/theme';
import { libs } from './config/libs';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': join(__dirname, './src')
    },
    extensions: ['.json', '.js', '.mjs', '.ts', '.tsx']
  },
  server: {
    port: 4000,
    strictPort: false
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          ...getThemeVariables({ dark: false }),
          ...cyan
        }
      }
    }
  },
  plugins: [
    react(),
    optimizer(libs)
  ],
})
