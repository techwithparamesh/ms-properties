# Dream Dwellings - Real Estate Website

## Overview
Dream Dwellings is a modern, fully responsive real estate website built with React (TypeScript), Vite, and Tailwind CSS. The platform serves properties in Tirupati with comprehensive property management features.

## Project Status
- **Current State**: MVP Complete - All phases implemented
- **Last Updated**: October 2025

## Tech Stack
- **Frontend**: React with TypeScript, Vite, Tailwind CSS
- **Backend**: Express.js with TypeScript
- **Storage**: In-memory storage (MemStorage)
- **State Management**: TanStack Query (React Query)
- **Routing**: Wouter
- **UI Components**: Shadcn UI, Radix UI
- **Forms**: React Hook Form with Zod validation

## Core Features

### 1. Property Listing System
-- Advanced filtering by city (Tirupati), area, property type, and price range
- Property types: Apartments, Villas, Penthouses, Independent Houses, Lands
- Detailed property pages with image galleries, amenities, and Google Maps integration
- INR pricing format throughout

### 2. Property Management Dashboard
- Add new properties through responsive forms
- View all property listings in organized cards
- Edit and delete property functionality
- Featured property marking

### 3. Blog System
- Blog listing page with preview cards
- Individual blog post pages with full content
- Category-based organization
- Author and date metadata

### 4. Interactive Home Page
- Hero section with city selector and area filters
- Featured properties carousel
- Statistics section with animated counters
- Testimonials slider
- Blog previews
- Contact form with validation
- Embedded Google Map

## Design System

### Color Palette
- **Primary**: #3B82F6 (Professional Blue) - CTAs, navigation, buttons
- **Secondary**: #10B981 (Success Green) - Success states, verified badges
- **Accent**: #F59E0B (Warm Amber) - Featured badges, urgent CTAs
- **Background**: #F8FAFC (Soft Grey) - Page backgrounds
- **Text**: #1E293B (Slate) - Primary text
- **Pastel**: #E0E7FF (Light Lavender) - Subtle backgrounds, hover states

### Typography
- **Primary Font**: Inter (body text, UI elements)
- **Display Font**: Poppins (headings, hero text, property titles)

### Design Principles
- Mobile-first responsive design
- 16px spacing system
- Card-based property displays
- Smooth animations and transitions
- Professional UI with pastel accents
- Housing.com/PropertyWala inspired layouts

## Project Structure

### Pages
- `/` - Home page with hero, search, featured properties, stats, testimonials, blogs, contact
- `/properties` - Property listing page with filters
- `/property/:id` - Property detail page with gallery, amenities, map
- `/dashboard` - Property management dashboard
- `/blogs` - Blog listing page
- `/blog/:id` - Individual blog post page

### Data Models

#### Property
- Title, description, city, area, property type
- Price (INR), bedrooms, bathrooms, sqft
- Images array, amenities array
- Latitude/longitude for maps
- Status (available, sold, pending)
- Featured flag

#### Blog
- Title, excerpt, content
- Category, author, date
- Featured image

## API Routes (To Be Implemented)
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get single property
- `POST /api/properties` - Create property
- `PATCH /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get single blog

## Recent Changes
- October 2025: Initial project setup with complete frontend implementation
- Configured design system with custom color palette (#3B82F6 primary, #10B981 green, #F59E0B amber)
- Built all React components and pages with Poppins/Inter fonts
- Implemented responsive navigation with dark mode toggle
- Created property and blog schemas with full type safety
- Implemented all backend API endpoints with validation
- Added seed data for properties and blogs
- Integrated frontend with backend using React Query
- Implemented contact form with backend submission
- Added proper loading states and error handling

## Implemented Features
✅ Home page with hero, search, featured properties, statistics, testimonials, blog previews, contact form
✅ Properties listing with advanced filters (city, area, type, price)
✅ Property detail pages with image gallery, amenities, and Google Maps
✅ Dashboard for property management (CRUD operations)
✅ Blog system with listing and detail pages
✅ Responsive navigation with dark mode toggle
✅ Form validation using Zod
✅ API integration with React Query
✅ In-memory storage with seed data

## Next Steps
- Add property image upload functionality
- Implement advanced search with map view
- Add user authentication for property management
- Add blog creation/editing in dashboard
- Implement property comparison feature
