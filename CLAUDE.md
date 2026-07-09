# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal developer portfolio for Serdar Arıcı — a bilingual (TR/EN) Next.js site showcasing projects, work experience, education, skills, certifications, and a contact form. Data is primarily sourced from Supabase; static fallback data exists in `src/data/` for projects.

## Commands

```bash
npm run dev      # Start dev server with Turbopack
npm run build    # Production build with Turbopack
npm start        # Serve the production build
npm run lint     # Run ESLint
```

## Tech Stack

- **Next.js 16** (App Router, React 19, TypeScript 5)
- **Tailwind CSS v4** + **DaisyUI v5** — utility-first styling with component layer
- **Supabase JS v2** — database reads via anon key (no auth required)
- **next-intl v4** — i18n routing and translations
- **Framer Motion v12** — animations in Client Components
- **Resend v6** — contact form email delivery via Server Action
- **Vercel Analytics** — injected in root layout

## Architecture

### Route Structure

All pages live under `src/app/[locale]/`. The `[locale]` segment is **always present** in the URL (`localePrefix: 'always'`). There is **no `middleware.ts`** — locale routing is handled by the `createNextIntlPlugin` wrapper in `next.config.ts`.

```
src/app/[locale]/
  layout.tsx           # Root layout: loads messages, wraps with NextIntlClientProvider
  page.tsx             # Home — renders HeroSection only
  about/page.tsx       # About — Server Component, parallel-fetches all Supabase data
  projects/page.tsx    # Projects list — Server Component, passes data to ProjectsClient
  projects/[slug]/     # Project detail — fetched by slug from Supabase
  contact/page.tsx     # Contact form — Client Component using sendEmail Server Action
  blogs/page.tsx       # Coming soon placeholder
```

### Server vs Client Component Split

Pages are Server Components responsible for data fetching. They pass fetched data as props to `*Client.tsx` Client Components that handle interactivity and animations.

- `ProjectsClient.tsx` — search/filter UI with AnimatePresence
- `ProjectDetailClient.tsx` — project detail view with gallery
- `ProjectCarousel.tsx`, `AboutHero.tsx` — animated about-page sections
- `ClientLayout.tsx` — wraps Navbar + main + Footer; conditionally hides Footer on the home route

### Data Layer

**Supabase client** is a singleton at `src/lib/supabase.ts` (anon key, public read).

**Query functions** in `src/lib/queries.ts`:
- `getExperiences()` → `experiences` table, ordered by `start_date DESC`
- `getEducation()` → `education` table, ordered by `start_date DESC`
- `getSkills()` → `skills` table, ordered by `order_index ASC`
- `getCertifications()` → `certifications` table, ordered by `issue_date DESC`
- `getFeaturedProjects()` → `projects` where `is_featured = true`, ordered by `order_index ASC` then `project_date DESC`

**Fallback**: `src/data/projectsData.ts` and `src/data/aboutData.ts` provide static data used if Supabase is unreachable.

### Supabase Schema

Inferred from `src/types/types.ts` and query files:

**`projects`** — `id`, `created_at`, `slug` (unique route key), `title`, `title_tr`, `category`, `category_tr`, `description`, `description_tr`, `short_description`, `short_description_tr`, `tech_stack` (string[]), `github_url`, `live_url`, `image_url`, `video_url`, `project_date`, `is_featured` (bool), `gallery` (string[]), `order_index`

**`experiences`** — `id`, `company_name`, `position`, `description` (string[]), `start_date`, `end_date` (nullable), `logo_url`, `location`

**`education`** — `id`, `title`, `institution`, `description` (string[]), `degree`, `department`, `gpa`, `location`, `start_date`, `end_date` (nullable)

**`skills`** — `id`, `title`, `items` (string[]), `order_index`

**`certifications`** — `id`, `title`, `issuer`, `issue_date`, `credential_id`, `credential_url`, `media_url`, `skills` (string[])

The `projects` table supports per-row Turkish translations via `*_tr` column variants. The `_tr` fields are accessed via `getLocalized()`.

## i18n

**Config files:**
- `src/i18n/routing.ts` — defines locales `['tr', 'en']`, `defaultLocale: 'tr'`
- `src/i18n/request.ts` — next-intl server config, loads `src/messages/{locale}.json`
- `next.config.ts` — wraps Next.js config with `createNextIntlPlugin('./src/i18n/request.ts')`

**Translation files:** `src/messages/tr.json` and `src/messages/en.json` — nested JSON keyed by page/section namespace (e.g., `projects.detail.back`, `about.hero.title`).

**Usage pattern:**
- Server Components: `getTranslations('namespace')` from `next-intl/server`
- Client Components: `useTranslations('namespace')` from `next-intl`
- Rich text (inline HTML): `t.rich('key', { white: (chunks) => <span>...</span> })`

**Database content localization:** Some Supabase fields have `_tr` variants. Use `getLocalized(obj, 'field', locale)` from `src/lib/utils.ts` to resolve the right value — returns `field_tr` when locale is `'tr'` and the value is non-empty, otherwise falls back to `field`.

**Navigation links:** Always import `Link`, `redirect`, `usePathname`, `useRouter` from `@/i18n/routing` (not `next/navigation`) to preserve the active locale in URLs.

## Styling Conventions

Colors are defined as CSS custom properties in `src/app/globals.css` under `@theme` (Tailwind v4) and `:root`, then mapped in `tailwind.config.js`:

| Token | Hex | Usage |
|---|---|---|
| `background` | `#0B0E18` | Page background |
| `background2` | `#141A2E` | Secondary background |
| `card` | `#151928` | Card/panel backgrounds |
| `primary` | `#3B82F6` | Buttons, links, accents |
| `secondary` | `#00A3FF` | Hover/lighter accent |
| `foreground` | `#FFFFFF` | Default text |

Use `bg-background`, `bg-card`, `text-primary`, etc. as Tailwind classes. Avoid hardcoding hex values.

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
RESEND_API_KEY=
```

The Supabase hostname `mihaohgymgoiopgvpgep.supabase.co` is whitelisted in `next.config.ts` for `next/image`.
