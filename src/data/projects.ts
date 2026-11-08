// Your projects and apps. Add one by copying an entry below and filling it in.
//   title:       the name shown on the card
//   description: one or two sentences
//   url:         where the button goes (e.g. https://planegame.wgwoods.co.uk)
//   status:      optional label such as 'Live', 'In progress' or 'Prototype'

export type Project = {
	title: string;
	description: string;
	url?: string;
	status?: string;
};

export const projects: Project[] = [
	{
		title: 'This website',
		description: 'My personal site, built with Astro and hosted on Cloudflare Pages.',
		url: 'https://github.com/wgw0/wgwoods',
		status: 'Live',
	},
];
