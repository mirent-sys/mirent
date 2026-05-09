# Module 15 — AI Watchdog V1

## Purpose
Automated risk scoring and anomaly detection system.
Monitors all bookings, agents, and patterns to flag suspicious
activity before it becomes a problem for the host.

## Users
- Host (sees alerts and risk scores)
- Agent (sees own risk rating — limited view)
- System (runs continuously in background)

## What the Watchdog monitors

### Booking-level monitoring
- Unusual booking speed (hold-to-submit under 5 minutes)
- Payment proof submitted is low resolution or cropped
- Same guest contact used across multiple agents
- Booking amount significantly below unit's normal rate
- Last-minute bookings (within 12 hours of check-in)
- Repeat cancellations by same agent (3+ in 30 days)

### Agent-level monitoring
- High cancellation rate (above 20% in 30 days)
- Multiple cold referral certifications in a row
- Unusual booking volume spike (3x normal in one week)
- Agent booking same unit repeatedly for short stays
- Commission disputes or chargebacks (future module)

### Property-level monitoring
- Back-to-back bookings with no cleaning confirmation
- Guest overstay detected (checkout time passed, no confirmation)
- Unit booked during host-set blocked period (system error catch)

## Risk scoring system
- Each booking gets a score: 0–100
  - 0–30: Low risk (green)
  - 31–60: Medium risk (yellow) — host notified
  - 61–100: High risk (red) — host alerted, booking flagged

## Risk score factors (weighted)
| Factor | Weight |
|--------|--------|
| Agent trust tier (Trusted = lower risk) | 20% |
| Accountability certification type | 20% |
| Payment proof quality | 15% |
| Booking speed | 10% |
| Guest history (new vs returning) | 10% |
| Agent cancellation rate | 10% |
| Time to check-in (last-minute = higher risk) | 10% |
| Blacklist proximity match | 5% |

## Watchdog visibility tiers
- Host: sees all flags, all scores, all agents
- Trusted agent: sees own score only
- Standard agent: no score visibility
- Guest: no visibility
- Cleaner: no visibility

## UI — Host watchdog panel (inside dashboard)
- Risk score badge per booking (color-coded)
- Alert feed: newest flags at top
- Per alert: flag type, severity, booking ID, recommended action
- Host actions: Dismiss / Investigate / Auto-reject future similar
- Weekly watchdog summary report (email + in-app)

## Data this module needs
- All booking records and history
- Agent profiles and history
- Payment proof metadata (from module 11)
- Fraud flags (from module 11)
- Cleaner task completion records
- Calendar data (overstay detection)

## Data this module produces
- Risk score per booking
- Agent trust score (ongoing, updates after each booking)
- Watchdog alert records
- Weekly summary report data

## Connections to other modules
- Reads from: `06-booking-core-approval`
- Reads from: `11-anti-fraud-blacklist`
- Reads from: `10-cleaner-portal`
- Reads from: `07-calendar-system`
- Feeds into: `03-host-portal-dashboard` (alert panel)
- Feeds into: `17-ai-dynamic-pricing` (risk-adjusted pricing)

## What this module does NOT do
- Does not automatically reject bookings
- Does not contact guests directly
- Does not replace host judgment
- No biometric or ID verification (future module)

## Tech notes
- ML model: start with rule-based scoring (V3),
  upgrade to trained model (V5)
- Risk score calculation: runs on booking submission
  and updates on each status change
- Background jobs: cron-based monitoring every 15 minutes
- Weekly report: scheduled job every Monday 8AM host timezone
- Score storage: append-only (history preserved)

## Acceptance criteria
- [ ] Every booking receives a risk score on submission
- [ ] High-risk bookings trigger immediate host alert
- [ ] Agent trust score updates after each completed booking
- [ ] Watchdog panel shows correct color-coded scores
- [ ] Weekly summary report generates and delivers correctly
- [ ] Host can dismiss false-positive flags with reason logged
- [ ] Overstay detection fires when checkout time passes
- [ ] All watchdog logs are immutable

## Status
🔲 Not started

## Assigned to
*(developer name here)*
