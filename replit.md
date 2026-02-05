# Spanko - Kids Clothing E-commerce Store

## Overview

Spanko is a kids clothing e-commerce web application built with a React frontend and Express backend. The platform features a playful, kid-friendly aesthetic with product browsing, category navigation, and product detail pages. The app uses a modern full-stack TypeScript architecture with shared types between frontend and backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Fonts**: Fredoka (display) and DM Sans (body) for kid-friendly aesthetic
- **Build Tool**: Vite

### Backend Architecture
- **Framework**: Express 5 on Node.js
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful endpoints defined in shared/routes.ts with Zod validation
- **Storage**: Memory storage implementation (MemStorage class) with interface ready for database migration
- **Database Schema**: Drizzle ORM with PostgreSQL dialect configured but currently using in-memory storage

### Shared Code Pattern
- **Location**: `/shared` directory contains code used by both frontend and backend
- **Schema**: Drizzle ORM table definitions with Zod schemas for validation
- **Routes**: API route definitions with type-safe request/response schemas
- **Type Safety**: Full TypeScript types shared between client and server

### Data Models
- **Categories**: Hierarchical structure with parent-child relationships (Baby → Baby Girl → Dresses)
- **Products**: Standard e-commerce fields including price, original price (for sales), images, and flags for new/trending items

### Build System
- **Development**: tsx for TypeScript execution with Vite dev server
- **Production**: Custom build script using esbuild for server and Vite for client
- **Output**: Server bundles to dist/index.cjs, client to dist/public

## External Dependencies

### Database
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Connection**: Expects DATABASE_URL environment variable
- **Migrations**: drizzle-kit for schema migrations (output to /migrations)
- **Session Store**: connect-pg-simple available for session storage

### Frontend Libraries
- **UI Primitives**: Full suite of Radix UI components
- **Carousel**: embla-carousel-react for product sliders
- **Date Handling**: date-fns
- **Form Validation**: react-hook-form with @hookform/resolvers and Zod

### Development Tools
- **Replit Integration**: vite-plugin-runtime-error-modal, cartographer, and dev-banner plugins
- **Type Checking**: TypeScript with strict mode enabled

### Image Assets
- Product and category images use Unsplash placeholders where dynamic data isn't available