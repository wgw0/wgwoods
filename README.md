# wgwoods.co.uk

My personal site: blog, projects and apps. Built with [Astro](https://astro.build) and published automatically by Cloudflare Pages whenever `main` is pushed to GitHub.

## Where things live

| To change...                    | Edit this                       |
| ------------------------------- | ------------------------------- |
| Site name and description       | `src/consts.ts`                 |
| Blog posts (one file per post)  | `src/content/blog/`             |
| Projects / apps list            | `src/data/projects.ts`          |
| Home page                       | `src/pages/index.astro`         |
| About page                      | `src/pages/about.astro`         |
| Colours and fonts               | `src/styles/global.css`         |

### Writing a new post

Create a file in `src/content/blog/`, e.g. `my-new-post.md`:

```md
---
title: 'My new post'
description: 'One line summary'
pubDate: '2026-11-08'
---

Write the post here in Markdown.
```

The file name becomes the address: `wgwoods.co.uk/blog/my-new-post/`.

## Running it locally

Astro needs Node.js 22.23 or newer.

```sh
npm install
npm run dev      # preview at http://localhost:4321
npm run build    # build the site into dist/
```

## Deployment (Cloudflare Pages)

- Build command: `npm run build`
- Output directory: `dist`
- Node version comes from `.node-version`
