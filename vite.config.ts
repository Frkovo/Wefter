import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    target: 'es2020',
    rollupOptions: {
      external: ['phaser'],
      output: {
        globals: {
          phaser: 'Phaser',
        },
      },
    },
  },
});
