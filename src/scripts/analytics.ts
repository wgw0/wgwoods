// Site-wide dataLayer events for Google Tag Manager. See ANALYTICS.md for the full spec.
//
// Every event is pushed as { event, ...params }, then the same keys are pushed again as
// undefined, so a parameter from one event never leaks into the next one in GTM's data model.

type Params = Record<string, string | number | undefined>;

declare global {
	interface Window {
		dataLayer: Record<string, unknown>[];
	}
}

export function track(event: string, params: Params = {}) {
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({ event, ...params });
	const reset: Record<string, undefined> = {};
	for (const key of Object.keys(params)) reset[key] = undefined;
	window.dataLayer.push(reset);
}

// Where on the page a link sits: the nearest data-link-location, else a broad fallback.
function linkLocation(el: Element): string {
	const tagged = el.closest<HTMLElement>('[data-link-location]');
	if (tagged?.dataset.linkLocation) return tagged.dataset.linkLocation;
	if (el.closest('header')) return 'header';
	if (el.closest('footer')) return 'footer';
	return 'body';
}

const SOCIAL_HOSTS: Record<string, string> = {
	'linkedin.com': 'linkedin',
	'lnkd.in': 'linkedin',
	'github.com': 'github',
	'substack.com': 'substack',
};

function socialNetwork(url: URL): string | undefined {
	const host = url.hostname.replace(/^www\./, '');
	for (const [domain, name] of Object.entries(SOCIAL_HOSTS)) {
		if (host === domain || host.endsWith(`.${domain}`)) return name;
	}
	// Short links on this site that redirect to a profile (see public/_redirects).
	if (url.origin === location.origin && /^\/(linkedin|li)\/?$/.test(url.pathname)) return 'linkedin';
	return undefined;
}

function linkText(a: HTMLAnchorElement): string {
	return (a.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 100);
}

// Clicks: contact, social, post selection and downloads.
document.addEventListener(
	'click',
	(e) => {
		const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
		if (!a) return;
		const href = a.getAttribute('href') ?? '';
		const location_ = linkLocation(a);

		if (href.startsWith('mailto:')) {
			track('contact_click', { contact_method: 'email', link_location: location_ });
			return;
		}

		let url: URL;
		try {
			url = new URL(a.href, location.href);
		} catch {
			return;
		}

		if (a.hasAttribute('download')) {
			const fileName = a.getAttribute('download') || url.pathname.split('/').pop() || '';
			track('file_download', {
				file_name: fileName,
				file_extension: fileName.split('.').pop()?.toLowerCase(),
				link_url: url.href,
				link_location: location_,
			});
			return;
		}

		const network = socialNetwork(url);
		if (network) {
			track('social_click', {
				social_network: network,
				link_url: url.href,
				link_text: linkText(a),
				link_location: location_,
			});
			return;
		}

		const post = url.origin === location.origin && url.pathname.match(/^\/blog\/([^/]+)\/?$/);
		if (post) {
			track('select_content', {
				content_type: 'blog_post',
				content_id: post[1],
				link_location: location_,
			});
		}
	},
	{ capture: true },
);

// Article read depth: 25 / 50 / 75 / 100 % of the post body, each once per page view.
const body = document.querySelector<HTMLElement>('[data-article-body]');
if (body) {
	const milestones = [25, 50, 75, 100];
	const sent = new Set<number>();
	let ticking = false;
	const check = () => {
		ticking = false;
		const rect = body.getBoundingClientRect();
		const total = rect.height - window.innerHeight;
		const read = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) * 100 : 100;
		for (const m of milestones) {
			if (read >= m && !sent.has(m)) {
				sent.add(m);
				track('article_progress', { percent_read: m });
			}
		}
		if (sent.size === milestones.length) {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		}
	};
	const onScroll = () => {
		if (!ticking) {
			ticking = true;
			requestAnimationFrame(check);
		}
	};
	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll);
}

// Substack sign-up embed: seen (half in view), then interacted with. The iframe is
// cross-origin, so a click into it shows up as the window losing focus to the iframe.
const subscribe = document.querySelector<HTMLElement>('[data-subscribe-embed]');
if (subscribe) {
	const frame = subscribe.querySelector('iframe');
	if ('IntersectionObserver' in window) {
		const io = new IntersectionObserver(
			(entries) => {
				if (entries.some((en) => en.isIntersecting)) {
					track('subscribe_view', { link_location: 'subscribe_embed' });
					io.disconnect();
				}
			},
			{ threshold: 0.5 },
		);
		io.observe(subscribe);
	}
	if (frame) {
		let interacted = false;
		window.addEventListener('blur', () => {
			setTimeout(() => {
				if (!interacted && document.activeElement === frame) {
					interacted = true;
					track('subscribe_interaction', { link_location: 'subscribe_embed' });
				}
			}, 0);
		});
	}
}
