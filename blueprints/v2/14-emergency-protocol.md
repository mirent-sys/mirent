# Module 14 — Emergency protocol

## Purpose
Ensures guests, agents, and hosts have clear, fast access to
emergency contacts and escalation procedures during a stay.
Covers medical, security, property damage, and natural disaster scenarios.

## Users
- Guest (primary — accesses via QR portal)
- Host (configures contacts)
- Agent (designated first responder)

## Emergency types covered
- Medical emergency
- Fire or natural disaster
- Security threat / break-in
- Property damage (burst pipe, power outage, etc.)
- Guest lockout

## UI — Guest side (inside QR portal, Screen 5)

### Emergency panel
- Large tap-to-call buttons:
  - 🔴 Emergency services: 911
  - 🟠 Agent (first responder): [agent mobile number]
  - 🔵 Building security/admin: [host-entered number]
  - 🟢 Host direct line: [optional, host-configurable]
- Nearest hospital: name + tap-to-navigate (Google Maps link)
- "Report an issue" form:
  - Issue type (dropdown)
  - Description
  - Photo upload (optional)
  - Submits to: host + agent simultaneously
  - Timestamp recorded

### Guest lockout flow
- "I am locked out" button
- Sends immediate alert to agent + host
- Displays: "Your agent has been notified.
  Expected response: within 15 minutes."
- If no response in 15 minutes → escalates to host direct line

## UI — Host configuration (host portal, unit settings)

### Emergency contact setup (per unit or global)
- Agent first responder: auto-pulled from agent assignment
- Building security number (required field)
- Nearest hospital (name + address — required)
- Host direct line (optional — hidden from guest by default)
- Custom emergency note (e.g. "Building has a nurse on duty floor 2")

## Escalation logic
- Guest submits issue → agent + host notified simultaneously
- If agent does not acknowledge within 15 minutes → host re-alerted
- If host does not acknowledge within 30 minutes →
  system flags as unresponded emergency (logged for review)
- No auto-call to authorities (host/agent responsibility)

## Data this module needs
- Emergency contacts per unit (from host setup)
- Active booking record (for guest QR access)
- Agent assignment (for first responder contact)

## Data this module produces
- Emergency event logs (timestamp, type, responder, resolution)
- Issue reports (linked to booking record)
- Unresponded emergency flags

## Connections to other modules
- Embedded in: `09-guest-qr-portal` (Screen 5)
- Reads from: `02-host-portal-unit-setup` (emergency contact config)
- Sends alerts to: `03-host-portal-dashboard`
- Logs to: `15-ai-watchdog` (V3 — pattern detection)

## What this module does NOT do
- Does not auto-call emergency services
- Does not provide medical advice
- Does not handle insurance claims
- Does not replace building management systems

## Legal note for developer
- Emergency contact display is informational only
- Mirent is not liable for emergency response times
- Disclaimer must appear at bottom of emergency panel

## Tech notes
- Tap-to-call: `tel:` protocol links
- Google Maps link: pre-built URL with hospital coordinates
- Alert delivery: push notification + SMS fallback
- 15-minute escalation: server-side timer (cron job)
- All emergency events: immutable log, cannot be deleted

## Acceptance criteria
- [ ] Emergency panel accessible within 2 taps from QR portal home
- [ ] All tap-to-call buttons work on iOS and Android
- [ ] "Report an issue" form submits to host and agent simultaneously
- [ ] Lockout alert fires immediately on button press
- [ ] 15-minute escalation timer triggers correctly
- [ ] Unresponded emergency flags visible in host dashboard
- [ ] Host can configure emergency contacts per unit
- [ ] Legal disclaimer present on emergency panel
- [ ] Emergency event logs are immutable

## Status
🔲 Not started

## Assigned to
*(developer name here)*
