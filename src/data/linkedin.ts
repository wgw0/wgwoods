// LinkedIn posts embedded at the bottom of the Writing page, newest first.
// To add one: on the post, open "…" → "Embed this post", then copy two things from the code:
//   urn:    the part after /update/ and before ?, e.g. 'urn:li:share:7346630071220072451'
//   height: the height="…" number
//   date:   when it was posted (YYYY-MM-DD), shown above the post

export type LinkedInPost = {
	urn: string;
	height: number;
	date: string;
};

export const linkedinPosts: LinkedInPost[] = [
	{ urn: 'urn:li:share:7346630071220072451', height: 532, date: '2025-07-03' },
	{ urn: 'urn:li:ugcPost:7327738404073349120', height: 593, date: '2025-05-12' },
	{ urn: 'urn:li:share:7275851755605639168', height: 264, date: '2024-12-20' },
	{ urn: 'urn:li:share:7265650979130290177', height: 670, date: '2024-11-22' },
	{ urn: 'urn:li:ugcPost:7264307226037600256', height: 593, date: '2024-11-18' },
	{ urn: 'urn:li:ugcPost:7264064478474911744', height: 593, date: '2024-11-17' },
	{ urn: 'urn:li:share:7186790236343992320', height: 633, date: '2024-04-18' },
];
