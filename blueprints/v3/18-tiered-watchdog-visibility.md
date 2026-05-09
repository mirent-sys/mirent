# Module 18 — Tiered watchdog visibility

## Purpose
Controls what each user type can see inside the watchdog system.
Ensures hosts have full visibility while protecting sensitive
operational data from agents and guests.

## Users
- Host (full visibility)
- Trusted agent (limited — own data only)
- Standard agent (no watchdog access)
- Cleaner (no access)
- Guest (no access)

## Visibility matrix

| Data point | Host | Trusted Agent | Standard Agent |
|------------|------|--------------|----------------|
| Own risk score | ✅ | ✅ | ❌ |
| Other agents' scores | ✅ | ❌ | ❌ |
| Booking risk scores | ✅ | Own only | ❌ |
| Fraud flags | ✅ | Own bookings | ❌ |
| Agent trust rankings | ✅ | ❌ | ❌ |
| Watchdog alerts | ✅ | Own only | ❌ |
| Weekly summary report | ✅ | ❌ | ❌ |
| Blacklist | ✅ | ❌ | ❌ |

## Agent tier definitions

### Standard agent
- Default tier for all newly approved agents
- No watchdog visibility
- Cannot see own risk score
- Sees: own bookings, own calendar, own commissions

### Trusted agent
- Manually promoted by host
- Has demonstrated reliable track record
- Can see own risk score and own booking flags
- Cannot see other agents' data
- Gets priority in lead routing

### How to promote to Trusted
- Host goes to agent management in host portal
- Clicks "Promote to Trusted" on agent profile
- Confirms with reason (optional)
- Agent is notified of promotion

## UI — Host view (watchdog panel addition)
- Agent trust tier badge visible on each agent profile
- One-click promote/demote with confirmation
- Demotion reason required (logged)
- Trusted agents highlighted in agent list

## UI — Trusted agent view
- New section in agent portal: "My performance"
- Own risk score (current + 30-day trend)
- Own booking flags (if any) with dismissal status
- "What does this mean?" help tooltip per metric

## Data this module needs
- Agent tier assignments
- Watchdog scores and flags (from module 15)
- Booking records linked to agent

## Data this module produces
- Tier change records (who changed, when, reason)
- Agent performance view data

## Connections to other modules
- Reads from: `15-ai-watchdog` (scores and flags)
- Reads from: `04-agent-portal-calendar` (agent identity)
- Updates: `03-host-portal-dashboard` (tier badges)
- Affects: `16-ai-chatbot-public` (lead routing priority)

## What this module does NOT do
- Does not automatically promote agents
- Does not share one agent's data with another
- Does not affect guest-facing data

## Tech notes
- Permission layer: role-based access control (RBAC)
- Tier stored as enum: STANDARD | TRUSTED
- All tier changes: immutable audit log
- Frontend: conditional rendering based on tier prop

## Acceptance criteria
- [ ] Standard agent has zero access to watchdog data
- [ ] Trusted agent sees only own scores and flags
- [ ] Host sees all agents' data with tier badges
- [ ] Promote/demote flow requires host confirmation
- [ ] Demotion reason is logged
- [ ] Trusted agent notified on promotion
- [ ] Lead routing prioritizes trusted agents correctly
- [ ] Tier changes are immutable in audit log

## Status
🔲 Not started

## Assigned to
*(developer name here)*
