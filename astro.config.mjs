// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://wgwoods.co.uk',
	// /projects/ still builds but is unlinked and kept out of the sitemap and search results.
	integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/projects') })],
});
