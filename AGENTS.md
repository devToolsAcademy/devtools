<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# DevTools — project context

## What this is

Single-route marketing site for **DevTools**, a bilingual (ES/EN) software engineering / SDLC studio. `app/[locale]/page.tsx` is the only route and stacks the landing sections in order. There is **no CMS, no API, no database, no env config, and no test framework** — all user-facing copy lives in `messages/es.json` and `messages/en.json`.

## Business context and planning docs

The site is the public face of a software development company, shared with prospective clients. Audience: decision makers (CTOs, founders). Goal: conversion to contact (via WhatsApp `+356 9976 7916` or `info@devtoolsgroup.com`). Planning docs (read before related work):

- `docs/CONTENT_STRATEGY.md` — content roadmap and pending items.
- `docs/I18N_PLAN.md` — ES/EN architecture. **Implemented** with `next-intl` (see "i18n" section below).

### Pending Technical Validations & Tasks
- **Google Search Console**:
  - *When*: Once the web application is deployed to production under `https://devtoolsgroup.com`.
  - *How*:
    1. Go to Google Search Console (`search.google.com/search-console`) and add property as **Domain** (`devtoolsgroup.com`).
    2. Verify ownership by adding the provided TXT DNS record in your domain registrar (Cloudflare, Namecheap, GoDaddy, etc.).
    3. In the left menu, go to **Sitemaps** and submit `sitemap.xml`.
    4. Note: No need for separate country/subdomain properties; the single property handles both Colombia (`/es`) and Malta (`/en`) via the implemented `hreflang` tags.
- **Open Graph Social Image**: Pending creation/configuration of `opengraph-image.png` (1200x630) for social previews (WhatsApp, LinkedIn, Twitter).
- **Testimonios / Reviews (Comentado temporalmente)**: La sección `TestimonialsSection` se dejó comentada en `app/[locale]/page.tsx` para no mostrar reseñas ficticias. Pendiente recopilar testimonios reales y citas directas de clientes (ej. StayFresh / Enerlitica) con foto y rol antes de reactivarla.
- **Local SEO & Google Business Profile (Malta / Colombia)**: Once the legal registration in Malta is completed and physical/registered address is available:
  - Create and verify Google Business Profile (beneficial for local search visibility in Malta).
  - Add explicit corporate registration statement to `Footer.tsx` (e.g. *"Registered in Malta · Operations in Colombia & Remote"*).
  - Update full address details in `app/[locale]/layout.tsx` (JSON-LD schema).
- **Legal & GDPR Compliance (Malta / EU)**: Once the legal entity in Malta is registered:
  - Add Privacy Policy (`/privacidad` or `/privacy`) and Terms of Service pages specifying the data controller entity in Malta.
  - Link legal pages in `Footer.tsx` and near the contact form submission.
  - Implement cookie consent banner if third-party analytics/tracking scripts (e.g. Google Analytics) are added in the future.

Single package, pnpm only (`packageManager: pnpm@11.1.3`). `pnpm-workspace.yaml` contains only `allowBuilds` (denying `sharp`/`unrs-resolver` postinstall scripts) and no `packages:` key — it is not a monorepo, don't add workspace packages there.

## Commands

```bash
pnpm dev            # turbopack is the default bundler in Next 16; no flag needed
pnpm build          # runs the TypeScript check itself ("Running TypeScript ...")
pnpm lint           # bare `eslint` over the repo
pnpm exec tsc --noEmit   # fast standalone typecheck; there is NO `typecheck` script
```

- **Do not invent `pnpm test` / e2e steps; nothing is installed to run them.**
- Verify in order: `pnpm lint` → `pnpm build`. `tsc --noEmit` is only worth running standalone for a quicker type-only loop; `pnpm build` already covers it and is the real gate.
- There is no CI (`.github/` does not exist), so those local runs *are* the gate.

### `pnpm lint` warnings

`pnpm lint` passes with **0 errors** and 5 expected warnings (do not treat them as regressions):

- `app/[locale]/layout.tsx` — `no-page-custom-font` warning, caused by the Material Symbols `<link>` in `<head>`
- `app/[locale]/page.tsx` — `TestimonialsSection` unused import warning while the section is temporarily commented out
- `components/Header.tsx` and `components/Footer.tsx` — `@next/next/no-img-element` warnings on brand logo `<img>` tags

## Conventions

