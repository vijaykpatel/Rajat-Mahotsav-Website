# Component Structure - Atomic Design

This project follows the Atomic Design methodology for organizing components.

## Structure

### `/atoms`
Basic building blocks - smallest, reusable components
- `loading-screen.tsx` - Loading state indicator
- `regular_logo.tsx` - Logo component
- `scroll-to-top.tsx` - Scroll to top button
- `theme-provider.tsx` - Theme context wrapper
- `typewriter.tsx` - Typewriter text effect

### `/molecules`
Simple component groups combining atoms
- `guru-card.tsx` - Card for guru display
- `iphone-mock.tsx` - iPhone mockup wrapper
- `lazy-date-picker.tsx` - Lazy-loaded date picker
- `lazy-phone-input.tsx` - Lazy-loaded phone input
- `progress-counter.tsx` - Animated counter
- `registration-date-picker.tsx` - Registration-specific date picker
- `TimelineGridTile.tsx` - Timeline grid item
- `vertical-countdown.tsx` - Vertical countdown timer
- `video-carousel-buttons.tsx` - Video carousel controls
- `video-carousel-dots.tsx` - Video carousel indicators

### `/organisms`
Complex UI sections combining molecules and atoms
- Navigation components (header, navigation, desktop-navigation, tubelight-navigation, floating-menu-button)
- Content sections (title-section, text-section-1/2/3, animated-text-section)
- Media components (video-section, aashirwad-video-player, image-marquee, image-carousel-modal)
- Carousels (guru-carousel, mobile-section-carousel)
- Forms (seva-submission-form)
- Layout (sticky-footer, shader-background, standard-page-header)
- Galleries (responsive-image-gallery)
- Timeline (MobileTimeline)
- Features (bento-initiatives, path-of-service-story)

### `/templates`
Page-level layouts (currently empty - add as needed)

### `/ui`
shadcn/ui components - maintained separately for easy updates

## Usage

Import from index files for cleaner imports:

```tsx
// Instead of
import LoadingScreen from '@/components/atoms/loading-screen'
import GuruCard from '@/components/molecules/guru-card'

// Use
import { LoadingScreen } from '@/components/atoms'
import { GuruCard } from '@/components/molecules'
```
