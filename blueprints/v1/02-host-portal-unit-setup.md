# Module 02 — Host portal (unit setup)

## Purpose
Allows the host to add, configure, and manage their rental units inside Mirent.
This is the first thing a host does after onboarding.

## Users
- Host (local or foreign, accessing remotely)

## UI screens

### Screen 1 — Unit list
- List of all units owned by host
- Per unit: tower, floor, unit type, status (active/inactive)
- "Add new unit" button
- "Edit" and "Deactivate" per unit

### Screen 2 — Add / edit unit form
- Tower name
- Floor number
- Unit type (studio / 1BR / 2BR / 3BR)
- Unit nickname (internal label, e.g. "Blue Room")
- Base price per night
- Weekend surcharge toggle + percentage
- Holiday surcharge toggle + percentage
- Minimum stay (nights)
- Check-in time (default: 2:00 PM)
- Checkout time (default: 12:00 PM)
- House rules (text field, multilingual input V4)
- Unit photos (upload, max 10)
- Active / inactive toggle

### Screen 3 — Blocked dates manager
- Calendar view of unit
- Host can click dates to block/unblock
- Reason field (optional): maintenance, personal use, etc.

## Data this module needs
- Host account ID
- Tower/building list (pre-loaded or manually entered)

## Data this module produces
- Unit records (stored in database)
- Pricing rules per unit
- Blocked date ranges per unit
- House rules per unit

## Connections to other modules
- Feeds into: `07-calendar-system` (availability display)
- Feeds into: `01-public-portal` (unit types shown publicly)
- Feeds into: `04-agent-portal-calendar` (what agents can see)
- Feeds into: `12-receipt-generator` (unit details on receipt)

## What this module does NOT do
- No booking management (that is module 06)
- No agent management (that is module 08)
- No payment processing

## Tech notes
- Framework: React.js
- Image upload: Cloudinary or AWS S3
- Form validation: React Hook Form + Zod
- All fields auto-save as draft before submit

## Acceptance criteria
- [ ] Host can add a new unit with all required fields
- [ ] Host can upload up to 10 photos per unit
- [ ] Host can set base price and surcharge rules
- [ ] Host can block specific dates with reason
- [ ] Inactive units do not appear on public calendar
- [ ] Unit data persists correctly after save
- [ ] Mobile-friendly form layout

## Status
🔲 Not started

## Assigned to
*(developer name here)*
