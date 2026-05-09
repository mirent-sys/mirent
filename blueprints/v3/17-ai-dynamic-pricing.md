# Module 17 — AI dynamic pricing

## Purpose
Suggests optimal nightly rates to hosts based on demand,
seasonality, competitor data, and unit performance.
Host always has final control — suggestions only, never auto-applied.

## Users
- Host (reviews and applies suggestions)
- System (generates suggestions)

## How it works

### Data inputs for pricing model
- Unit's own historical booking rate (occupancy %)
- Day of week patterns (weekends vs weekdays)
- Philippine public holidays calendar
- Local events (auto-detected from web — future)
- Seasonal demand (Christmas, Holy Week, summer)
- Current market comparison (similar units nearby — future)
- Watchdog risk score average (high-risk bookings = adjust)
- Days until check-in (last-minute discount logic)

### Suggestion types
- Base rate adjustment: "+12% recommended this weekend"
- Holiday surge: "Holy Week — recommended +25%"
- Low demand alert: "Unit has 0 bookings next 2 weeks —
  consider -10% to attract bookings"
- Last-minute fill: "3 days to check-in, still vacant —
  suggest -15% for quick fill"

## UI screens

### Screen 1 — Pricing dashboard (host portal)
- Current base rate per unit
- AI suggestion badge: recommended rate + reason
- "Apply suggestion" button (one click)
- "Customize" option (manual override)
- Pricing history chart (last 90 days)
- Occupancy rate graph

### Screen 2 — Pricing rules manager
- Existing manual rules (weekend surcharge, holiday surcharge)
- Option: "Let AI manage weekend pricing" (toggle)
- Option: "Let AI manage holiday pricing" (toggle)
- Manual override always available

### Screen 3 — Seasonal pricing calendar
- Color-coded calendar showing rate per day
- Darker = higher rate
- AI suggestions overlaid as recommendation dots
- Host can click any date to manually set rate

## Data this module needs
- Booking history per unit
- Occupancy data
- Current pricing rules
- Philippine holiday calendar
- Watchdog scores (optional weight)

## Data this module produces
- Pricing suggestions (per unit, per date range)
- Suggestion acceptance/rejection log (for model improvement)
- Occupancy analytics

## Connections to other modules
- Reads from: `06-booking-core-approval` (booking history)
- Reads from: `07-calendar-system` (occupancy data)
- Reads from: `15-ai-watchdog` (risk-adjusted inputs)
- Feeds into: `02-host-portal-unit-setup` (if host applies suggestion)
- Feeds into: `04-agent-portal-calendar` (suggested price visible to agents)

## What this module does NOT do
- Never auto-applies pricing without host approval
- Does not set prices for other hosts
- Does not access competitor host data (V3)
- Does not guarantee occupancy

## Tech notes
- V3: rule-based + weighted formula model
- V5: ML-trained on Mirent's own historical data
- Holiday calendar: pre-loaded JSON, updated annually
- Chart library: Recharts or Chart.js
- Suggestion generation: background job, runs nightly

## Acceptance criteria
- [ ] Suggestions display per unit with clear reason
- [ ] Host can apply suggestion in one click
- [ ] Manual override always available regardless of AI suggestion
- [ ] Pricing history chart shows last 90 days
- [ ] Occupancy rate displays correctly
- [ ] Seasonal calendar shows rate per day
- [ ] AI toggle for weekend/holiday pricing works correctly
- [ ] Suggestion acceptance/rejection logged for model feedback

## Status
🔲 Not started

## Assigned to
*(developer name here)*
