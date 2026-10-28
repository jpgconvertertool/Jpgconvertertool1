import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt', 'es', 'fr', 'de', 'ar', 'zh-tw'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
