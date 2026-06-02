# 🚀 Next-Gen Learning Dashboard

A high-fidelity, futuristic Student Dashboard prototype built as part of a Frontend Intern Challenge. The app features a dark-mode Bento Grid layout, real-time Supabase data fetching via Next.js Server Components, and buttery-smooth Framer Motion animations.

**Live Demo:** [View on Vercel](https://front-end-intern-challenge.vercel.app)

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Database:** Supabase (PostgreSQL)
- **Icons:** Lucide React

---

## Architecture & Component Split

### Server Components vs Client Components

One of the key decisions was figuring out where to draw the line between server and client rendering.

**Server Components** are used for data fetching. The main `app/page.tsx` is a Server Component that queries Supabase directly — no API routes, no client-side fetching, no exposed credentials in the browser bundle. The data is fetched once on the server and passed down as props.

**Client Components** (`"use client"`) are used only where interactivity is needed:
- `Sidebar` and `MobileNav` — manage active tab state and navigation via URL query params
- `BentoGrid` — orchestrates staggered entrance animations with Framer Motion variants
- `CourseTile`, `HeroTile`, `ActivityTile` — handle hover spring physics and micro-interactions
- `ProgressBar` — animates from 0% to the fetched progress value on mount
- `NavItem` — uses Framer Motion's `layoutId` for the sliding active indicator

This split keeps the initial page load fast (server-rendered HTML with data already embedded) while still enabling rich client-side interactions.

### Bento Grid Layout

The dashboard uses CSS Grid with responsive breakpoints:
- **Desktop (>1024px):** 3-column grid, full sidebar
- **Tablet (768–1024px):** 2-column grid, sidebar auto-collapses to icons
- **Mobile (<768px):** Single column, sidebar becomes a bottom navigation bar

### Animation Strategy

All animations use `transform` and `opacity` exclusively to avoid triggering browser layout recalculations. Hover states use Framer Motion spring physics (`type: "spring", stiffness: 300, damping: 20`) for a natural, non-linear feel. The staggered page load uses `staggerChildren` to cascade tiles in sequentially.

### Error Handling

The app implements multiple layers of error handling:
- Pre-flight checks for missing Supabase credentials before any query runs
- Detection of empty query results (common when RLS policies aren't configured)
- A custom `error.tsx` boundary with a retry button and diagnostic details
- Skeleton loaders via `loading.tsx` that match the exact grid proportions to prevent layout shifts

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project

### 1. Clone the repo

```bash
git clone https://github.com/nitpatel678/frontEnd_InternChallenge.git
cd frontEnd_InternChallenge
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Set up the database

Run the following SQL in your Supabase project's **SQL Editor**:

```sql
CREATE TABLE courses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  progress integer NOT NULL CHECK (progress >= 0 AND progress <= 100),
  icon_name text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

INSERT INTO courses (title, progress, icon_name) VALUES
  ('Advanced React Patterns', 75, 'code'),
  ('UI/UX Design Fundamentals', 42, 'palette'),
  ('Machine Learning Basics', 28, 'brain'),
  ('System Design & Architecture', 90, 'database');
```

Then add a read policy so the app can access the data:

```sql
CREATE POLICY "Allow public read access"
ON courses FOR SELECT USING (true);
```

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
├── app/
│   ├── globals.css          # Design tokens, noise texture, skeleton animations
│   ├── layout.tsx           # Root layout with sidebar + Suspense boundaries
│   ├── page.tsx             # Server Component — fetches courses from Supabase
│   ├── loading.tsx          # Skeleton grid shown during data fetch
│   └── error.tsx            # Error boundary with retry and diagnostics
├── components/
│   ├── dashboard/
│   │   ├── bento-grid.tsx       # Staggered grid container
│   │   ├── hero-tile.tsx        # Welcome greeting + streak indicator
│   │   ├── course-tile.tsx      # Dynamic course card with progress bar
│   │   ├── activity-tile.tsx    # Contribution graph
│   │   ├── progress-bar.tsx     # Animated progress bar (spring physics)
│   │   ├── skeleton-grid.tsx    # Loading skeleton matching grid layout
│   │   └── dashboard-content.tsx # Tab-based content switcher
│   └── sidebar/
│       ├── sidebar.tsx          # Collapsible desktop/tablet sidebar
│       ├── mobile-nav.tsx       # Bottom navigation for mobile
│       └── nav-item.tsx         # Nav link with layoutId animation
├── lib/
│   ├── supabase.ts          # Supabase client initialization
│   └── icons.ts             # Dynamic Lucide icon resolver
├── types/
│   └── index.ts             # Course TypeScript interface
├── .env.example             # Required env vars template
└── README.md
```

---

## Deployment (Vercel)

1. Push your code to GitHub.
2. Import the repo on [Vercel](https://vercel.com).
3. Add environment variables (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in the Vercel project settings.
4. Deploy. Vercel auto-detects Next.js and handles the build.

---

## Challenges Faced

- **Hydration mismatch:** The activity contribution grid initially used `Math.random()` which produced different values on server vs client, breaking React hydration. Fixed by using a deterministic hash function based on grid coordinates.

- **Framer Motion + TypeScript:** Framer Motion's `Variants` type requires explicit typing when using spring physics — without it, TypeScript infers `type: "spring"` as a generic `string` instead of the expected literal union, causing build failures.

- **Supabase RLS:** By default, Supabase enables Row Level Security on new tables with no policies. This means the anon key returns 0 rows even when data exists. Added pre-flight detection in the data fetcher to surface this as a clear error message instead of silently rendering an empty dashboard.
