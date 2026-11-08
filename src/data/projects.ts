// Projects and apps shown on the site. Add one by copying an entry and filling it in.
//   title:       the project's name
//   description: one or two plain sentences on what it does
//   url:         optional, where the title links to (e.g. https://planegame.wgwoods.co.uk)
//   status:      optional short note such as 'In progress'

export type Project = {
	title: string;
	description: string;
	url?: string;
	status?: string;
};

export const projects: Project[] = [
	{
		title: 'wgwoods.co.uk',
		description: 'This site. Built with Astro, written in Markdown, and published by Cloudflare Pages on every push.',
		url: 'https://github.com/wgw0/wgwoods',
	},
];
