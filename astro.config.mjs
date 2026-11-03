// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const site = 'https://kwanyuki.it';

// https://astro.build/config
export default defineConfig({
  site,
  trailingSlash: 'always',

  image: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },

  integrations: [
    // Italian lives at "/", so the root is a real page now and belongs in the sitemap.
    sitemap(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
