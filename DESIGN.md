# Design

Notes on how wgwoods.co.uk looks and why, so future changes stay consistent.
Built using principles from Anthropic's frontend-design skill, Impeccable and Taste Skill.

## Brief

- **Who:** William Woods. Writes about people, culture and how organisations change, with a lens on
  defence and security. Senior Analyst; Software Engineering graduate.
- **Feel:** a premium, editorial publication with an executive-consulting edge. Readable first.
- **Modes:** writing is for reading; About doubles as a CV; the home page introduces both.

## Principles

1. **White page, navy type, gold accent.** Roughly 60% navy ink, 30% white and light grey, 10% gold.
   Dark-mode devices get the inverse: a navy page with off-white type.
2. **Type does the work.** Playfair Display (serif) for headings and post titles carries editorial
   authority; Inter (sans) for body text and navigation; JetBrains Mono for dates and metadata, the
   technical, data-driven voice.
3. **Gold is earned.** Gold marks things, it doesn't fill them: the short rule under the main heading,
   link underlines, the timeline markers, the top edge of the featured card and the reading progress bar.
   Plain gold (`#c5a880`) fails contrast as text on white, so any gold text uses bronze (`--accent`).
4. **One featured element per page.** The home page features the latest post as a single card;
   everything else is a quiet list separated by lines.
5. **Restrained motion.** The intro fades in once on load; the progress bar tracks reading. Nothing
   animates on scroll. Reduced-motion settings are respected.

## Tokens (`src/styles/global.css`)

| Role          | Light     | Dark      | Use                                   |
| ------------- | --------- | --------- | ------------------------------------- |
| canvas        | `#ffffff` | `#0f172a` | page background                       |
| surface       | `#f8fafc` | `#1e293b` | featured card, subscribe box, code    |
| ink           | `#0f172a` | `#f8fafc` | text and headings                     |
| ink-soft      | `#475569` | `#94a3b8` | descriptions and metadata             |
| rule          | `#e2e8f0` | `#334155` | dividing lines and borders            |
| accent        | `#7f6420` | `#d4af37` | gold text (hover, labels): passes AA  |
| gold          | `#c5a880` | `#c5a880` | decoration only                       |

- Type scale: 0.75, 0.875, 1, 1.125, 1.5, ~2.25, ~3.5rem (the top two scale with screen width).
- Spacing: 4px base (`--space-1` to `--space-24`).
- Reading width: 68 characters. Page width: 46rem.
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)`.

## Avoid

Bright metallic gold gradients, gold text on white, neon accents, glass, card grids, emoji as icons,
"→" on links, fade-in-on-scroll, stock photos of military hardware, invented stats or testimonials.

## Layout

```
WILLIAM WOODS                                 Writing  About

I write about organisations,
people, and how they
change.                             (Playfair, large)
───                                 (short gold rule)
Short intro paragraph

Latest briefing
┌───────────────────────────────────────────────────────┐
│ image                                                 │
├═══════════════════════════════════════════════════════┤  gold top edge
│ 8 August 2026                       (mono)            │
│ Post title                          (Playfair)        │
│ Description                                           │
└───────────────────────────────────────────────────────┘

More writing                                  All writing
─────────────────────────────────────────────────────────
Post title                                  6 August 2026
One-line description
─────────────────────────────────────────────────────────

© 2026 William Woods                 Email  LinkedIn  GitHub
```

Posts add a gold reading-progress bar at the top of the screen and a Substack sign-up box at the end.
