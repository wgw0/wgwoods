# Analytics

Google Tag Manager loads Google Analytics 4. The site pushes data to `window.dataLayer`; GTM turns
those pushes into GA4 events.

| | ID |
|---|---|
| GTM container | `GTM-K7MM3TR9` ("Client side - wgwoods.co.uk") |
| GA4 property | `565720958`, web stream `16405515360` |
| GA4 Measurement ID | `G-NJHH35Z8FN` |

## Where it lives

- `src/consts.ts`: `GTM_ID`. Empty it to switch tracking off.
- `src/components/Analytics.astro`: page-context push plus the GTM loader, first thing in `<head>`.
  Only renders in production builds (`astro build` / `astro preview`), never in `astro dev`.
- `src/layouts/Base.astro`: works out `page_type`, adds the `<noscript>` iframe, loads the event script.
- `src/scripts/analytics.ts`: click, read-depth and subscribe-embed events.
- `public/bjass/index.html`: static page with its own copy of the snippet (`page_type: tool`).
- `analytics/gtm-container.json`: the GTM tags, trigger and variables as an import file. If you
  change GTM, export the container and replace this file so the repo stays the source of truth.

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

The GTM Google tag sends these as config parameters, so they go on every GA4 event from the page.

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
`home_intro`, `home_latest`, `post_list`, `article_body`, `article_origin`, `article_footer`,
`about_bio`, `about_experience`, `qr_page`), falling back to `header`, `footer` or `body`. Add the
attribute to new sections to label their links.

GA4 enhanced measurement still runs on top (page views, scrolls, outbound clicks, file downloads etc.).

## GTM

- **GA4 - Google tag**: Initialization - All Pages. Config parameters: `content_group`, `page_type`,
  `article_id`, `article_publish_date`, `article_reading_minutes`.
- **GA4 - Event - Site events**: event name `{{Event}}`, fired by **CE - Site events** (custom event,
  regex on the event names above). Sends every event param above; empty ones are dropped.
- Variables: one `DLV - <key>` per dataLayer key, `Const - GA4 Measurement ID`.

To add an event: push it with `track()` in `analytics.ts`, add its name to the trigger regex, and
add any new params to the event tag and a `DLV -` variable.

## GA4 admin

- Event data retention: 14 months.
- Event-scoped custom dimensions: `page_type`, `article_id`, `article_publish_date`,
  `article_reading_minutes`, `link_location`, `social_network`, `contact_method`, `percent_read`.
  (`content_type`, `content_id`, `link_url`, `link_text`, `file_name`, `file_extension` are built in.)
- Key events: mark `contact_click` and `subscribe_interaction` once they show under
  Admin > Events > Recent events.
