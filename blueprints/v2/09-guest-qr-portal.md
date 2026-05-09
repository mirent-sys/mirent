# Module 09 — Guest QR portal

## Purpose
A mobile-first, no-login portal accessible via unique QR code.
Gives the guest everything they need for their stay — check-in info,
house rules, emergency contacts, extension requests, and checkout.

## Users
- Guest (anonymous, access via QR token only)

## How guest gets access
1. Host approves booking
2. System generates unique QR token (JWT, expires at checkout)
3. Agent delivers QR to guest (via chat, SMS, or printed)
4. Guest scans QR → lands on guest portal (no login needed)

## UI screens

### Screen 1 — Welcome / check-in page
- Unit nickname + floor/tower (no exact unit number)
- Check-in time confirmation
- Checkout time reminder
- Host welcome message (custom, set by host)
- House rules (collapsible)
- Emergency contacts (building admin, host agent)

### Screen 2 — Stay info
- Wifi name + password
- Parking instructions (if applicable)
- Amenities list
- Building rules summary
- Nearest hospital / convenience store (host-entered)

### Screen 3 — Extension request
- Current checkout time displayed
- "Request extension" button
- Guest enters: new checkout time, reason (optional)
- System checks: is next booking blocking extension?
- If clear → request sent to host for approval
- If blocked → "Extension not available" message shown
- Status tracker: Pending / Approved / Rejected

### Screen 4 — Checkout confirmation
- Checklist for guest before leaving:
  - Return keys / keycards
  - Remove personal items
  - Turn off AC and lights
- "I have checked out" button
- Timestamp recorded on submission
- Thank you message from host

### Screen 5 — Emergency panel
- Tap-to-call: Agent contact
- Tap-to-call: Building admin/security
- Tap-to-call: Emergency services (911 / local)
- Hospital nearest to property (host-entered address)
- "Report an issue" form → sends alert to host and agent

## QR token rules
- One unique token per booking (cannot be reused)
- Token expires automatically at checkout time
- Token is invalidated if booking is cancelled
- Token does not contain guest personal data
- Token cannot be used to access any other booking

## Data this module needs
- Booking record (dates, unit, check-in/out times)
- Host welcome message and house rules
- Emergency contacts (set by host per unit)
- Extension eligibility (from calendar module)

## Data this module produces
- Checkout confirmation timestamp
- Extension requests
- Issue reports
- Guest interaction logs (anonymized)

## Connections to other modules
- Reads from: `06-booking-core-approval` (booking details)
- Reads from: `07-calendar-system` (extension eligibility)
- Sends to: `03-host-portal-dashboard` (extension requests, issues)
- Triggers: `10-cleaner-portal` on checkout confirmation

## What this module does NOT do
- No login or registration required
- No payment collection
- No access to other bookings or guest data
- No permanent guest account created

## Tech notes
- Framework: React.js (mobile-first, PWA-ready)
- QR: generated using `qrcode` npm library
- Token: JWT signed with booking ID + expiry
- No auth middleware — token IS the authentication
- Fully functional on slow mobile data (3G minimum)
- Offline fallback: cache house rules and emergency contacts locally

## Acceptance criteria
- [ ] QR token works without login
- [ ] Token expires correctly at checkout time
- [ ] Extension request checks calendar before allowing submission
- [ ] Checkout confirmation records timestamp correctly
- [ ] Emergency contacts are tap-to-call on mobile
- [ ] Portal loads on slow mobile connection (under 3 seconds on 3G)
- [ ] Token cannot access data from other bookings
- [ ] Cancelled booking token shows "This booking is no longer active"

## Status
🔲 Not started

## Assigned to
*(developer name here)*
