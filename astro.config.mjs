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
    sitemap({
      // The root "/" page only performs a redirect to "/it/" — excluding it
      // avoids a duplicate entry alongside the real homepage.
      filter: (page) => page !== `${site}/`,
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
