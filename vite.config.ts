import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import svgr from 'vite-plugin-svgr';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8000,
  },
  plugins: [
    react(),
    svgr(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/**/*.stories.{ts,tsx}',
        'src/App.tsx', // 개발용 데모 App
        'src/styles/app.css', // App CSS
        'src/main.tsx', // 개발용 진입점
        'src/examples/**/*', // 데모 예제들
        'src/vite-env.d.ts', // Vite 환경 타입
        'src/components/ExampleCard.tsx',
      ],
      entryRoot: 'src',
      outDir: 'dist',
      tsconfigPath: './tsconfig.lib.json',
    }),
    tsconfigPaths(),
  ],
});
