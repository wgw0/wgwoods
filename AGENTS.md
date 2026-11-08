## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Project notes

- Deployed to Cloudflare Pages from the `main` branch; domain is wgwoods.co.uk.
- Projects shown on the site are listed in `src/data/projects.ts`.
- Requires Node >= 22.23.4. If the installed Node is older, run Astro via
  `npx -y -p node@22 node node_modules/astro/bin/astro.mjs <command>`, and install
  dependencies with that Node too, or npm silently skips native optional packages.
