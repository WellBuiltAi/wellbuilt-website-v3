import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://wellbuilt.ai',
  integrations: [
    react(),
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('preview-booking'),
    }),
  ],
  compressHTML: true,
  vite: {
    build: {
      cssMinify: true,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: {
            gsap: ['gsap', 'gsap/ScrollTrigger'],
            motion: ['framer-motion', 'motion'],
          }
        }
      }
    }
  }
});
