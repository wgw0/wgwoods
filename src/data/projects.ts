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
		title: 'Afterburner',
		description:
			'A Roblox dogfighting game inspired by DCS World. It keeps the decisions that make air combat tense, energy fighting and defeatable missiles, and drops the 60-key bindings. Players work up a career from 1970s jets to sixth-generation concepts.',
		url: 'https://github.com/wgw0/afterburner',
		status: 'Soft-launch build',
	},
	{
		title: 'Channel imputation for unconsented data',
		description:
			'A machine learning model that fills in missing channel data in user journeys when people opt out of cookie tracking. It learns from complete journeys in Google BigQuery to predict the most likely channel for incomplete ones, giving more accurate attribution.',
		url: 'https://github.com/wgw0/bq_modelling',
	},
	{
		title: 'GTM Account Color Highlighter',
		description:
			'A Chrome extension that gives each Google Tag Manager account card its own colour, so long account lists are easier to scan.',
		url: 'https://chromewebstore.google.com/detail/gtm-account-color-highlig/iohhhbcgakcgdccooggnimoahfnlhebp',
		status: 'On the Chrome Web Store',
	},
	{
		title: 'Labyrinth of the Lightless',
		description:
			'A top-down horror survival game built in GameMaker. You are trapped in a procedurally generated maze in near-total darkness, managing health, sanity and a flashlight while enemies hunt you.',
		url: 'https://github.com/wgw0/Labyrinth_of_the_Lightless',
	},
];
