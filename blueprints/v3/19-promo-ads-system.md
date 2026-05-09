# Module 19 — Promo ads system

## Purpose
Allows hosts to create and manage promotional banners
displayed on the public portal. No external advertisers —
only host-owned promotions for their own units.

## Users
- Host (creates and manages promos)
- Public portal (displays promos)
- System (schedules and rotates)

## Promo types

### Banner promo
- Image (uploaded by host)
- Headline text (max 60 characters)
- Subtext (max 120 characters)
- Date range (start + end date)
- Target: all units or specific unit type

### Text-only promo
- Headline
- Subtext
- Optional emoji
- Date range

### Holiday special
- Pre-designed template (host fills in rate + dates)
- Auto-formatted for Christmas, Holy Week, summer, etc.

## Promo display rules
- Maximum 3 active promos shown at one time (rotating)
- Auto-rotation: every 5 seconds
- Expired promos auto-removed (no manual cleanup needed)
- Host-paused promos hidden immediately
- No external ads — only host's own properties promoted

## UI screens

### Screen 1 — Promo manager (host portal)
- List of all promos: active, scheduled, expired
- Status badges: Active / Scheduled / Paused / Expired
- "Create new promo" button
- Edit / Pause / Delete per promo
- Preview button (shows how it looks on public portal)

### Screen 2 — Create / edit promo form
- Promo type selector
- Image upload (if banner)
- Headline + subtext fields with character counters
- Date range picker
- Unit type targeting (all / studio / 1BR / 2BR)
- Preview panel (live preview as host types)
- "Publish" and "Save as draft" buttons

### Screen 3 — Public portal display
- Rotating banner at top of page
- Tap/click → scrolls to relevant unit availability
- Mobile: single banner, full width
- Desktop: up to 2 banners side by side

## Data this module needs
- Host profile (ownership verification)
- Unit types (for targeting)
- Promo content (image, text, dates)

## Data this module produces
- Promo records (content + schedule + status)
- Promo impression logs (how many times shown)
- Click-through logs (how many visitors tapped)

## Connections to other modules
- Reads from: `02-host-portal-unit-setup` (unit types for targeting)
- Feeds into: `01-public-portal` (banner display)
- Analytics feeds into: `20-revenue-reports`

## What this module does NOT do
- No external advertiser access
- No paid placement or ad bidding
- No tracking pixels or third-party analytics

## Tech notes
- Image upload: Cloudinary (auto-resize for banner dimensions)
- Rotation: CSS animation or React state timer (5-second interval)
- Auto-expiry: cron job checks daily, updates status
- Banner dimensions: 1200x400px (desktop), 800x400px (mobile)
- Draft system: auto-save every 30 seconds

## Acceptance criteria
- [ ] Host can create, edit, pause, and delete promos
- [ ] Expired promos auto-removed from public display
- [ ] Maximum 3 promos rotate correctly on public portal
- [ ] Live preview works in create/edit form
- [ ] Unit type targeting shows promo only for relevant units
- [ ] Impression and click-through counts tracked
- [ ] Mobile display is full-width and readable
- [ ] No external ads ever displayed

## Status
🔲 Not started

## Assigned to
*(developer name here)*
