# Decision 003 — React + Node.js as primary tech stack

## Date
2025

## Status
Accepted

## Context
Mirent needs a frontend-heavy platform with 5 different portals,
real-time calendar updates, and mobile-first design.
The founder is non-technical and needs to hire developers
from Philippine and international freelance markets.

## Decision
- Frontend: React.js (with Vite)
- Backend: Node.js (with Express or Fastify)
- Database: PostgreSQL
- Real-time: Supabase Realtime or WebSockets
- Hosting: TBD (Vercel for frontend, Railway or Render for backend)
- Language: JavaScript / TypeScript throughout

## Reasons
- Single language (JS) across frontend and backend —
  easier to hire one developer who can do both
- React has the largest developer pool in the Philippines
- PostgreSQL is free, reliable, and fits relational booking data
- Supabase provides real-time + auth + storage in one
  (reduces infrastructure complexity for V1)

## Consequences
- Larger talent pool for hiring
- Consistent codebase easier for founder to understand
- TypeScript adds initial overhead but prevents bugs long-term
- Node.js is not ideal for heavy computation
  (watchdog AI scoring may need separate service in V5)

## Alternatives considered
- Next.js — considered, may adopt for public portal (SEO benefit)
- Python/Django backend — rejected (separate language from frontend)
- Laravel/PHP — rejected (smaller modern talent pool)
- Vue.js — rejected (smaller ecosystem than React)
