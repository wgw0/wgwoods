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
		title: 'Channel imputation for unconsented data',
		description:
			'A machine learning model that fills in missing channel data in user journeys when people opt out of cookie tracking. It learns from complete journeys in Google BigQuery to predict the most likely channel for incomplete ones, giving more accurate attribution.',
		url: 'https://github.com/wgw0/bq_modelling',
	},
];
