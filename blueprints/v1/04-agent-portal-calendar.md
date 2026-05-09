# Module 04 — Agent portal (calendar view)

## Purpose
Allows verified agents to browse unit availability and
initiate the booking hold process. Read-only after booking confirmed.

## Users
- Verified agents only (must be approved by host)

## UI screens

### Screen 1 — Agent dashboard
- Agent name, tier badge (Standard / Trusted)
- Commission summary (current month)
- Active holds with countdown timers
- Pending bookings awaiting host approval
- Quick link: Browse calendar

### Screen 2 — Calendar view
- Same color-coded calendar as public portal
- Additionally shows: hold timers, pending bookings
- Agent can click on vacant date → initiate hold
- Cannot see other agents' hold details (only own)
- Pricing suggestion visible (AI — V3)

### Screen 3 — Unit detail (agent view)
- Unit type, floor, tower
- Available dates
- Base price (visible to agents only, not public)
- Weekend / holiday surcharge info
- "Hold this unit" button

### Screen 4 — Active holds list
- All current holds by this agent
- Countdown timer per hold
- "Submit booking" or "Release hold" buttons
- Warning at 15 minutes remaining

## Data this module needs
- Unit availability data (from calendar module)
- Agent profile and tier status
- Hold records (own only)
- Pricing rules per unit

## Data this module produces
- Hold records (unit + dates + agent ID + timestamp)
- Booking submissions (feeds into approval module)

## Connections to other modules
- Reads from: `07-calendar-system`
- Reads from: `02-host-portal-unit-setup` (pricing)
- Sends to: `05-booking-core-hold`
- Sends to: `06-booking-core-approval`

## What this module does NOT do
- Cannot approve own bookings
- Cannot see other agents' bookings or commissions
- Cannot access guest personal data after booking confirmed
- Cannot modify unit settings or pricing

## Tech notes
- Framework: React.js
- Hold timer: server-side countdown (not client-side)
  to prevent manipulation
- Calendar: shared component with public portal
  but with agent-specific data layer
- Session timeout: 30 minutes idle

## Acceptance criteria
- [ ] Agent can only access after host approval
- [ ] Calendar shows correct availability in real-time
- [ ] Hold timer is server-controlled (not manipulable)
- [ ] 15-minute warning notification fires correctly
- [ ] Agent cannot see other agents' hold details
- [ ] Pricing is visible to agent but not on public portal
- [ ] "Submit booking" is disabled until hold is active

## Status
🔲 Not started

## Assigned to
*(developer name here)*
