# Module 07 — Calendar system

## Purpose
The shared availability calendar used across all portals.
Single source of truth for unit availability.
Each portal sees the same data with different permission layers.

## Users
- Public (read-only, limited info)
- Agent (read + hold initiation)
- Host (read + full control)
- System (writes booking/hold/clean status)

## Color coding system
| Color | Status | Visible to |
|-------|--------|-----------|
| 🟢 Green | Vacant | All |
| 🔴 Red | Booked (confirmed) | All |
| 🟡 Yellow | On hold | Agent (own), Host (all) |
| 🔵 Blue | Pending approval | Agent (own), Host |
| 🟠 Orange | Checkout day | Host, Cleaner |
| 🩵 Teal | Cleaning window | Host, Cleaner |
| ⬜ Gray | Blocked by host | All (no reason shown publicly) |

## Views
- Month view (default)
- Week view
- Day view (split-day for back-to-back bookings)

## Split-day logic
- If Unit A checks out at 12PM and new guest checks in at 2PM:
  → Morning half of day = Orange (checkout)
  → Afternoon half = Teal (cleaning window)
  → If cleaning done before 2PM → Green briefly → then new booking Red

## Back-to-back detection rule
- If gap between checkout and next check-in is less than 4 hours
  → Auto-flag as back-to-back
  → Cleaner urgency level set to URGENT automatically

## Smart date picker rules
- User selects duration first, then start date
- System auto-calculates: check-in 2:00 PM, checkout 12:00 PM
- Unavailable dates are grayed out and unclickable
- Extension check: if guest requests extension,
  system checks if next booking allows it

## Data this module needs
- All booking records and statuses
- Hold records and timers
- Blocked date ranges (host-set)
- Cleaner task statuses

## Data this module produces
- Availability state per unit per date (real-time)
- Back-to-back flags
- Extension eligibility flags

## Connections to other modules
- Read by: `01-public-portal`
- Read by: `04-agent-portal-calendar`
- Read by: `03-host-portal-dashboard`
- Updated by: `05-booking-core-hold`
- Updated by: `06-booking-core-approval`
- Updated by: `10-cleaner-portal`

## Tech notes
- Recommended library: FullCalendar (React version)
- Calendar state: server-driven (not local state)
- Real-time sync: WebSocket or Supabase Realtime
- Shared component: one calendar component,
  permission layer injected via props
- Mobile: swipeable month navigation

## Acceptance criteria
- [ ] Calendar reflects correct status in real-time
- [ ] Color codes are accurate across all portals
- [ ] Split-day view renders correctly for back-to-back
- [ ] Back-to-back detection triggers cleaner urgency
- [ ] Blocked dates show as gray with no reason publicly
- [ ] Smart date picker enforces duration-first selection
- [ ] Extension eligibility check works correctly
- [ ] Calendar is performant with 50+ units loaded

## Status
🔲 Not started

## Assigned to
*(developer name here)*
