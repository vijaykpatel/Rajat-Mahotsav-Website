# NJ Rajat Mahotsav 2026

A Next.js 15 application for the Shree Swaminarayan Temple Secaucus Rajat Mahotsav celebration event (July 29 - August 2, 2026). This website provides event information, registration, scheduling, media galleries, and seva (service) submission features.

## Overview

This is a portfolio project showcasing a modern, full-featured event website built with Next.js, React, TypeScript, and various modern web technologies. The website serves as the digital platform for a major religious celebration event.

## Key Features

- **Event Registration** - Multi-step registration form with form validation and Supabase backend
- **Admin Dashboard** - Protected admin portal with Google OAuth authentication for registration management
- **Interactive Schedule** - Dynamic timeline view with mobile and desktop variants
- **Media Galleries** - Image carousels and video players with custom controls
- **Seva Submission** - Forms for spiritual and community service contributions
- **Background Audio System** - Auto-playing prayer audio with fade controls
- **Responsive Design** - Fully responsive with mobile-first approach
- **Animations** - Smooth scroll animations using Framer Motion, GSAP, and Locomotive Scroll
- **CDN Integration** - Cloudflare R2 and Cloudflare Images for optimized asset delivery

## Tech Stack

### Core
- **Next.js 15** - React framework with App Router
- **React 18** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first styling

### UI Components
- **shadcn/ui** - Accessible component library
- **Radix UI** - Unstyled component primitives
- **Framer Motion** - Animation library
- **GSAP** - Advanced animations
- **Locomotive Scroll** - Smooth scrolling

### Forms & Validation
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **react-phone-number-input** - International phone input
- **react-day-picker** - Date selection
- **chrono-node** - Natural language date parsing

### Backend & Storage
- **Supabase** - Backend as a service (PostgreSQL database, Google OAuth authentication, Row Level Security)
- **Cloudflare R2** - Object storage
- **Cloudflare Images** - Image optimization and delivery
- **AWS SDK** - S3-compatible operations for R2

### Additional Libraries
- **Lucide React** - Icon library
- **Sonner** - Toast notifications
- **Embla Carousel** - Touch-friendly carousels
- **Canvas Confetti** - Celebration effects

## Project Structure

