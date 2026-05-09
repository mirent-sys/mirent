# Module 01 — Public portal (front page)

## Purpose
The public-facing entry point of Mirent. Visible to anyone — no login required.
Shows unit availability, active promotions, and allows inquiries via AI chatbot.

## Users
- Anyone (anonymous visitors)
- Prospective guests browsing availability
- Agents checking calendar before contacting host

## Portal
Public (no authentication required)

## UI screens

### Screen 1 — Main page
- Mirent logo + header navigation
- Language selector (Filipino / English — V1, more languages V4)
- Unit availability calendar (color-coded, read-only)
- Active promo banners (host-managed, rotating)
- AI chatbot button (floating, bottom right)
- Footer: contact info, privacy policy link

### Screen 2 — Unit detail view
- Unit type (studio / 1BR / 2BR)
- Floor and tower (no exact unit number shown)
- Available dates highlighted
- "Inquire" button → opens AI chatbot or contact form
- No pricing shown publicly (pricing visible to agents only)

### Screen 3 — AI chatbot panel
- Floating chat window
- Handles: availability questions, unit type questions, how to book
- Cannot book directly — directs user to contact an agent
- Responds in Filipino or English based on user language

## Color coding (calendar)
| Color | Meaning |
|-------|---------|
| 🟢 Green | Vacant — available |
| 🔴 Red | Booked — not available |
| 🟡 Yellow | On hold |
| 🔵 Blue | Pending approval |
| 🟠 Orange | Checkout day |
| 🩵 Teal | Cleaning window |
| ⬜ Gray | Blocked by host |

## Data this module needs
- Unit list (tower, floor, type) — from database
- Booking dates per unit — from booking module
- Promo banners (image + text + date range) — from host portal
- Chatbot responses — from AI module

## Data this module produces
- Inquiry submissions (name, contact, message) — stored for host review
- Chatbot conversation logs — stored for AI training

## Connections to other modules
- Reads from: `04-calendar-system` (availability data)
- Reads from: `03-host-portal-dashboard` (promo banners)
- Sends to: `06-booking-core-approval` (inquiry leads)
- Triggers: AI chatbot module (V3)

## What this module does NOT do
- No login or registration
- No pricing display
- No booking — inquiry only
- No payment of any kind
- No access to guest or agent data

## Tech notes (for developer)
- Framework: React.js
- Must be fully mobile responsive (majority of users are on mobile)
- Calendar component: recommend `react-big-calendar` or `fullcalendar`
- Language toggle: i18next library
- Chatbot: placeholder UI in V1, connected to AI in V3
- Page load target: under 2 seconds on mobile data

## Acceptance criteria
- [ ] Calendar loads and shows correct color coding per unit
- [ ] Blocked/booked dates are not clickable
- [ ] Language toggles between Filipino and English correctly
- [ ] Promo banners rotate automatically (if more than one)
- [ ] Chatbot button opens chat panel
- [ ] Chatbot responds in correct language
- [ ] Page is fully usable on mobile (375px width minimum)
- [ ] No sensitive data (unit numbers, pricing, guest names) is visible
- [ ] Page loads in under 2 seconds on 4G connection

## Status
🔲 Not started

## Assigned to
*(developer name here)*

## Notes
- Promo ads: V1 is simple image + text + date. No complex targeting yet.
- Chatbot: V1 is scripted responses only. AI-powered version is V3.
- Public calendar shows availability only — not who booked or for how long.
