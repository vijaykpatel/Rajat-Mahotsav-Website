# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NJ Rajat Mahotsav landing page - a Next.js 15 application for the Shree Swaminarayan Temple Secaucus celebration event (July 29 - August 2, 2026). Features include registration, scheduling, media galleries, and seva (service) submissions.

## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting (currently disabled during builds)
npm run lint
```

## Architecture

### Component Organization - Atomic Design

Components follow strict atomic design principles in `/components`:

- **atoms/** - Basic primitives (loading-screen, theme-provider, typewriter, scroll-to-top)
- **molecules/** - Simple composites (guru-card, date-picker, phone-input, countdown timers)
- **organisms/** - Complex sections (navigation, carousels, forms, galleries, timeline)
- **templates/** - Page layouts (currently minimal)
- **ui/** - shadcn/ui components (separate for easy updates)

Import from index files when available for cleaner imports.

### App Structure (Next.js 15 App Router)

```
app/
├── page.tsx              # Main landing page
├── layout.tsx            # Root layout with providers
├── globals.css           # Global styles and CSS variables
├── registration/         # Event registration
├── schedule/             # Event schedule
├── community-seva/       # Community service submissions
├── guest-services/       # Guest services info
├── spiritual-seva/       # Spiritual service info
└── api/download/         # File download API
```

### Global Providers (Nested in layout.tsx)

1. **LoadingProvider** - Global loading state management
2. **AudioProvider** - Background audio control with fade effects
3. **ThemeProvider** - Forced to light mode for this project

All pages have persistent Navigation, StickyFooter, ScrollToTop, FloatingMenuButton, and AudioPlayer.

### State Management

- **Context API** for audio state (`contexts/audio-context.tsx`)
- **Custom Hooks** in `/hooks`:
  - `use-audio.ts` - Audio playback controls
  - `use-device-type.ts` - Device detection
  - `use-intersection-observer.ts` - Scroll-based animations
  - `use-loading.tsx` - Loading state provider
  - `use-toast.ts` - Toast notifications

### Data & Assets

- **CDN Assets** (`lib/cdn-assets.ts`):
  - Cloudflare R2 for static assets: `https://cdn.njrajatmahotsav.com`
  - Cloudflare Images for dynamic images with variants (bigger, mobileWP, biggest)
  - Use `getCloudflareImage()`, `getCloudflareImageMobileWp()`, `getCloudflareImageBiggest()` helpers

- **Timeline Data** (`lib/timeline-data.ts`) - Event schedule and timeline information

- **Supabase** (`utils/supabase/client.ts`) - Backend for form submissions and data storage
  - Requires `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`

### Styling

- **Tailwind CSS v4** with custom configuration
- **Custom Font Variables**:
  - `--font-figtree` (default sans)
  - `--font-instrument-serif` (decorative)
  - `--font-gujarati` (Gujarati text)

- **Custom Color Palette** (preset-*):
  - Navy shades: `preset-deep-navy`, `preset-navy-accent`, `preset-zodiac-blue`
  - Neutrals: `preset-light-gray`, `preset-stone`, `preset-pale-gray`
  - Accents: `preset-red`, `preset-bluish-gray`

- **Custom Spacing Variables**:
  - `--page-header-spacing`
  - `--page-title-description-spacing`
  - `--page-bottom-spacing`

- **Animations**: Uses framer-motion (optimized via Next.js config), GSAP, and locomotive-scroll

### UI Component Libraries

- **shadcn/ui** (New York style, RSC-enabled) in `components/ui/`
- **Radix UI** primitives for accessibility
- **Custom registries** available:
  - `@magicui` (https://magicui.design)
  - `@aceternity` (https://ui.aceternity.com)
  - `@skiper-ui` (https://skiper-ui.com)

### Forms

- **react-hook-form** with **zod** validation
- **react-phone-number-input** for phone fields
- **react-day-picker** with date-fns for date selection
- **chrono-node** for natural language date parsing

### Important Configurations

- **Build Flags** (next.config.mjs):
  - `eslint.ignoreDuringBuilds: true`
  - `typescript.ignoreBuildErrors: true`
  - `images.unoptimized: true`
  - Optimized imports for framer-motion

- **Path Aliases** (tsconfig.json):
  - `@/components` → `/components`
  - `@/lib` → `/lib`
  - `@/hooks` → `/hooks`
  - `@/contexts` → `/contexts`
  - `@/utils` → `/utils`

## Key Features

1. **Background Audio System** - Auto-playing prayer audio with fade controls and user consent
2. **Responsive Navigation** - Desktop nav with mobile floating menu
3. **Media Galleries** - Image carousels, video players with custom controls
4. **Event Registration** - Multi-step forms with Supabase backend
5. **Interactive Timeline** - Event schedule with mobile/desktop variants
6. **Shader Effects** - Paper Design shaders for visual effects
7. **Scroll Animations** - Intersection observer based reveals and GSAP animations

## Development Notes

- This project was originally built with v0.app and synced to this repository
- Theme is forced to light mode (`forcedTheme="light"` in ThemeProvider)
- Audio requires user consent before playing (browser autoplay policy)
- All images should use Cloudflare CDN helpers for optimization
- Component imports should prefer index file imports when available
