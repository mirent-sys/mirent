# Module 08 — Host onboarding wizard

## Purpose
Step-by-step guided setup for new hosts — local or foreign.
Goal: host should be fully operational within 15 minutes of signing up.

## Users
- New hosts (first login)
- Foreign hosts (may need extra guidance on delegation)

## Onboarding steps

### Step 1 — Account setup
- Full name
- Contact number (with country code selector)
- Language preference (Filipino / English — V1)
- Timezone preference (auto-detect with manual override)
- Profile photo (optional)

### Step 2 — Property setup
- Building / tower name
- Number of units to add
- For each unit: type, floor, nickname
- Option: "I'll add more units later"

### Step 3 — Pricing setup
- Base price per night per unit
- Weekend surcharge (toggle + %)
- Holiday surcharge (toggle + %)
- Minimum stay setting

### Step 4 — Agent setup
- "Do you have agents?" (Yes / No / Add later)
- If yes: enter agent name + contact number
  → System sends agent invitation link
- Explanation of agent role shown
- Foreign host note: "Your agent is your on-ground representative"

### Step 5 — Security preferences
- Hold duration (default: 2 hours)
- Max simultaneous holds per agent (default: 3)
- Require payment proof before booking submission: Yes (default)
- Auto-cooling period on refunds: Yes (default, cannot disable V1)

### Step 6 — Done
- Summary of what was set up
- Links to: Add more units / Invite agents / View calendar
- Quick-start guide (downloadable PDF)
- "Go to dashboard" button

## Data this module produces
- Host profile record
- Initial unit records
- Agent invitation records
- Host preference settings

## Connections to other modules
- Feeds into: `02-host-portal-unit-setup`
- Feeds into: `03-host-portal-dashboard`
- Triggers: agent invitation (email or SMS)

## What this module does NOT do
- Does not handle payment setup
- Does not configure AI features (V3)
- Does not set up multi-language (V4)

## Tech notes
- Multi-step form with progress indicator
- Each step auto-saves (no data lost if user closes)
- Mobile-first layout
- Country code selector: react-phone-number-input
- Timezone: auto-detect via browser,
  manual override with searchable dropdown
- Wizard skippable after Step 2 (minimum viable setup)

## Acceptance criteria
- [ ] Host can complete full onboarding in under 15 minutes
- [ ] Each step auto-saves progress
- [ ] Foreign host sees country code selector on phone field
- [ ] Timezone auto-detects correctly
- [ ] Agent invitation sends successfully (SMS or email)
- [ ] Host can skip optional steps and complete later
- [ ] Onboarding wizard does not appear again after completion
- [ ] Mobile layout is clean and usable on small screens

## Status
🔲 Not started

## Assigned to
*(developer name here)*
