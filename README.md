# PushNPull
Contributor: Alexa Quintero

A step-by-step workout web app for beginner SDSU students at the ARC Express.

Contributors: Jania Little, Sunny Suarez

## Getting started

1. Install [Node.js 22](https://nodejs.org/), then:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root (it's git-ignored, so ask a teammate for the values,
   found in Supabase under **Project Settings → API**):

   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

3. Set up the database (only once per Supabase project). In the Supabase dashboard open
   **SQL Editor**, paste and run `supabase/migrations/20261007000000_initial_schema.sql`,
   then `supabase/seed.sql`. Both are safe to run again.

4. Run it:

   ```bash
   npm run dev     # http://localhost:5173
   npm test        # unit tests (Vitest)
   npm run lint
   ```

## How the app is organized

| Path | What's there |
| --- | --- |
| `src/App.jsx` | Every page and its URL |
| `src/pages/` | Login, Onboarding, Home (my plan), Workout (step-by-step), ExerciseBrowser |
| `src/auth/` | Who is signed in + their profile (`useAuth()`) |
| `src/lib/api.js` | All Supabase queries |
| `src/lib/plan.js` | Picks a routine and adjusts sets/reps/rest for the user's goal and equipment (tested in `plan.test.js`) |
| `supabase/` | Database schema, security rules and starter exercises/routines |

User flow: **Sign up → Onboarding (goal, experience, days per week, equipment) → My plan → Start a workout → one exercise at a time.**

## Deploying (Vercel)

1. On vercel.com, **Add New → Project** and import this GitHub repo (Vercel detects Vite).
2. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under **Environment Variables**, then deploy.
3. In Supabase, **Authentication → URL Configuration**: set **Site URL** to the Vercel URL so
   confirmation emails link to the live site.

`vercel.json` makes page refreshes work on routes like `/workout/1`.

## Not built yet (good next steps)

- Logging sets, reps and weights during a workout (`workout_sessions` exists; add a `session_sets` table)
- History tab and progress charts
- Recommended weights based on past sessions
- Rest timer, exercise images/videos
- Pulling extra exercises from an external fitness API

## Project overview

+Purpose 
This document defines the functional and non-functional requirements for the proposed beginner workout web application. It establishes a clear understanding between stakeholders, developers, and end users of what the system is expected to accomplish. The design, implementation, and testing activities will be derived and validated against the requirements.

+Scope

The system will provide a web application that integrates fitness APIs to guide beginner San Diego State University (SDSU) students at the Aztec Recreation Center (ARC) Express with personalized workout routines and automated progress logging. The scope includes user onboarding, goal-based workout routine selection, step-by-step exercise tracking, session logging, and history viewing. Out-of-scope features include advanced powerlifting analytics, automated posture recognition/computer vision, social messaging, and live personal trainer booking. 

+Tech Stack 

Frontend: React (Vite), JavaScript, CSS
Backend & Database: Supabase (PostgreSQL Database & Supabase Auth)
Deployment/Version Control: GitHub with continuous integration via GitHub Actions

+Asssumptions

● The  users have internet access.
● SDSU students have sufficient basic digital literacy to navigate a web browser.
● The Users have access to a smartphone or mobile device with active internet access while inside the SDSU ARC Express.
●The system operates in the US Pacific Time (PT) for all schedules.
●All Workout plans, and exercises will be maintained by the development team.
●Users should have access to basic(dumbells, mat, resistance bands) or gym equipment.
●The system is only single-user sessions.

+Dependencies

● Supabase (auth, database, storage)
● Supabase Postgres (onboarding, log session, history, NFR)
●HTML/CSS/Javascript (frontend)
●Supabase Postgres (user profiles, progress tracking, and workout history)
●Host(Vercel,Github, or Cloudflare pages)

