# Decision 002 — Modular monolith architecture for V1

## Date
2025

## Status
Accepted

## Context
Mirent has 25+ modules across 5 portals. A full micro-frontend
or microservices approach would be ideal long-term but is
too complex and expensive for a V1 build with a small team.

## Decision
Use a modular monolith approach:
- Single React frontend codebase
- Single Node.js backend codebase
- Code strictly organized by module folders
- No module directly imports another module's internals
- Shared code goes in /shared or /common folders only

## Folder structure