- **All UI copy lives in `messages/es.json` and `messages/en.json`** (see "i18n"). Never hardcode user-facing strings in components; add the key to **both** files. Spanish is the source/default language.
- **Install with `corepack pnpm ...`** if `pnpm` is not on PATH (Windows). Do not run `npm i` (it fails and the project is pnpm-only).
- **Tailwind v4, no `tailwind.config.js`.** Design tokens live in the `@theme` block in `app/globals.css`: `brand-lime/navy/deep/slate/border/light` plus `font-display`/`font-body`/`font-mono`. Add new tokens there, never in a config file. PostCSS runs via `@tailwindcss/postcss` (`postcss.config.mjs`).
- **Container/responsive idiom:** every section root is `max-w-[1240px] mx-auto px-4 sm:px-6` with mobile-first breakpoints (`text-3xl sm:text-6xl`, `py-14 sm:py-20`). Match it.
- **`"use client"` only where interactive** — currently just `Header.tsx` (mobile drawer) and `CtaSection.tsx`. Leave everything else as a server component.
- **Icons:** no icon package. Icons are Material Symbols Outlined, loaded by a raw `<link>` in `app/layout.tsx`, used as `<span className="material-symbols-outlined text-[18px]">east</span>`. Keep that pattern.
- **Content arrays live in `messages/*.json`** and are read with `t.raw("key") as Type[]`; the component maps them. Purely visual choices (badge colors, highlighted card index) stay in the component, indexed by position.

## i18n (next-intl)

- Locales `es` (default) and `en`, `localePrefix: "always"` → `/es`, `/en`. Config: `i18n/routing.ts`, `i18n/request.ts`, `i18n/navigation.ts`, plugin in `next.config.ts` (`output: "export"` static export into `out/`).
- App lives under `app/[locale]/` (`layout.tsx` renders `<html lang={locale}>`, per-locale metadata, hreflang alternates; `page.tsx` calls `setRequestLocale`). Root `app/layout.tsx` passes `children` through and `app/page.tsx` statically redirects `/` to `/es` or `/en` based on browser language.
- Server components: `await getTranslations("Namespace")`. Client components (`Header`, `CtaSection`, `LanguageSwitcher`): `useTranslations`. Rich text via `t.rich` with tags like `<strong>`.
- Internal links to pages use `Link` from `@/i18n/navigation`; section anchors stay plain `<a href="#id">` and ids are **not** translated.
- `components/LanguageSwitcher.tsx` (desktop header + mobile drawer) switches locale preserving the hash.

## SEO, Security & Contact

- Base domain configured in `lib/site.ts` (`SITE_URL = "https://devtoolsgroup.com"`).
- Contact channels: WhatsApp (`WHATSAPP_NUMBER = "35699767916"` in `lib/site.ts`, used by the form in `components/CtaSection.tsx`) and email (`info@devtoolsgroup.com`).
- `app/sitemap.ts` and `app/robots.ts` generate multilingual sitemap and robots rules with `hreflang` and `x-default`.
- Structured Data: `app/[locale]/layout.tsx` injects Schema.org JSON-LD (`ProfessionalService`) configured with Malta HQ and service areas covering Colombia, Malta, and the EU.
- Open Graph locales: configured per language (`es_CO` for Spanish / Colombia, `en_MT` for English / Malta).
- HTTP Security Headers: configured in `public/_headers` for Cloudflare Pages (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`).

## Anchor navigation is a cross-file contract

`Header`, `Footer`, and the Hero/CTAs link to `#servicios`, `#metodologia`, `#casos`, `#faq`, `#contacto` with plain `<a href="#...">` (not `<Link>` — intentional, it's same-page). The matching `id` sits on each section's root `<section>`. **Renaming or reordering a section `id` silently breaks nav** — update the nav in the same change.

Related offset coupling: `Header` is `fixed ... h-20` and `<main>` in `app/page.tsx` carries `pt-20` to compensate. Change one, change both.

Numbered eyebrow labels use `NN / UPPERCASE` in `font-mono` (`01 / CAPACIDADES TÉCNICAS`, `02 / METODOLOGÍA SDLC`, `03 / …`, `04 / …`).

## Traps

- `animate-in slide-in-from-top-2` on the mobile drawer (`components/Header.tsx`) are **`tailwindcss-animate` utilities that are not installed** — they emit nothing and the drawer just appears. Don't assume those classes work, and don't "fix" the drawer by assuming a plugin is present.
- `next-env.d.ts` and `.next/types/*` are generated and gitignored. Never edit or commit them; they're rewritten by `next dev` / `next build`.
- `next.config.ts` configures `next-intl` and `output: "export"` (static export to `out/` for Cloudflare Pages), with no experimental flags or cache components enabled. Turning on a flag is a real architectural change, not a tweak.
