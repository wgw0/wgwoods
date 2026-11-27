# Analytics

Google Tag Manager loads Google Analytics 4. The site pushes data to `window.dataLayer`; GTM turns
those pushes into GA4 events.

| | ID |
|---|---|
| GTM container | `GTM-K7MM3TR9` ("Client side - wgwoods.co.uk") |
| GA4 property | `565720958`, web stream `16405515360` |
| GA4 Measurement ID | `G-NJHH35Z8FN` |

## Where it lives

- `src/consts.ts`: `GTM_ID` (empty it to switch tracking off) and `GTM_PATH`.
- `src/components/Analytics.astro`: page-context push plus the GTM loader, first thing in `<head>`.
  Only renders in production builds (`astro build` / `astro preview`), never in `astro dev`.
- `src/layouts/Base.astro`: works out `page_type`, adds the `<noscript>` iframe, loads the event script.
- `src/scripts/analytics.ts`: click, read-depth and subscribe-embed events.
- `public/bjass/index.html`: static page with its own copy of the snippet (`page_type: tool`).
- `analytics/gtm-container.json`: the GTM tags, trigger and variables as an import file. If you
  change GTM, export the container and replace this file so the repo stays the source of truth.

## First-party serving (Cloudflare Google tag gateway)

Cloudflare's Google tag gateway is on for wgwoods.co.uk (Cloudflare dashboard > Web tag management >
wgwoods.co.uk > Google Tag Gateway; free on the Free plan). It proxies Google's tag and GA4 hits
through `https://wgwoods.co.uk/k9q4/`, a deliberately meaningless path so filter lists don't
match it. The site loads the container from `/k9q4/?id=GTM-K7MM3TR9` (no `gtm.js` in the URL), and
the GA4 library loads through the same path. The gateway shows Active in both GTM containers
(`GTM-K7MM3TR9` and the GA4 Google tag's `GTM-PFCNC54H`) and accepts hits at `/k9q4/g/collect`,
but as of 24 Nov 2026 the GA4 hits themselves still go to `region1.google-analytics.com`; check
whether Google has switched them over. `GTM_PATH` in `src/consts.ts` and the copy in
`public/bjass/index.html` must match the path set in Cloudflare. The `<noscript>` iframe still points
at googletagmanager.com because the gateway doesn't serve `ns.html`.

No consent banner: GA4 sets cookies on first load. Add Consent Mode v2 and a banner if that changes.

## Page context (pushed before GTM loads, no `event` key)

| Key | Values |
|---|---|
| `page_type` | `home`, `blog_index`, `blog_post`, `about`, `projects`, `qr`, `not_found`, `tool` |
| `content_group` | `home`, `writing`, `site`, `tools` |
| `article_id` | Post slug (blog posts only) |
| `article_title` | Post title (blog posts only; not sent to GA4, which has `page_title`) |
| `article_publish_date` | `YYYY-MM-DD` (blog posts only) |
| `article_reading_minutes` | Number (blog posts only) |
| `traffic_type` | `internal` for our own visits (see below); absent otherwise |

The same object is also pushed as `gtag('set', page)`, along with `gtag('set', 'send_page_view', false)`.
The `set` is what puts `traffic_type` (as `tt`) on every hit, GA4's own enhanced measurement events
included. Page view and site events get the other page fields from GTM's **GTES - Page data**
variable (see GTM below). Fields in the Google tag's own configuration settings never reach GA4,
which is why page data showed as "(not set)" before 27 Nov 2026.

## Internal traffic

Our own visits are tagged `traffic_type: internal` and dropped by GA4's **Internal Traffic** data
filter (Admin > Data collection > Data filters). Two ways a visit is marked:

- **Per browser:** open any page with `?internal=1` (e.g. `https://wgwoods.co.uk/?internal=1`)
  once in each browser and device you use. It's kept in localStorage (`wg_internal`), so it lasts
  until site data is cleared; Safari drops it after about 7 days without a visit. `?internal=0`
  undoes it. Anything not on wgwoods.co.uk (a localhost preview, say) is always internal.
- **By network:** the GA4 Google tag's "Home network" internal traffic rule (Google tag settings >
  Define internal traffic) matches the home IPv4 address and IPv6 /64 prefix. Update it if the
  ISP changes the address; the browser flag still covers you if it does.

Excluded data is gone for good, so leave the filter on only while this is how you want it.

## Events

Each event is pushed as `{ event, ...params }` and then the same keys are pushed as `undefined`, so
a value from one event can't carry over into the next.

| Event | When | Params |
|---|---|---|
| `article_progress` | 25, 50, 75, 100 % of the post body scrolled past, once each | `percent_read` |
| `select_content` | Click on a link to a blog post | `content_type` (`blog_post`), `content_id`, `link_location` |
| `social_click` | Click to LinkedIn, GitHub or Substack (incl. `/linkedin`, `/li`) | `social_network`, `link_url`, `link_text`, `link_location` |
| `contact_click` | Click on a `mailto:` link | `contact_method` (`email`), `link_location` |
| `file_download` | Click on an `<a download>` link (QR code SVG) | `file_name`, `file_extension`, `link_url`, `link_location` |
| `subscribe_view` | Substack sign-up embed is half in view | `link_location` |
| `subscribe_interaction` | Visitor clicks into the Substack embed | `link_location` |

`link_location` comes from the nearest `data-link-location` attribute (`header`, `footer`,
`home_intro`, `home_latest`, `home_more`, `post_list`, `article_body`, `article_origin`, `article_footer`,
`about_bio`, `about_experience`, `qr_page`), falling back to `header`, `footer` or `body`. Add the
attribute to new sections to label their links.

GA4 enhanced measurement still runs on top (page views, scrolls, outbound clicks, file downloads etc.).

## GTM

- **GA4 - Google tag**: Initialization - All Pages. Loads GA4; `send_page_view` is false (the page
  also sets that through `gtag('set')`, which is the one GA4 honours), so it sends no page view of
  its own.
- **GA4 - Event - page_view**: All Pages. Sends `page_view` with **GTES - Page data**.
- **GA4 - Event - Site events**: event name `{{Event}}`, fired by **CE - Site events** (custom event,
  regex on the event names above). Sends every event param above plus **GTES - Page data**; empty
  ones are dropped.
- Variables: one `DLV - <key>` per dataLayer key, `Const - GA4 Measurement ID`, and **GTES - Page
  data** (a Google Tag: Event Settings variable with `content_group`, `page_type`, the `article_*`
  fields and `traffic_type`).

To add an event: push it with `track()` in `analytics.ts`, add its name to the trigger regex, and
add any new params to the event tag and a `DLV -` variable.

## GA4 admin

- Event data retention: 14 months.
- Event-scoped custom dimensions: `page_type`, `article_id`, `article_publish_date`,
  `article_reading_minutes`, `link_location`, `social_network`, `contact_method`, `percent_read`.
  (`content_type`, `content_id`, `link_url`, `link_text`, `file_name`, `file_extension` are built in.)
- Key events: mark `contact_click` and `subscribe_interaction` once they show under
  Admin > Events > Recent events.
