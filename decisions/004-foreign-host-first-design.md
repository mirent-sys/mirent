# Decision 004 — Design for foreign hosts from V1

## Date
2025

## Status
Accepted

## Context
A significant portion of Philippine condo unit owners are
foreign nationals (Korean, Japanese, Chinese, HK-based)
who manage properties remotely. Existing PMS platforms
in the Philippines do not address this segment specifically.

## Decision
Mirent will design all core flows with foreign hosts in mind
from V1, even if language and currency features launch in V4.

This means:
- Timezone-aware timestamps from V1
- Country code selector on all phone number fields from V1
- Agent delegation system designed for remote host use from V1
- No assumption that host is physically present in PH
- Remote-operable without any in-person requirement

## Consequences
- Larger addressable market from launch
- Agent system becomes more critical (boots-on-ground)
- Slightly more complex onboarding (timezone, country code)
- Clear competitive differentiation from local PMS platforms

## Alternatives considered
- Local-first, internationalize later —
  rejected (retrofitting internationalization is expensive)
- Separate product for foreign hosts —
  rejected (one platform is simpler to maintain)
