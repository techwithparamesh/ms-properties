# Dream Dwellings Real Estate Website - Design Guidelines

## Design Approach
**Reference-Based Approach**: Inspired by Housing.com and PropertyWala's clean property showcase layouts and intuitive filtering systems. These platforms excel at presenting property information clearly while maintaining visual appeal and professional credibility.

## Core Design Principles
1. **Trust & Professionalism**: Real estate requires credibility - clean layouts, professional imagery, and clear information hierarchy
2. **Content-First**: Property details, high-quality images, and essential information take precedence
3. **Intuitive Navigation**: Easy filtering and browsing experience for property discovery
4. **Mobile-First**: Responsive design ensuring seamless experience across all devices

## Color Palette

**Primary Colors:**
- Primary Blue: #3B82F6 (Trust, professionalism - buttons, links, key CTAs)
- Secondary Green: #10B981 (Success states, verified badges, positive actions)
- Accent Amber: #F59E0B (Highlights, featured tags, attention-drawing elements)

**Neutrals:**
- Background: #F8FAFC (Soft grey - page backgrounds, card containers)
- Text: #1E293B (Slate - primary text content)
- Pastel Accent: #E0E7FF (Light lavender - subtle backgrounds, hover states)

**Usage Guidelines:**
- Primary blue for all primary CTAs, navigation active states, and property action buttons
- Green for success messages, verified properties, and "Available" status
- Amber sparingly for "Featured" badges and urgent CTAs
- Pastel lavender for card hover states and subtle section backgrounds

## Typography

**Font Families:**
- **Primary**: Inter (body text, UI elements, forms)
- **Display**: Poppins (headings, hero text, property titles)

**Type Scale:**
- Hero Headings: 3xl-5xl (Poppins Bold)
- Section Headings: 2xl-3xl (Poppins SemiBold)
- Property Titles: xl-2xl (Poppins Medium)
- Body Text: base-lg (Inter Regular)
- Captions/Labels: sm (Inter Medium)

## Layout System

**Spacing Primitives**: Tailwind units of 4, 6, 8, 12, 16, 20 for consistent rhythm
- Component padding: p-6, p-8
- Section spacing: py-12, py-16, py-20
- Card gaps: gap-6, gap-8
- Element margins: mb-4, mb-6, mb-8

**Grid System:**
- Property cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Dashboard listings: grid-cols-1 lg:grid-cols-2
- Feature sections: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Blog previews: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

**Container Widths:**
- Main content: max-w-7xl
- Forms/Dashboards: max-w-6xl
- Blog posts: max-w-4xl

## Component Library

**Navigation:**
- Fixed top navigation with logo left, menu center, CTA right
- Mobile hamburger menu with slide-in drawer
- Active states using primary blue with bottom border

**Property Cards:**
- Image carousel at top (aspect-ratio-4/3)
- Property type badge (Apartment/Villa/etc.) in amber
- Title, location, price (₹ INR format)
- Key specs icons (beds, baths, area in sq.ft)
- "View Details" button in primary blue
- Hover: Subtle scale and pastel lavender background glow

**Filters Panel:**
- Sticky sidebar on desktop, collapsible drawer on mobile
- Dropdown selectors for City (Tirupati)
- Multi-select checkboxes for property types
- Range slider for price filtering
- Area input with autocomplete
- "Apply Filters" button in primary blue

**Forms:**
- Clean input fields with border-slate-300
- Focus states with primary blue ring
- Label above input pattern
- Error states in red-500
- Success states in green (secondary)
- Image upload with drag-drop zone

**Buttons:**
- Primary: bg-blue-500 hover:bg-blue-600 (white text)
- Secondary: border-blue-500 text-blue-500 hover:bg-blue-50
- Success: bg-green-500 hover:bg-green-600
- On images: backdrop-blur-md with semi-transparent backgrounds

**Statistics Section:**
- Four columns with large icons (Lucide/Heroicons)
- Animated counters for numbers
- Icons in primary blue, numbers in large Poppins font
- Light pastel backgrounds for each stat card

**Testimonials:**
- Card-based carousel with client photo, quote, name, designation
- Star ratings in amber
- Subtle shadow and rounded corners
- Navigation dots in primary blue

**Blog Cards:**
- Featured image at top
- Category badge in amber
- Title, excerpt (2-3 lines)
- "Read More" link in primary blue
- Author/date metadata

**Property Detail Page:**
- Large image gallery with thumbnails
- Sticky sidebar with price, quick specs, contact form
- Tabbed sections: Overview, Amenities, Location (Google Maps)
- Agent contact card with WhatsApp/Call buttons

**Dashboard:**
- Clean table layout for property management
- Action buttons (Edit/Delete) with icons
- "Add New Property" prominent CTA in amber
- Status badges (Active/Pending) in appropriate colors

## Images

**Hero Section:**
- Large, high-quality hero image showing modern properties/skyline
- Overlay gradient (dark at bottom) for text readability
- City selector and quick filters overlaid on hero
- Dimensions: Full viewport height on desktop, 70vh on mobile

**Property Listings:**
- Professional property photography (exterior, interior, amenities)
- Consistent 4:3 aspect ratio for all property cards
- Minimum 3-5 images per property in gallery
- High resolution for detail pages

**Blog Section:**
- Featured images for each blog post
- Real estate themed stock photography (homes, keys, families)
- 16:9 aspect ratio for blog cards

**General Imagery:**
- Authentic, location-specific images where possible (Tirupati landmarks)
- Avoid overly staged/stock feeling photos
- Professional quality, well-lit, sharp images
- Include lifestyle shots showing people enjoying properties

## Animations

**Use Sparingly:**
- Smooth page transitions (fade-in on load)
- Card hover effects (subtle scale: scale-105)
- Statistic number counters (on scroll into view)
- Image gallery transitions
- Filter panel slide-in/out
- No distracting background animations or complex effects

## Accessibility
- Maintain WCAG AA contrast ratios
- Keyboard navigation for all interactive elements
- Aria labels for icon-only buttons
- Focus indicators visible and clear
- Responsive images with proper alt text