# Module 16 — AI chatbot (public inquiries)

## Purpose
Handles incoming inquiries on the public portal automatically.
Answers availability questions, explains booking process,
and routes serious inquiries to the correct agent.
V1 is scripted. V3 upgrades to AI-powered responses.

## Users
- Anonymous visitors (public portal)
- System (routes leads to agents)

## Chatbot capabilities (V3 — AI powered)

### What it can answer
- Is [unit type] available on [date]?
- How do I book a unit?
- What is the minimum stay?
- What amenities are included?
- What is the check-in / checkout time?
- How do I contact an agent?
- What payment methods are accepted?
- Is there parking available?

### What it cannot do
- Cannot show exact pricing (privacy — agents only)
- Cannot book directly (routes to agent)
- Cannot access guest or booking records
- Cannot answer legal or tax questions

## Conversation flow

### Standard inquiry
1. Visitor opens chatbot
2. Chatbot greets in detected language (Filipino / English)
3. Visitor asks question
4. Chatbot responds using unit data + scripted/AI response
5. If question answerable → respond directly
6. If booking intent detected → collect:
   - Preferred dates
   - Unit type preference
   - Contact number (optional)
7. Lead logged → assigned to available agent
8. Visitor told: "An agent will contact you shortly"

### Language detection
- Auto-detect based on visitor's first message language
- Language toggle available at any time
- V4: Korean, Japanese, Chinese support added

## Lead routing logic
- Leads distributed round-robin to active agents
- If no agents active → lead queued, host notified
- Agent receives lead notification (push + SMS)
- Agent has 30 minutes to respond before lead re-routed

## UI
- Floating button (bottom right of public portal)
- Opens as slide-up panel on mobile
- Chat bubble style conversation
- Typing indicator while response loads
- Language toggle in chat header

## Data this module needs
- Unit availability (from calendar module)
- Unit types and amenities (from unit setup)
- Agent availability status
- Scripted response library (host-customizable)

## Data this module produces
- Lead records (contact info + inquiry details + timestamp)
- Chatbot conversation logs (for AI training)
- Agent lead assignments

## Connections to other modules
- Reads from: `07-calendar-system` (availability)
- Reads from: `02-host-portal-unit-setup` (unit info)
- Sends to: `04-agent-portal-calendar` (lead notification)
- Sends to: `03-host-portal-dashboard` (unrouted leads)

## What this module does NOT do
- Cannot book on behalf of visitor
- Cannot show pricing
- Cannot access any booking or guest records
- Cannot replace human agent for complex inquiries

## Tech notes
- V3 AI: Claude API (claude-sonnet) or OpenAI GPT-4o
- Language detection: franc-min library or AI-native detection
- Lead assignment: round-robin queue in database
- Conversation storage: per-session, anonymized after 30 days
- Response time target: under 2 seconds per message

## Acceptance criteria
- [ ] Chatbot responds to availability questions correctly
- [ ] Booking intent triggers lead capture flow
- [ ] Lead assigned to agent within 30 minutes
- [ ] Unrouted leads notify host
- [ ] Language auto-detects from first message
- [ ] Language toggle works mid-conversation
- [ ] Chatbot does not reveal pricing or booking records
- [ ] Conversation logs anonymized after 30 days

## Status
🔲 Not started

## Assigned to
*(developer name here)*
