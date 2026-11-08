// Work history shown on the About page, newest first.
// Add a job by copying an employer block; add a promotion by adding a role at the top of `roles`.
//   start / end: 'Mon YYYY'; leave `end` out for a current role
//   points:      optional bullet points for the role

export type Role = {
	title: string;
	start: string;
	end?: string;
	points?: string[];
};

export type Employer = {
	name: string;
	url?: string;
	location?: string;
	roles: Role[];
};

export const experience: Employer[] = [
	{
		name: 'Hookflash',
		url: 'https://www.hookflash.co.uk',
		location: 'London · Hybrid',
		roles: [
			{
				title: 'Senior Analyst',
				start: 'Jun 2026',
				points: [
					'Supporting advisory and analytical projects across client engagements spanning retail, healthcare, sport and non-profit sectors.',
					'Designing and implementing analytics frameworks using Google and Adobe platforms across client-side and server-side environments, enabling reliable measurement of behaviour and platform performance.',
					'Working with client stakeholders to improve reporting, performance visibility and decision-making across commercial and operational teams, supporting the management of multi-million pound advertising budgets.',
					'Developing forecasting and planning models to support budgeting, resource allocation and scenario planning in complex operational environments.',
					'Acting as a link between technical delivery teams and business stakeholders, translating organisational objectives into practical implementation approaches and project outcomes.',
					'Managing varied analytics, implementation and advisory projects embedded within client environments, balancing stakeholder expectations, technical requirements and changing business needs.',
				],
			},
			{
				title: 'Technical Analyst',
				start: 'Jan 2025',
				end: 'Jun 2026',
			},
		],
	},
];
