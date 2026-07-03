// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// HINWEIS: `site` ist ein Platzhalter, bis die finale LP-Domain feststeht.
// Wird fuer Canonical + JSON-LD @id genutzt. Beim Launch anpassen.
export default defineConfig({
  site: 'https://steine-steuern.de',
  vite: {
    plugins: [tailwindcss()],
  },
});
