# Next-Gen Learning Dashboard — Submission

Hey! Thanks for taking the time to look at my submission for the Frontend Intern Challenge. I had a blast building this. I wanted to make sure it wasn't just another boring, static dashboard, so I focused heavily on smooth physics-based animations, clean responsive grids, and solid server-side data loading.

**Live Demo:** [https://front-end-intern-challenge.vercel.app/](https://front-end-intern-challenge.vercel.app/)

---

## ⚡ Quick Start (To run it locally)

If you want to run it on your machine, here is the quick rundown:

### 1. Clone & Install
```bash
git clone https://github.com/nitpatel678/frontEnd_InternChallenge.git
cd frontEnd_InternChallenge
npm install
```

### 2. Set up Supabase Table
In your Supabase project, open the **SQL Editor** and run this to create the table and seed some initial courses:

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

*Crucial step:* Make sure you add a select policy so the client can read the rows, or just disable RLS on the `courses` table for testing:
```sql
CREATE POLICY "Allow public read access" 
ON courses FOR SELECT USING (true);
```

### 3. Env Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Boot it up!
```bash
npm run dev
```
Head over to `http://localhost:3000`.

---
