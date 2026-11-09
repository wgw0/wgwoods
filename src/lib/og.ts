import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import satori from 'satori';
import sharp from 'sharp';

// Link preview ("Open Graph") images: 1200×630 PNGs drawn at build time.
// Navy background, Playfair title, short gold rule, name and site in mono.

const require = createRequire(import.meta.url);
const font = (pkg: string, file: string) => readFile(require.resolve(`${pkg}/files/${file}`));

const fontsPromise = Promise.all([
	font('@fontsource/playfair-display', 'playfair-display-latin-500-normal.woff'),
	font('@fontsource/inter', 'inter-latin-400-normal.woff'),
	font('@fontsource/jetbrains-mono', 'jetbrains-mono-latin-400-normal.woff'),
]);

const NAVY = '#0f172a';
const WHITE = '#f8fafc';
const SOFT = '#94a3b8';
const GOLD = '#c5a880';

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
	type,
	props: { style, children },
});

export async function ogImage({ title, kicker }: { title: string; kicker?: string }): Promise<Buffer> {
	const [playfair, inter, mono] = await fontsPromise;
	// Long titles get a smaller size so they stay within three or four lines.
	const size = title.length > 70 ? 60 : title.length > 40 ? 72 : 84;

	const tree = h(
		'div',
		{
			width: 1200,
			height: 630,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			padding: '64px 80px 60px',
			boxSizing: 'border-box',
			background: NAVY,
			borderTop: `8px solid ${GOLD}`,
		},
		[
			h(
				'div',
				{ display: 'flex', fontFamily: 'JetBrains Mono', fontSize: 24, letterSpacing: 2, color: SOFT },
				(kicker ?? '').toUpperCase(),
			),
			h('div', { display: 'flex', flexDirection: 'column' }, [
				h(
					'div',
					{ fontFamily: 'Playfair Display', fontSize: size, lineHeight: 1.12, color: WHITE, maxWidth: 1000 },
					title,
				),
				h('div', { width: 96, height: 4, marginTop: 40, background: GOLD }, ''),
			]),
			h(
				'div',
				{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					fontFamily: 'Inter',
					fontSize: 28,
					color: WHITE,
				},
				[
					h('div', { fontFamily: 'Playfair Display', letterSpacing: 4 }, 'WILLIAM WOODS'),
					h('div', { fontFamily: 'JetBrains Mono', fontSize: 24, color: GOLD }, 'wgwoods.co.uk'),
				],
			),
		],
	);

	const svg = await satori(tree as Parameters<typeof satori>[0], {
		width: 1200,
		height: 630,
		fonts: [
			{ name: 'Playfair Display', data: playfair, weight: 500, style: 'normal' },
			{ name: 'Inter', data: inter, weight: 400, style: 'normal' },
			{ name: 'JetBrains Mono', data: mono, weight: 400, style: 'normal' },
		],
	});
	return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
}
