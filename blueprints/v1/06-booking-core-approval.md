# Module 06 — Booking core (approval flow)

## Purpose
Manages the full booking lifecycle from agent submission
through host approval to guest confirmation.

## Users
- Agent (submits booking)
- Host (approves or rejects)
- Guest (receives confirmation via QR)
- System (generates receipt, triggers notifications)

## Booking flow
1. Agent submits booking from active hold
2. Agent must complete accountability certification before submit
3. System creates booking record with status: Pending
4. Host receives notification of new booking
5. Host reviews booking details + payment proof
6. Host clicks "Confirm payment received" (mandatory step)
7. Host approves → status: Confirmed
   OR host rejects → status: Rejected + reason
8. On approval:
   - Agent notified
   - Guest QR generated and sent (via agent to guest)
   - Cleaner notified if back-to-back detected
   - Receipt generated
9. Post-approval: agent access becomes read-only

## Agent accountability certification
Before submitting, agent must select one of:
- "I personally know this guest"
- "I verified guest identity via video call"
- "Guest referred by [name] — I vouch for them"
- "I acknowledge the risk of unverified referral"

This selection is recorded permanently in booking record.

## Anti-fraud enforcements in this module
- Payment proof upload required before submission
- "Do not trust screenshot alone" warning shown to host
- Mandatory 24-hour cooling period on any refund requests
- Cold referral auto-flag if agent selected unverified option

## Data this module needs
- Hold record (from module 05)
- Agent profile + certification choice
- Payment proof (uploaded file)
- Guest basic info (name, contact — entered by agent)

## Data this module produces
- Booking record (full details, permanent)
- Agent certification record (permanent, legal trail)
- Guest QR token (unique per booking)
- Booking receipt (PDF)
- Notification events

## Connections to other modules
- Reads from: `05-booking-core-hold`
- Sends to: `09-guest-qr-portal` (QR token)
- Sends to: `12-receipt-generator`
- Sends to: `10-cleaner-portal` (if back-to-back)
- Updates: `07-calendar-system` (red = booked)
- Triggers: `15-ai-watchdog` risk check (V3)

## What this module does NOT do
- Does not process payment
- Does not manage cleaner tasks (that is module 10)
- Does not handle post-stay disputes (future module)

## Tech notes
- Booking record is immutable after confirmation
  (append-only log for audit)
- QR token: JWT with booking ID, expiry, unit ID
- Back-to-back detection: query for bookings
  where checkout date = next booking check-in date
- PDF receipt: auto-generated on confirmation

## Acceptance criteria
- [ ] Agent cannot submit without accountability certification
- [ ] Payment proof upload is required field
- [ ] Host sees "Confirm payment received" before approve button
- [ ] Booking status updates in real-time for all parties
- [ ] QR token generated and delivered on approval
- [ ] Agent access becomes read-only after host approval
- [ ] Back-to-back bookings trigger cleaner urgency notification
- [ ] Refund requests enforce 24-hour cooling period
- [ ] Cold referral flag visible to host in booking detail

## Status
🔲 Not started

## Assigned to
*(developer name here)*
