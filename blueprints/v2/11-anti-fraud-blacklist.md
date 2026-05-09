# Module 11 — Anti-fraud V1 + blacklist system

## Purpose
Protect hosts and agents from bad guests, fraudulent bookings,
and payment scams. First layer of defense before AI Watchdog (V3).

## Users
- Host (manages blacklist, sees fraud flags)
- Agent (sees warnings, cannot override)
- System (auto-flags based on rules)

## Fraud flag triggers (automatic)

### Booking-level flags
- Agent selected "unverified referral" in accountability certification
- Payment proof submitted is a known duplicate (hash match)
- Same guest name + contact booked and cancelled 2+ times in 30 days
- Booking submitted within 5 minutes of hold creation (suspicious speed)
- Back-to-back bookings by same agent for same unit (unusual pattern)

### Payment-level flags
- Screenshot metadata shows edited/modified image
- Payment timestamp on screenshot does not match booking date
- Amount on screenshot does not match agreed booking amount

### Guest-level flags
- Guest contact number matches a blacklisted entry
- Guest name + contact combo matches a previously flagged booking

## Blacklist system

### Who can add to blacklist
- Host only (agents cannot add)
- Host can blacklist: guest name + contact, agent (deactivate)

### Blacklist record fields
- Name
- Contact number
- Reason (scam / no-show / property damage / other)
- Added by (host name)
- Date added
- Linked booking ID (reference)

### Blacklist enforcement
- When agent submits booking: system checks guest contact vs blacklist
- If match found → booking blocked, agent sees warning message
- Agent cannot override blacklist — must contact host
- Host can whitelist (remove from blacklist) with reason logged

## UI screens

### Screen 1 — Fraud alerts panel (host dashboard integration)
- List of bookings with active fraud flags
- Per flag: flag type, severity (Low / Medium / High), booking ID
- Host actions: Dismiss / Investigate / Reject booking

### Screen 2 — Blacklist manager (host portal)
- Search blacklist by name or contact
- Add new entry form
- Remove entry (with reason required)
- Export blacklist as CSV

### Screen 3 — Agent warning (agent portal)
- Non-dismissable warning banner if guest is blacklisted
- "This guest is on the host's blacklist. Booking blocked."
- Contact host button

## Data this module needs
- Booking submissions (for flag checks)
- Payment proof files (for duplicate/metadata check)
- Blacklist database
- Previous booking history

## Data this module produces
- Fraud flag records (per booking)
- Blacklist entries
- Flag dismissal logs (audit trail)

## Connections to other modules
- Hooks into: `06-booking-core-approval` (pre-submission check)
- Feeds into: `03-host-portal-dashboard` (fraud alert panel)
- Feeds into: `15-ai-watchdog` (V3 — flag data used for AI training)
- Reads from: `05-booking-core-hold` (speed flag)

## What this module does NOT do
- No AI scoring (that is V3 Watchdog)
- No legal action — flags only, host decides
- No public sharing of blacklist

## Tech notes
- Image hash check: MD5 or SHA-256 on uploaded payment screenshots
- Image metadata check: ExifTool or Sharp library (Node.js)
- Blacklist check: runs as middleware on booking submission
- All flag checks must complete in under 500ms

## Acceptance criteria
- [ ] Blacklisted guest contact blocks booking automatically
- [ ] Agent sees non-dismissable warning on blacklisted guest
- [ ] Duplicate payment screenshot detected and flagged
- [ ] Host can add/remove blacklist entries with audit log
- [ ] Fraud flags visible in host dashboard
- [ ] Host can dismiss false-positive flags with reason
- [ ] All fraud checks complete before booking submission allowed
- [ ] Blacklist exportable as CSV

## Status
🔲 Not started

## Assigned to
*(developer name here)*
