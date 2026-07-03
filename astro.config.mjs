// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Live-Domain der LP. Wird fuer Canonical, JSON-LD @id und Sitemap genutzt.
export default defineConfig({
  site: 'https://friends.steine-steuern.de',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
