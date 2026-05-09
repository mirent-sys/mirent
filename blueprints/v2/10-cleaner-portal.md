# Module 10 — Cleaner portal

## Purpose
A simple, mobile-first task manager for cleaners.
Shows assigned cleaning tasks, unit details, urgency level,
and allows cleaners to mark tasks complete with photo proof.

## Users
- Cleaners (assigned by host or agent)

## UI screens

### Screen 1 — Task list
- List of assigned cleaning tasks today
- Per task: unit nickname, floor, urgency level, time window
- Urgency badges:
  - 🔴 URGENT — back-to-back booking (less than 4 hours gap)
  - 🟡 STANDARD — regular turnover
  - 🟢 FLEXIBLE — no immediate next booking
- Sorted by: urgency first, then time

### Screen 2 — Task detail
- Unit nickname + floor
- Previous guest checkout time
- Next guest check-in time (if applicable)
- Time window available for cleaning
- Checklist (customizable by host):
  - Change bed linens
  - Clean bathroom
  - Restock toiletries
  - Vacuum / mop floors
  - Check AC filters
  - Dispose of trash
  - Check for damages
  - Reset welcome items
- Photo upload: minimum 3 photos required before marking complete
  (bedroom, bathroom, living area)
- "Mark as complete" button (disabled until checklist + photos done)
- Notes field (for damage reports or missing items)

### Screen 3 — Damage / issue report
- Pre-populated with unit info
- Damage type: furniture, appliance, fixture, other
- Description field
- Photo upload (required)
- Severity: Minor / Major / Urgent
- Submitted to: host dashboard + agent

### Screen 4 — History
- Past completed tasks (last 30 days)
- Per task: date, unit, duration, completion photo thumbnail

## Urgency logic (system-driven)
- Back-to-back detected (gap < 4 hours) → URGENT auto-assigned
- Standard turnover (gap 4–24 hours) → STANDARD
- No next booking within 24 hours → FLEXIBLE

## Data this module needs
- Booking records (checkout times, check-in times)
- Back-to-back flags (from calendar module)
- Unit info (nickname, floor, checklist settings)
- Cleaner assignments (set by host)

## Data this module produces
- Task completion records (timestamp, photos)
- Damage/issue reports
- Cleaning duration logs
- Photo proof archive

## Connections to other modules
- Reads from: `06-booking-core-approval` (booking schedule)
- Reads from: `07-calendar-system` (back-to-back flags)
- Sends to: `03-host-portal-dashboard` (completion status, damage reports)
- Updates: `07-calendar-system` (teal → green on completion)

## What this module does NOT do
- Cannot view guest personal data
- Cannot modify bookings
- Cannot access host financial data
- No scheduling (host assigns, cleaner executes)

## Tech notes
- Framework: React.js (mobile-only layout)
- Photo upload: Cloudinary or AWS S3
- Minimum 3 photos enforced before task completion allowed
- Push notifications for new task assignments
- Offline mode: task list cached locally if no signal
- PWA installable on cleaner's phone

## Acceptance criteria
- [ ] Cleaner sees only own assigned tasks
- [ ] URGENT tasks appear at top with red badge
- [ ] "Mark complete" disabled until checklist + 3 photos uploaded
- [ ] Damage report triggers host notification immediately
- [ ] Calendar updates to green after task marked complete
- [ ] Cleaner portal works on low connectivity
- [ ] Task history accessible for last 30 days

## Status
🔲 Not started

## Assigned to
*(developer name here)*
