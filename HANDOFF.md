# HANDOFF — Dunn landing page

Status as of **2026-08-04**. Written to be read cold, with no conversation context.

## What this is

A single static marketing page for "Dunn" (placeholder product name — an AI back
office for service businesses of 3–20 people). No framework, no build step, no
dependencies: `index.html` + `styles.css` + `main.js` + `favicon.svg`.

**Live:** https://trydunn.co/
**Repo:** https://github.com/patrickluvsoj/coffer-landing (public, `main`)

## Sources of truth

| Thing | Where |
| --- | --- |
| Visual design | Claude Design project `810c15b7-d9f2-43d4-84d4-a9bede2adadc`, file `Coffer Landing.dc.html` (historical source name) |
| Which design direction | **`2a`** — "Ledger, but friendly" (Turn 2). *Not* 1a/1b/1c, which are earlier explorations in the same file. |
| Copy | `coffer-landing-page-copy.md` (was at a local-agent-mode sessions path; not in this repo) |
| Local reference copy of the design doc | `design-src/` — gitignored, may not exist in a fresh clone |

To re-read the design: `DesignSync` tool, `get_file`, projectId above. It is ~143 KB;
direction `2a` is roughly lines 25–461.

## State: complete and deployed

All four requested changes are implemented, deployed, and verified in a browser against
the live URL at 1280px, 820px, and 390px.

1. **Module 2 ("See it coming", 13-week cash-flow forecast) removed.** Modules renumbered
   01/02/03. Every downstream forecast reference was chased down too — see "Do not
   reintroduce" below.
2. **Copy-doc sections 6, 8, 9, 10 removed** — control/objection handling, comparison
   table, social proof, security.
3. **Pricing collapsed to a single $50/mo plan.**
4. **Deployed to GitHub Pages** (chosen over Vercel: `gh` was already authenticated,
   Vercel CLI was not installed, and the site is static with no build step).

## Do not reintroduce (these removals were deliberate)

Removing the forecast module meant removing its echoes. If you re-add the module, these
come back with it; if you don't, leaving them out is correct:

- The "How accurate is the cash flow forecast?" FAQ (replaced with "What if the AI gets a
  lead's question wrong?").
- The before/after illustration's 4th card pair. Was "Payroll · in 14 days" →
  "Payroll week — covered"; now "Invoice 1043 · still not sent" → "1043 — sent same day",
  which reinforces pillar 01 instead.
- "Cash flow forecast" in the pricing feature list.
- "Forecasts are estimates." in the footer legal line.
- The problem card's tail sentence "You genuinely don't know if the cash lands first."
- The "Security" nav link and footer link (section 10 is gone).

Two additions were made to keep the remaining pillars cohesive, and are not in the
original copy doc:

- Section header above the modules: **"Money in. Leads in. Paperwork gone."** /
  "Two things Dunn chases for you. One it just quietly handles."
- The FAQ's left column now carries a supporting line ("The ones that actually decide
  it…") because section 10's security box used to live there.

## Known open items

- **Copy doc `[VERIFY]` markers were never resolved.** The doc's instruction is: replace
  every `[VERIFY]` before launch, and if a number can't be substantiated, cut the
  sentence rather than soften it. The page currently ships **no** unverifiable statistics
  — the proof-point lines ("cut days-to-payment by [X] days", "[X] of after-hours leads
  booked") were left out rather than filled with invented numbers. Adding real numbers is
  a launch task.
- **Every CTA is a placeholder `#demo` anchor.** There is no booking flow, no form, no
  walkthrough video. Footer and nav links likewise point at `#top`.
- The copy doc calls section 6 (control/objection handling) the most important section on
  the page, and it was removed by request. The draft-first promise survives in the hero
  subhead, the approval-inbox product shot, and the first FAQ — but it is no longer made
  explicitly. Worth flagging to whoever owns conversion.
- The footer is intentionally reduced to the Dunn logo, © 2026 copyright, and legal links.

## Implementation notes worth not re-deriving

- **The two gardener illustrations are pure CSS art** — ~30 absolutely-positioned `<i>`
  elements each, at hardcoded pixel offsets copied from the design doc (`.fig-slumped`
  and `.fig-calm` in `styles.css`). They are `aria-hidden`. Do not "tidy" the
  coordinates; they are load-bearing and were transcribed to match the design exactly.
- **Below 640px the scenes reflow.** The scattered note cards collided with the figure at
  narrow widths, so under 640px `.scene` becomes a 2-column grid with
  `padding-bottom: 262px` reserving space for the still-absolute figure. That padding
  value is tied to the figure heights (200px/206px + bottom offsets); changing figure
  size means changing it.
- **The scroll-reveal is deliberately fail-safe.** An inline `<head>` script adds `.js`
  (so reveal targets are hidden before first paint, no flash), then a 1200ms timer
  removes `.js` unless `main.js` has added `.reveal-ready`. Net effect: if `main.js` ever
  fails to load, the page shows everything rather than rendering blank. Don't collapse
  this back into a plain `.js`-only guard.
- `main.js` also reveals anything already in the viewport on the first
  `requestAnimationFrame`, so the hero doesn't wait on the observer's first async callback.

## Gotchas for whoever picks this up

- **GitHub Pages caches `styles.css` aggressively.** After a push, the HTML updates
  before the CSS does. When verifying in a browser, force the stylesheet to reload
  (swap `link.href` to `styles.css?bust=…`) or you will "confirm" a bug you already fixed.
  A push takes roughly 20–60s to go live; poll for a known string in the deployed CSS.
- **The preview tooling in this environment reads `~/.claude/launch.json`, not this
  repo's `.claude/launch.json`,** because the session's working directory was the home
  directory. The repo's launch config is correct for anyone opening `coffer-landing/`
  itself as the project root.
- **Screenshots of a scrolled page came back blank or stale** in this environment, in both
  `file://` snapshot mode and on the live site. The workaround that worked: set a very
  tall viewport, or hide upper sections via JS (`el.style.display='none'`) so the region
  of interest sits at the top of the document, then screenshot without scrolling.
- Local preview: `npx --yes serve -l 4788 .`

## Commits

```
467b460  Build Coffer landing page from design 2a
         Use checkmarks for pricing feature list
         Fix before/after scenes on narrow viewports
```
