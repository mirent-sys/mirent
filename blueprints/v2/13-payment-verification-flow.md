# Module 13 — Payment verification flow

## Purpose
Structured process for agents to submit payment proof and
for hosts to verify before confirming a booking.
Mirent does not process payments — this module manages the verification
of externally-made payments (GCash, bank transfer, cash, etc).

## Users
- Agent (uploads proof)
- Host (verifies and confirms)
- System (fraud checks, logs)

## Payment methods supported (external, reference only)
- GCash (screenshot)
- Maya (screenshot)
- Bank transfer (screenshot or reference number)
- Cash (agent certifies receipt)

## Flow

### Agent side
1. Agent completes booking hold + guest info
2. Before submission: payment proof upload screen appears
3. Agent selects payment method
4. Agent uploads screenshot or enters reference number
5. For cash: agent checks "I confirm cash payment received in person"
   (with liability acknowledgment)
6. System runs fraud checks (module 11)
7. If clean → booking submitted to host for approval
8. If flagged → warning shown, agent can proceed with acknowledgment

### Host side
1. Host receives booking notification
2. Host opens booking detail
3. Sees: payment method, uploaded screenshot, reference number
4. Warning displayed: "Do not rely on screenshot alone —
   verify via your actual GCash or bank account"
5. Host clicks: "I have verified this payment in my account"
   (mandatory checkbox before approve button activates)
6. Host approves → booking confirmed

## Fraud protection in this flow
- Screenshot hash checked for duplicates (module 11)
- Image metadata checked for editing signs (module 11)
- Cash payment: agent accountability certification recorded
- All payment records are immutable after booking confirmation

## Data this module needs
- Booking hold record
- Agent profile
- Payment method choice
- Uploaded screenshot or reference number

## Data this module produces
- Payment verification record (method, reference, timestamp, verifier)
- Agent cash certification record (if applicable)
- Fraud check result logs

## Connections to other modules
- Part of: `06-booking-core-approval` flow
- Calls: `11-anti-fraud-blacklist` (fraud checks)
- Feeds into: `12-receipt-generator` (payment method recorded on receipt)
- Logs to: `03-host-portal-dashboard` (payment audit trail)

## What this module does NOT do
- Does not process, hold, or transfer any money
- Does not integrate with GCash or bank APIs (V1)
- Does not replace official accounting

## Tech notes
- File upload: accept JPG, PNG, PDF only (max 5MB)
- Hash check: SHA-256 on upload
- Host verification checkbox: server-side enforcement
  (approve button inactive until checked)
- All records: append-only, no deletion allowed

## Acceptance criteria
- [ ] Agent cannot submit booking without payment proof or cash cert
- [ ] Screenshot hash checked for duplicates on upload
- [ ] Host sees "verify in your own account" warning before approve
- [ ] Approve button inactive until host checks verification box
- [ ] Cash payment triggers agent accountability record
- [ ] All payment records are immutable after confirmation
- [ ] Payment method and reference appear on receipt

## Status
🔲 Not started

## Assigned to
*(developer name here)*
