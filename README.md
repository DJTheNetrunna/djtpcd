# DJ The PC Dude Website

A static cyber-terminal style website for DJ The PC Dude.

## What this project is

This site is a public web hub for:
- PC repair and custom build services
- pricing and service tiers
- blog posts and case studies
- donation/recycle intake
- contact and emergency support paths

## Tech stack

- HTML + CSS + vanilla JavaScript
- Tailwind CDN for utility classes
- Shared layout script for global nav/footer/status/CTA

## Local run

Open directly in browser or use any static server.

Example:

```bash
cd djtpcd-main
python3 -m http.server 8080
```

Then open `http://127.0.0.1:8080`.

## Important files

- `index.html`: homepage
- `pages/services.html`: service tiers, trust stack, service area map
- `pages/blog.html`: posts index
- `pages/templates.html`: native DJ Template Studio catalog, search, category/price filters, responsive demos, and free HTML downloads
- `assets/template-catalog.js`: editable template listings and proposed USD prices
- `assets/template-studio.js`, `assets/template-studio.css`: storefront behavior and theme-aware styles
- `assets/templates/`: eight self-contained one-page demos; Launchpad, Local Pro, and Bento Folio are downloadable free starters. Premium listings are previews only; checkout is not connected.

Template storefront records its shortlist in browser local storage. Contact customization requests use the existing site contact page. Demo interfaces do not include backend, AI, payment, or email services. Free starter license terms are embedded in each starter’s source; premium commercial packages and terms remain pending.
- `pages/faq.html`: FAQ
- `pages/case-studies.html`: proof/portfolio cases
- `pages/privacy.html`: privacy policy
- `pages/terms.html`: terms of service
- `pages/intake-checklist.html`: printable intake checklist
- `assets/shared-layout.js`: global header/footer/status/mobile CTA
- `assets/site-config.json`: contact, status, analytics toggles
- `robots.txt`, `sitemap.xml`, `404.html`: SEO + routing support

## Contributing

Contributions are welcome.

1. Fork the repo
2. Create a branch (`feature/your-change`)
3. Keep changes focused and readable
4. Test links/pages locally
5. Open a PR with before/after notes

## Quality guardrails

- GitHub Action runs automated link checks (`.github/workflows/link-check.yml`)
- Keep text clear for non-technical users
- Prefer plain-language explanations over jargon

## License

Use a license of your choice (MIT recommended) before production use.

Template preview isolation: the site theme excludes `.template-cover` artwork. Live demos run in sandboxed iframes with their own CSS; no site theme or holiday scripts are loaded inside them. Preview frames use a normal color scheme. Theme changes apply to the surrounding storefront only.
