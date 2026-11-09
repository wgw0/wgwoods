// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://wgwoods.co.uk',
	// /projects/ and /qr/ still build but are unlinked and kept out of the sitemap and search results.
	integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/projects') && !page.endsWith('/qr/') && !page.includes('/404') })],
});
