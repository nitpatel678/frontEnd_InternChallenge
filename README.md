# Next-Gen Learning Dashboard 🚀

A premium, futuristic dark-mode Student Dashboard built with **Next.js 15 (App Router)**, **Supabase**, **Tailwind CSS v4**, and **Framer Motion**. Optimized for responsive layouts, hardware-accelerated micro-animations, and instant server-side data fetching.

---

## 🎨 Architectural Decisions

### 1. Server vs. Client Component Split (Hybrid Pattern)
- **Server Components (RSC)**: Used for primary routing and data fetching (`app/page.tsx`). Fetching course info directly from Supabase securely on the server avoids unnecessary API endpoints and maximizes SEO and page speeds.
- **Client Components**: Used for interactive dashboard cards, layout indicators, and the collapsible sidebars where user interaction state (active tabs, collapsible sidebar, springs) is needed.

### 2. Zero Layout Shifts & Shimmers
- We engineered custom skeletal layout containers (`components/dashboard/skeleton-grid.tsx`) that align to the exact columns of the Bento Grid. 
- Integrated pulsing background gradient shimmers using CSS animations for maximum hardware rendering efficiency.

### 3. Spring Physics Motion Design
- Every hover interaction scales tiles dynamically by `1.02` with custom spring presets (`stiffness: 300`, `damping: 20`), providing realistic, fluid animations.
- Nav item shifts utilize Framer Motion's `layoutId` layout animations for smooth background transitions.

---

## 📁 Folder Structure

```
student-dashboard/
├── app/
│   ├── globals.css         # Styling system & customized animations
│   ├── layout.tsx          # Font optimization, metadata, sidebar shell
│   ├── loading.tsx         # Streaming skeleton loaders
│   ├── error.tsx           # Error mitigation boundary
│   └── page.tsx            # RSC Supabase data fetch
├── components/
│   ├── sidebar/
│   │   ├── sidebar.tsx     # Desktop / Tablet auto-collapsible nav
│   │   ├── mobile-nav.tsx  # Mobile navigation bar
│   │   └── nav-item.tsx    # Dynamic individual layoutId navigations
│   └── dashboard/
│       ├── bento-grid.tsx  # Bento layouts, staggered entrants
│       ├── hero-tile.tsx   # Premium hero greeting
│       ├── course-tile.tsx # Course card with dynamic icons
│       ├── activity-tile.tsx# Interactive learning activity tracker
│       ├── progress-bar.tsx# Smooth load-in progress bars
│       └── skeleton-grid.tsx# Layout-stabilized skeletons
├── lib/
│   ├── supabase.ts         # Supabase initializations
│   └── icons.ts            # Lucide icon dynamically mapped resolver
├── types/
│   └── index.ts            # Type safety interfaces
```

---

## ⚡ Setup & Installation

### 1. Clone the project
Navigate into your terminal directory and open the workspace.

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root of the project (reference `.env.example`):
```env
NEXT_PUBLIC_SUPABASE_URL=https://zecujkphpornsuhdmjqb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_publishable_anon_key
```

### 4. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view your dashboard.

---

## 🗄️ Supabase SQL Database Schema

Execute the following SQL command in your Supabase project's **SQL Editor** to create the `courses` table and seed it with courses matching our resolver icon tags:

```sql
-- Create Courses Table
create table courses (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  progress integer not null check (progress >= 0 and progress <= 100),
  icon_name text not null,
  created_at timestamp with time zone default now()
);

-- Seed Dynamic Course Rows
insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns', 75, 'code'),
  ('UI/UX Design Fundamentals', 42, 'palette'),
  ('Machine Learning Basics', 28, 'brain'),
  ('System Design & Architecture', 90, 'database');
```

---

## ☁️ Vercel Deployment Steps

Deploying your project to **Vercel** is simple and secure:

1. Push your code repository to **GitHub / GitLab / Bitbucket**.
2. Sign in to [Vercel](https://vercel.com) and click **Add New > Project**.
3. Import your repository.
4. Expand the **Environment Variables** section and paste your:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click **Deploy**. Vercel will automatically run build pipelines, configure edge caching, and serve your app globally.
