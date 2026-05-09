# Module 05 — Booking core (hold system)

## Purpose
Manages the unit hold process — from initiation to expiry or
conversion to a booking submission. First-hold-wins rule enforced server-side.

## Users
- Agent (initiates hold)
- System (manages timer and expiry)
- Host (can see all active holds)

## Hold flow
1. Agent selects unit + dates → clicks "Hold"
2. System checks: is unit available for those dates?
3. If yes → hold created, timer starts (duration set by host, default 2 hours)
4. If no → "Unit already on hold" message shown to agent
5. At 15 minutes remaining → notification sent to agent
6. At 0 → hold auto-released, unit returns to vacant
7. Agent can manually release hold early
8. Agent converts hold → booking submission (goes to module 06)

## Rules
- First-hold-wins: only one hold per unit per date range at a time
- Agent can hold maximum 3 units simultaneously (host-configurable)
- Re-hold attempts limited to 2 per unit per day per agent
- Hold duration: configurable by host (default 2 hours, min 30 min)

## Data this module needs
- Unit availability (real-time)
- Agent ID and hold count
- Host hold settings per unit

## Data this module produces
- Hold record: unit ID, dates, agent ID, start time, expiry time, status
- Hold event logs (for audit trail)
- Notifications (to agent at 15-min warning, to host on new hold)

## Connections to other modules
- Reads from: `07-calendar-system`
- Reads from: `04-agent-portal-calendar`
- Sends to: `06-booking-core-approval` (on submission)
- Updates: `07-calendar-system` (yellow = on hold)
- Triggers: notification system

## What this module does NOT do
- Does not confirm bookings (that is module 06)
- Does not collect payment
- Does not communicate with guest

## Tech notes
- Hold timer must be server-side (Redis or DB-based countdown)
- Use database transaction to prevent race conditions
  (two agents clicking hold simultaneously)
- WebSocket push for real-time calendar color update
- Hold expiry job: cron or queue worker (BullMQ recommended)

## Acceptance criteria
- [ ] Two agents cannot hold same unit/dates simultaneously
- [ ] Timer is server-controlled and accurate
- [ ] 15-minute warning notification fires reliably
- [ ] Expired hold auto-releases and calendar updates instantly
- [ ] Agent cannot exceed maximum simultaneous holds
- [ ] Re-hold limit enforced per agent per unit per day
- [ ] Hold records stored with full audit trail

## Status
🔲 Not started

## Assigned to
*(developer name here)*
