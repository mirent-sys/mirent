# Module 21 — Multi-language interface

## Purpose
Makes all Mirent portals accessible in multiple languages
to serve foreign unit owners and international guests.
Language is a preference setting — not a separate app.

## Users
- Foreign hosts (Korean, Japanese, Chinese, etc.)
- International guests (via QR portal)
- Local users (Filipino / English — already in V1)

## Language rollout plan

| Phase | Languages | Target users |
|-------|-----------|--------------|
| V1 | Filipino, English | Local hosts and guests |
| V4 | Korean (한국어) | Korean condo owners (largest foreign segment) |
| V4 | Japanese (日本語) | Japanese property investors |
| V4 | Simplified Chinese (简体中文) | Mainland Chinese owners |
| V4 | Traditional Chinese (繁體中文) | Hong Kong / Taiwan owners |
| V5 | Arabic (العربية) | Middle East investors |
| V5 | French | European segment |

## What gets translated

### Host portal
- All navigation labels
- All form field labels and placeholders
- All error messages and validation text
- All notification messages
- Dashboard summary cards
- Onboarding wizard (full)
- Help tooltips

### Agent portal
- All navigation and labels
- Booking submission flow
- Hold timer notifications
- Lead notifications

### Guest QR portal
- Welcome message (auto-translated + host custom override)
- House rules
- Stay info labels
- Extension request flow
- Checkout checklist
- Emergency panel labels

### Public portal
- Navigation
- Unit type labels
- Chatbot responses
- Promo banner text (host inputs in their language)

## What is NOT translated (V4)
- Host-entered free text (unit descriptions, house rules body)
  — host enters in their own language, shown as-is
- Receipt PDFs (English only in V4, multilingual in V5)
- Revenue reports (English only in V4)

## Language preference setting
- Set during onboarding (module 08)
- Changeable anytime in account settings
- Guest QR portal: auto-detects from browser locale,
  manual toggle available
- Language stored per user account (not per session)

## Technical implementation

### Library
- i18next + react-i18next (industry standard)
- Translation files: JSON format per language
  Example: `locales/ko/translation.json`

### Translation file structure
```json
{
  "dashboard": {
    "title": "대시보드",
    "total_bookings": "총 예약",
    "pending_approvals": "승인 대기중"
  },
  "booking": {
    "hold_timer": "보류 타이머",
    "submit_booking": "예약 제출"
  }
}
```

### RTL support
- Arabic (V5) requires RTL layout
- Use CSS logical properties from V1 to avoid refactor later
- `dir="rtl"` attribute on html tag when Arabic selected

### Translation management
- Use Lokalise or Crowdin for translation management
- Developer exports JSON, uploads to translation platform
- Translator updates, developer re-imports
- No hardcoded strings anywhere in codebase (enforced in code review)

## Data this module needs
- User language preference (from account settings)
- Browser locale (fallback for guest QR portal)
- Translation JSON files per language

## Data this module produces
- Language preference records per user
- Language usage analytics (which languages used most)

## Connections to other modules
- Applied across: all portals (01, 03, 04, 08, 09)
- Reads from: user account settings
- Feeds into: `16-ai-chatbot-public` (chatbot language)
- Feeds into: `22-multi-currency-display` (paired with language)

## Acceptance criteria
- [ ] Language toggle works on all portals without page reload
- [ ] Selected language persists across sessions
- [ ] Korean, Japanese, Simplified Chinese, Traditional Chinese
      fully translated for host portal
- [ ] Guest QR portal auto-detects browser language
- [ ] No hardcoded English strings remain in translated sections
- [ ] Fallback to English if translation missing for a key
- [ ] Font renders correctly for CJK characters
      (use Noto Sans CJK or Google Fonts equivalents)
- [ ] RTL CSS properties in place (for Arabic V5 readiness)

## Status
🔲 Not started

## Assigned to
*(developer name here)*
