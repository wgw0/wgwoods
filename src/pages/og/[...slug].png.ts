import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_DESCRIPTION } from '../../consts';
import { ogImage } from '../../lib/og';

// /og/<post-id>.png for each post, plus /og/default.png for every other page.
export const getStaticPaths: GetStaticPaths = async () => {
	const posts = await getCollection('blog');
	return [
		...posts.map((post) => ({
			params: { slug: post.id },
			props: {
				title: post.data.title,
				kicker: post.data.pubDate.toLocaleDateString('en-GB', {
					day: 'numeric',
					month: 'long',
					year: 'numeric',
				}),
			},
		})),
		{ params: { slug: 'default' }, props: { title: SITE_DESCRIPTION, kicker: 'Writing' } },
	];
};

export const GET: APIRoute = async ({ props }) =>
	new Response(new Uint8Array(await ogImage(props as { title: string; kicker?: string })), {
		headers: { 'Content-Type': 'image/png' },
	});
