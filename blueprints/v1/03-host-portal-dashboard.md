# Module 03 — Host portal (dashboard)

## Purpose
The main control center for the host. Shows all active bookings,
alerts, unit statuses, and quick actions in one view.

## Users
- Host (local or foreign)

## UI screens

### Screen 1 — Dashboard home
- Summary cards: total units, active bookings today,
  pending approvals, units due for checkout today
- Watchdog alert panel (flagged bookings — V3)
- Recent activity feed (last 10 actions)
- Quick actions: Approve pending, View calendar, Add unit

### Screen 2 — Booking list view
- All bookings filterable by: unit, status, date range, agent
- Status labels: Pending / Confirmed / Checked in /
  Checked out / Cancelled
- Per booking row: unit, guest name (via agent),
  dates, amount reference, agent name, status
- Click booking → booking detail view

### Screen 3 — Booking detail view
- Full booking info
- Payment proof uploaded by agent (screenshot reference)
- "Confirm payment received" button (mandatory before confirming)
- Approve / Reject buttons
- Chat thread with agent (pre-approval)
- Chat thread with guest (post-approval via QR)
- Watchdog risk score (V3)
- Booking receipt (downloadable PDF)

### Screen 4 — Notifications panel
- All system alerts in one place
- Filterable by type: booking, payment, cleaner, watchdog
- Timezone-adjusted timestamps

## Data this module needs
- All bookings for host's units
- Agent profiles linked to host
- Cleaner task statuses
- Watchdog alerts (V3)

## Data this module produces
- Booking status updates (approve/reject)
- Payment confirmation records
- Host action logs (audit trail)

## Connections to other modules
- Reads from: `06-booking-core-approval`
- Reads from: `10-cleaner-portal` (cleaning statuses)
- Reads from: `15-ai-watchdog` (V3 alerts)
- Triggers: `12-receipt-generator`
- Triggers: notifications to agent and guest

## What this module does NOT do
- No direct payment processing
- No agent registration (that is module 08)
- No unit editing (that is module 02)

## Tech notes
- Framework: React.js
- Real-time updates: WebSocket or Supabase Realtime
- PDF generation: react-pdf or pdfmake
- Timezone display: date-fns-tz library
- Dashboard cards must load in under 1.5 seconds

## Acceptance criteria
- [ ] Dashboard shows correct summary counts
- [ ] Host can approve or reject a booking
- [ ] "Confirm payment received" is mandatory before approval
- [ ] Host can view and download booking receipt as PDF
- [ ] Notifications show correct timezone-adjusted time
- [ ] Mobile layout is fully functional
- [ ] Activity feed shows last 10 host actions

## Status
🔲 Not started

## Assigned to
*(developer name here)*
