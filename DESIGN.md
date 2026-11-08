# Design

Notes on how wgwoods.co.uk looks and why, so future changes stay consistent.
Built using principles from Anthropic's frontend-design skill, Impeccable and Taste Skill.

## Brief

- **Who:** Will Woods. Writes about organisations, people and how they change, with a lens on
  defence and security. Senior Analyst at Hookflash; Software Engineering graduate.
- **Feel:** calm and readable. The writing comes first.
- **Modes:** the blog is for reading; projects are a showcase; the home page introduces both.

## Principles

1. **One bold element.** The home page opens with a single large serif sentence saying what the
   site is about. Everything else is quiet.
2. **Type does the work.** Two clearly different families: Newsreader (serif) for the opening line and
   long-form writing, Hanken Grotesk (sans) for headings, navigation and lists.
3. **Structure carries meaning.** Lines separate posts in a list, and that's all. No cards, eyebrow
   labels, numbered sections, pills or decorative shadows.
4. **One moment of motion.** The intro fades in once on load. Links change colour on hover.
   Nothing animates on scroll. Reduced-motion settings are respected.
5. **Colour from the name.** A pine green (Woods) is the only accent, used for links and focus.
   Neutrals are very slightly tinted toward it.

## Tokens (`src/styles/global.css`)

| Role        | Light                      | Dark                       |
| ----------- | -------------------------- | -------------------------- |
| canvas      | `oklch(98.6% 0.004 165)`   | `oklch(20% 0.014 170)`     |
| surface     | `oklch(95.8% 0.008 165)`   | `oklch(24% 0.016 170)`     |
| ink         | `oklch(23% 0.018 170)`     | `oklch(93% 0.008 165)`     |
| ink-soft    | `oklch(45% 0.02 170)`      | `oklch(74% 0.015 165)`     |
| rule        | `oklch(88% 0.012 165)`     | `oklch(32% 0.016 170)`     |
| pine        | `oklch(44% 0.075 160)`     | `oklch(79% 0.085 160)`     |

- Type scale: 0.875, 1, 1.1875, 1.5, ~2.25, ~3.5rem (the top two scale with screen width).
- Spacing: 4px base (`--space-1` to `--space-24`).
- Reading width: 66 characters. Page width: 46rem.
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)`.

## Avoid

Cream background with terracotta accent, dark background with neon accent, gradient text, glass,
card grids with soft grey shadows, all-caps labels above headings, "→" on links, emoji as icons,
monospace used for decoration, fade-in-on-scroll, invented stats or testimonials.

## Layout

```
Will Woods                          Writing  Projects  About

I write about organisations,
people, and how they
change.                             (serif, large)

Short intro paragraph

Writing                                       All writing
─────────────────────────────────────────────────────────
Post title                                     8 Nov 2026
One-line description
─────────────────────────────────────────────────────────

Projects                                     All projects
Project name (link)
One or two sentences

─────────────────────────────────────────────────────────
© 2026 Will Woods                 Email  LinkedIn  GitHub
```
