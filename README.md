# Dunn — landing page

Static marketing page for Dunn, the AI back office for small service businesses.
No build step: plain HTML, one stylesheet, one small script. Deployed to GitHub Pages
from `main`.

**Live:** https://trydunn.co/

## Local preview

```bash
npx --yes serve -l 4788 .
```

## Source

- Design: Claude Design project `810c15b7`, direction **2a** ("Ledger, but friendly")
- Copy: `coffer-landing-page-copy.md`

## Deliberate deviations from the source design and copy doc

These were requested changes, not oversights:

- **Module 2 "See it coming" (13-week cash-flow forecast) removed.** Every downstream
  reference went with it — the forecast FAQ, the "Payroll week — covered" beat in the
  before/after illustration, the forecast line in the pricing list, and the
  "Forecasts are estimates" sentence in the footer disclaimer. The remaining pillars are
  framed by a new section header ("Money in. Leads in. Paperwork gone.") so the set reads
  as deliberate rather than as a gap.
- **Copy-doc sections 6, 8, 9, 10 removed** — control/objection handling, comparison
  table, social proof, and security. Sections 8 and 9 were never built in direction 2a.
  Section 10 had been folded into the FAQ block's left column, so that column now carries
  the FAQ heading instead. The "Security" nav and footer links are gone with it.
- **Pricing is a single $50/mo plan** rather than the three-tier table.

Note that the copy doc calls section 6 the most important on the page. The
draft-first promise still appears in the hero subhead, the approval-inbox product shot,
and the first FAQ, so the argument survives — but it is no longer made explicitly.
