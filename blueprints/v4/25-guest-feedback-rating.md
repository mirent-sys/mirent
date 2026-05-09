# Module 25 — Guest feedback and rating system

## Purpose
Collects post-stay feedback from guests to help hosts
improve their properties and identify problem patterns.
Also feeds into the AI Watchdog for agent accountability tracking.

## Users
- Guest (submits feedback via QR portal after checkout)
- Host (reads feedback, responds)
- Agent (sees own rating summary — limited)
- System (aggregates for watchdog and reports)

## Feedback trigger
- Automatically prompted 1 hour after guest checkout confirmation
- Guest receives notification via QR portal (if still active)
  or via contact number (SMS) — optional opt-in
- Feedback window: open for 48 hours after checkout
- After 48 hours: feedback form closes, no late submissions

## Feedback form (guest-facing)

### Section 1 — Unit rating
- Overall experience: ⭐ 1–5 stars
- Cleanliness: ⭐ 1–5 stars
- Accuracy (unit matched description): ⭐ 1–5 stars
- Value for money: ⭐ 1–5 stars

### Section 2 — Agent rating
- Agent responsiveness: ⭐ 1–5 stars
- Agent helpfulness: ⭐ 1–5 stars
- Would you book through this agent again? (Yes / No)

### Section 3 — Written feedback (optional)
- "Anything you'd like to share about your stay?"
- Max 500 characters
- Profanity filter applied before storage

### Section 4 — Issue report (optional)
- "Did you experience any problems?" (Yes / No)
- If yes: problem type (dropdown) + description
- This triggers a separate alert to host (not part of rating)

## Rating display

### Host view
- Per unit: average rating (all time + last 30 days)
- Per agent: average agent rating
- Individual feedback entries (with guest name hidden — privacy)
- Trend chart: rating over time
- Low rating alerts: if unit drops below 3.5 average → host notified

### Agent view (Trusted agents only)
- Own average agent rating (last 30 days)
- "Would book again" percentage
- No access to individual feedback entries

### Public portal (future — V5)
- Aggregate unit rating shown publicly
- Individual reviews not shown publicly in V4

## Privacy rules
- Guest name not shown to host or agent
  (booking reference shown instead)
- Written feedback anonymized before display
- Guest contact not stored in feedback record
- Agent cannot see individual feedback about themselves
  (aggregate only)

## Watchdog integration
- Consistent low agent ratings (below 3.0 for 3+ bookings) →
  flag sent to watchdog (module 15)
- Consistent low cleanliness ratings →
  flag sent to host + cleaner module (module 10)
- Guest reports issue → separate alert (not rating-related)

## Data this module needs
- Completed booking record (checkout confirmed)
- Guest contact (for SMS notification — optional)
- Agent assignment for booking

## Data this module produces
- Rating records per booking (unit + agent scores)
- Written feedback (anonymized)
- Issue reports (linked to booking)
- Aggregate rating scores per unit and agent
- Watchdog flag triggers (if thresholds breached)

## Connections to other modules
- Triggered by: `09-guest-qr-portal` (checkout confirmation)
- Feeds into: `15-ai-watchdog` (low rating flags)
- Feeds into: `10-cleaner-portal` (cleanliness flag)
- Feeds into: `03-host-portal-dashboard` (feedback panel)
- Feeds into: `20-revenue-reports` (rating trends)

## What this module does NOT do
- Does not publish reviews publicly in V4
- Does not allow host to edit or delete guest feedback
- Does not reveal guest identity to host or agent
- Does not allow agent to respond to feedback in V4

## Tech notes
- Feedback form: mobile-first, loads via QR portal session
- Star rating: react-stars or custom SVG component
- SMS notification: Semaphore (Philippines) or Twilio
- Profanity filter: bad-words npm library or custom list
- Feedback storage: append-only, no edits after submission
- Aggregate scores: pre-calculated nightly via cron job
- 48-hour window: server-side expiry on feedback token

## Acceptance criteria
- [ ] Feedback prompt triggers 1 hour after checkout confirmation
- [ ] Feedback form closes after 48 hours automatically
- [ ] All 4 unit rating categories save correctly
- [ ] Agent rating saves and links to correct agent
- [ ] Written feedback stored anonymized
- [ ] Guest name not visible to host or agent
- [ ] Low rating threshold triggers watchdog flag correctly
- [ ] Host sees aggregate rating per unit in dashboard
- [ ] Trusted agent sees own aggregate rating only
- [ ] Issue report triggers separate host alert (not in rating)
- [ ] Profanity filter applied before storage

## Status
🔲 Not started

## Assigned to
*(developer name here)*
