# Module 12 — Receipt generator

## Purpose
Auto-generate a professional booking receipt/confirmation document
upon host approval. Serves as the official record for host, agent, and guest.

## Users
- Host (receives copy, can download)
- Agent (receives copy)
- Guest (receives copy via QR portal)
- System (auto-generates on booking approval)

## Receipt contents
- Mirent logo + receipt number (auto-generated, sequential)
- Date of issue
- Booking reference ID
- Unit details: type, floor, tower (no exact unit number)
- Check-in date and time
- Checkout date and time
- Number of nights
- Base rate per night
- Surcharges applied (weekend / holiday)
- Total amount (reference only — not a payment confirmation)
- Agent name + contact
- Host name
- Accountability certification chosen by agent (recorded)
- QR code linking to guest portal
- Footer: "This receipt is for reference only.
  Payment was processed externally."

## Receipt format
- PDF (primary)
- On-screen view (HTML version for quick access)

## Generation trigger
- Auto-generated: immediately on host booking approval
- Manual regeneration: host can re-download anytime
- No editing after generation (immutable record)

## Data this module needs
- Booking record (full details)
- Unit details
- Agent profile
- Host profile
- Pricing breakdown
- Guest QR token

## Data this module produces
- PDF file (stored per booking)
- Receipt record (booking ID + file path + timestamp)

## Connections to other modules
- Triggered by: `06-booking-core-approval`
- Reads from: `02-host-portal-unit-setup` (unit + pricing)
- Sends to: `03-host-portal-dashboard` (downloadable)
- Sends to: `09-guest-qr-portal` (embedded in stay info)

## What this module does NOT do
- Not an official BIR receipt
- Does not confirm payment (payment is external)
- Does not replace agent's own commission record

## Tech notes
- PDF library: `pdfmake` or `@react-pdf/renderer`
- Receipt number format: MR-YYYYMMDD-XXXX (e.g. MR-20250510-0001)
- Storage: AWS S3 or Cloudinary (PDF archive)
- Generation time target: under 3 seconds after trigger

## Acceptance criteria
- [ ] Receipt auto-generates on booking approval
- [ ] PDF contains all required fields
- [ ] Receipt number is unique and sequential
- [ ] Host and agent can download PDF from dashboard
- [ ] Guest sees receipt link in QR portal
- [ ] Receipt cannot be edited after generation
- [ ] "Payment processed externally" disclaimer is present

## Status
🔲 Not started

## Assigned to
*(developer name here)*
