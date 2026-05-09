# Module 23 — Agent delegation for foreign hosts

## Purpose
Allows foreign hosts who are physically outside the Philippines
to grant expanded operational authority to their trusted agents.
The agent becomes the host's on-ground representative with
clearly defined and logged delegated powers.

## Users
- Foreign host (grants delegation)
- Trusted agent (receives delegation)
- System (enforces delegation rules and logs all actions)

## The problem this solves
A Korean host living in Seoul cannot physically:
- Verify cash payments in person
- Inspect units after cleaning
- Handle guest emergencies on-site
- Meet agents face-to-face

Without delegation — the host is a bottleneck.
With delegation — the trusted agent acts on their behalf,
with full audit trail visible to host.

## Delegation levels

### Level 1 — Standard (default for all agents)
- Can hold units and submit bookings
- Cannot approve own bookings
- Cannot access financial summaries
- Cannot modify unit settings

### Level 2 — Delegated (foreign host grant only)
All of Level 1 plus:
- Can approve bookings on host's behalf
  (host still notified, can override within 2 hours)
- Can verify and confirm payments (cash and digital)
- Can mark cleaning tasks as inspected
- Can handle guest extension requests (approve/reject)
- Can respond to guest emergency reports

### Level 3 — Full delegate (maximum trust, rare)
All of Level 2 plus:
- Can modify unit pricing (within host-set limits)
- Can add/remove other standard agents
- Can update unit availability blocks
- Cannot promote agents to Trusted (host only)
- Cannot access revenue reports
- Cannot delete bookings or units

## How to grant delegation

### Host flow
1. Host goes to Agent Management in host portal
2. Selects agent (must already be Trusted tier)
3. Clicks "Grant Delegation"
4. Selects delegation level (2 or 3)
5. Sets optional expiry date (e.g. "While I am abroad until Dec 2025")
6. Sets pricing change limit (Level 3 only): max ±X% from base rate
7. Confirms with password re-entry (security step)
8. Agent receives notification of delegation grant

### Agent notification
- Push notification + SMS
- Message: "You have been granted Level [X] delegation
  by [Host Name]. This is effective immediately."
- Agent must acknowledge (tap "I understand my responsibilities")

## Audit trail (critical)
- Every delegated action is logged with:
  - Action type
  - Agent name
  - Timestamp
  - "Acting as delegate of [Host Name]" label
- Host sees dedicated "Delegation log" tab in dashboard
- Log cannot be edited or deleted
- Host receives daily summary of delegated actions via notification

## Safeguards
- Host can revoke delegation instantly at any time
- All Level 2/3 approvals send host a notification within 5 minutes
- Host override window: 2 hours after delegated approval
  (host can reverse if something looks wrong)
- Pricing changes (Level 3) cannot exceed host-set limit
- Delegation auto-expires on set date (if expiry was configured)

## UI screens

### Screen 1 — Delegation manager (host portal)
- List of agents with current delegation level
- "Grant / Modify / Revoke" per agent
- Active delegations highlighted
- Expiry dates shown with countdown

### Screen 2 — Grant delegation form
- Agent selector (Trusted agents only)
- Delegation level radio buttons (with explanation per level)
- Expiry date picker (optional)
- Pricing limit field (Level 3 only)
- Password confirmation
- Summary: "You are granting [Agent] Level [X] delegation"

### Screen 3 — Delegation log (host portal)
- Chronological list of all delegated actions
- Filter by: agent, action type, date range
- Export as CSV

### Screen 4 — Agent delegation indicator (agent portal)
- Badge in agent portal header: "Delegated — Level 2"
- Shows which host granted and expiry (if set)
- Delegated actions are visually marked differently
  from regular agent actions

## Data this module needs
- Agent tier (must be Trusted for delegation)
- Host account (foreign flag preferred but not required)
- Delegation grant records
- All agent actions (for logging)

## Data this module produces
- Delegation grant records
- Delegation action logs (immutable)
- Daily delegation summary (for host notification)

## Connections to other modules
- Reads from: `18-tiered-watchdog-visibility` (agent tier)
- Affects: `06-booking-core-approval` (delegated approval flow)
- Affects: `10-cleaner-portal` (delegated inspection)
- Affects: `02-host-portal-unit-setup` (Level 3 pricing changes)
- Logs to: `03-host-portal-dashboard` (delegation log tab)

## What this module does NOT do
- Does not give agent access to host's financial accounts
- Does not allow agent to delete units or bookings
- Does not remove host's ability to override any action
- Does not work for Standard agents (Trusted tier required)

## Tech notes
- Delegation level stored as enum: NONE | LEVEL_2 | LEVEL_3
- All delegated API calls: middleware checks delegation level
  before allowing action
- Override window: server-side 2-hour timer per delegated approval
- Daily summary: scheduled notification job (runs midnight Manila time)
- Password re-entry: re-authenticate via current session token

## Acceptance criteria
- [ ] Only Trusted agents can receive delegation
- [ ] Host must re-enter password to grant delegation
- [ ] Agent must acknowledge delegation before it activates
- [ ] Every delegated action logged with correct label
- [ ] Host receives notification within 5 minutes of any delegated action
- [ ] Host can revoke delegation instantly
- [ ] Override window works correctly (2 hours)
- [ ] Delegation auto-expires on set date
- [ ] Level 3 pricing changes cannot exceed host-set limit
- [ ] Delegation log is immutable and exportable

## Status
🔲 Not started

## Assigned to
*(developer name here)*