```
.
├── app/                          # Next.js app router pages
│   ├── admin/                    # Admin portal (protected)
│   │   └── registrations/        # Registration management dashboard
│   ├── api/                      # API routes
│   ├── auth/                     # Authentication callback handlers
│   ├── registration/             # Event registration
│   ├── schedule/                 # Event schedule
│   ├── community-seva/           # Community service
│   ├── spiritual-seva/           # Spiritual service
│   └── guest-services/           # Guest services
├── components/                   # React components (Atomic Design)
│   ├── atoms/                    # Basic building blocks
│   ├── molecules/                # Simple composites
│   ├── organisms/                # Complex sections
│   ├── templates/                # Page layouts
│   └── ui/                       # shadcn/ui components
├── contexts/                     # React contexts
├── hooks/                        # Custom React hooks
├── lib/                          # Utility functions and data
├── utils/                        # Helper utilities
│   └── supabase/                 # Supabase client utilities (client, server, middleware)
├── docs/                         # Documentation and migration files
├── styles/                       # Theme CSS files (registration, admin, community)
└── middleware.ts                 # Next.js middleware for auth session refresh
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Cloudflare account with R2 and Images configured

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vijaykpatel/Rajat-Mahotsav-Website.git
   cd Rajat-Mahotsav-Website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create `.env.local` in the project root with your Supabase and Cloudflare R2 credentials

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Variables

Create `.env.local` in the project root with:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `R2_ENDPOINT` - Cloudflare R2 endpoint
- `R2_ACCESS_KEY_ID` - R2 access key
- `R2_SECRET_ACCESS_KEY` - R2 secret key
- `R2_BUCKET_NAME` - R2 bucket name
- `R2_BUCKET_PREFIX` - Prefix for R2 uploads

## Development

### Available Scripts

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Component Organization

This project follows Atomic Design principles:

- **Atoms** (`components/atoms/`) - Basic UI elements (loading screens, theme providers)
- **Molecules** (`components/molecules/`) - Simple component combinations (cards, inputs, pickers)
- **Organisms** (`components/organisms/`) - Complex UI sections (navigation, forms, galleries)
- **Templates** (`components/templates/`) - Page-level layouts
- **UI** (`components/ui/`) - shadcn/ui components (maintained separately for updates)

### Styling

- Uses Tailwind CSS with custom configuration
- Custom color palette with preset colors
- Custom spacing variables for consistent layout
- Font variables for typography (Figtree, Instrument Serif, Gujarati fonts)

## Security

This project implements several security best practices:

- **Google OAuth Authentication** - Domain-restricted admin access via Supabase Auth
- **Row Level Security (RLS)** - Database-level access control for registrations data
- **Domain Validation** - Admin routes verify user email domains before granting access
- URL validation and allowlisting for file downloads
- Sanitized user input handling
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- Environment variable protection
- No hardcoded secrets
- Open redirect prevention in auth callbacks

### Important Security Notes

⚠️ **Before deploying to production:**

1. **Configure Supabase RLS Policies** - Row Level Security is enabled; verify policies match your domain requirements
2. **Set Admin Domains** - Update `lib/admin-auth.ts` with your allowed admin email domain
3. **Add Rate Limiting** - Implement rate limiting to prevent abuse
4. **Enable CSRF Protection** - Add CSRF tokens to forms
5. **Add Input Validation** - Server-side validation for all user inputs
6. **File Upload Security** - Validate file types and sizes server-side

See `docs/SUPABASE_GOOGLE_OAUTH_SETUP.md` for OAuth configuration and the security audit report for detailed recommendations.

## Architecture Highlights

### Global State Management
- **LoadingProvider** - Manages global loading states
- **AudioProvider** - Controls background audio playback
- **ThemeProvider** - Light mode only (forced theme)

### CDN & Asset Management
- Cloudflare R2 for static assets
- Cloudflare Images for responsive image delivery
- Helper functions for consistent asset URLs

### Data Sources
- Timeline data in `lib/timeline-data.ts`
- CDN asset paths in `lib/cdn-assets.ts`
- Supabase for dynamic data storage

## Admin Portal

The admin portal (`/admin/registrations`) provides a secure dashboard for managing event registrations.

### Features

- **Google OAuth Authentication** - Domain-restricted sign-in via Supabase Auth
- **Dashboard Statistics** - Animated stat cards showing registration metrics, peak attendance, and daily arrivals
- **Interactive Charts** - Visualizations for arrivals by date, Ghaam distribution, and Mandal breakdown
- **Registrations Table** - Paginated, sortable table with filtering and search capabilities:
  - Full-text search across names, email, and phone
  - Filters for Ghaam, Mandal, Country, age range, and date ranges
  - CSV export with chunked streaming for large datasets
  - Keyset pagination for performance
- **Row Level Security** - Database-level access control restricted to authorized admin domains

### Authentication Flow

1. Users sign in via Google OAuth at `/admin/registrations`
2. Auth callback at `/auth/callback` validates the user's domain
3. Authorized users (matching allowed domain) access the dashboard
4. Unauthorized users are redirected to `/admin/registrations/unauthorized`

### Admin Configuration

Admin access is restricted by email domain. The allowed domain is configured in `lib/admin-auth.ts`. To change the allowed domain, update the `ALLOWED_DOMAIN` constant.

See `docs/SUPABASE_GOOGLE_OAUTH_SETUP.md` for detailed OAuth configuration instructions.

## Deployment

This project is configured for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

## Contributing

This is a portfolio/showcase project. Feel free to fork and adapt for your own use.

## License

This project is provided for portfolio and educational purposes. See LICENSE file for details.

## Acknowledgments

- Built with [v0.app](https://v0.app) for rapid prototyping
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Shree Swaminarayan Temple Secaucus for the event inspiration

## Contact

For questions about this project or employment opportunities:

**Vijay Patel**
- GitHub: [@vijaykpatel](https://github.com/vijaykpatel)

---

**Note:** This is a portfolio project showcasing modern web development practices. The event details and functionality are specific to the NJ Rajat Mahotsav 2026 celebration.
