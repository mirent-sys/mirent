# Module 22 — Multi-currency display

## Purpose
Allows foreign hosts to view all booking amounts and revenue
in their preferred currency alongside Philippine Peso (PHP).
Display only — Mirent does not process payments in any currency.

## Users
- Foreign hosts (primary)
- Local hosts (PHP only by default)

## Supported currencies (V4)

| Currency | Code | Target users |
|----------|------|--------------|
| Philippine Peso | PHP | All (base currency) |
| US Dollar | USD | General international |
| Korean Won | KRW | Korean owners |
| Japanese Yen | JPY | Japanese owners |
| Chinese Yuan | CNY | Mainland Chinese owners |
| Hong Kong Dollar | HKD | HK / international owners |

## How it works
- All amounts stored in PHP in the database (single source of truth)
- On display: convert PHP → preferred currency using daily rate
- Exchange rate fetched once daily from public API
- Rate cached for 24 hours (avoid API overuse)
- Every amount shown with both PHP and foreign currency
- Disclaimer always shown: "Foreign currency shown for reference only.
  Actual payments are in PHP."

## Display format examples
- PHP 5,000 (~$87 USD)
- PHP 15,000 (~₩118,500 KRW)
- PHP 8,000 (~¥17,600 JPY)

## Where multi-currency appears

### Host portal
- Dashboard summary cards (total revenue this month)
- Booking detail view (amount reference)
- Revenue reports (module 20)
- Receipt view (PHP primary, foreign secondary)

### Does NOT appear
- Public portal (PHP only)
- Agent portal (PHP only)
- Guest QR portal (PHP only)

## Currency preference setting
- Set during onboarding (module 08) — Step 1
- Changeable anytime in account settings
- Default: PHP (no conversion shown)

## UI elements

### Currency selector (account settings)
- Dropdown: PHP / USD / KRW / JPY / CNY / HKD
- "Save preference" button
- Preview: shows sample amount in selected currency

### Amount display component
- Primary: PHP amount (always shown, larger)
- Secondary: foreign currency equivalent (smaller, gray text, in parentheses)
- Tooltip on hover: "Rate as of [date]: 1 PHP = X [currency]"
- "Rates updated daily" note in reports footer

## Exchange rate API
- Primary: frankfurter.app (free, no API key needed)
- Fallback: ExchangeRate-API (free tier)
- If API unavailable: show PHP only with notice
  "Currency conversion temporarily unavailable"

## Data this module needs
- Host currency preference
- Daily exchange rates (from external API)
- All booking amounts (in PHP)

## Data this module produces
- Converted display amounts (not stored — calculated on render)
- Exchange rate cache (stored daily)
- Currency preference per host account

## Connections to other modules
- Applied in: `03-host-portal-dashboard`
- Applied in: `20-revenue-reports`
- Applied in: `12-receipt-generator` (secondary display)
- Paired with: `21-multi-language-interface`

## What this module does NOT do
- Does not process payments in any currency
- Does not guarantee exchange rate accuracy
- Does not integrate with BSP or any financial regulator
- Does not convert agent commissions

## Tech notes
- Exchange rate fetch: server-side cron job (runs daily 6AM Manila time)
- Rates stored in database (not fetched per request)
- Conversion formula: `foreignAmount = phpAmount * rate`
- Rounding: 2 decimal places for USD/HKD/CNY,
  0 decimal places for KRW/JPY
- Component: reusable `<CurrencyAmount php={5000} />` React component

## Acceptance criteria
- [ ] Foreign currency displays correctly alongside PHP
- [ ] Exchange rate updates daily via cron job
- [ ] Disclaimer present on all converted amounts
- [ ] If API unavailable, graceful fallback to PHP-only display
- [ ] Currency preference persists across sessions
- [ ] KRW and JPY round to whole numbers correctly
- [ ] Tooltip shows rate date and rate value
- [ ] No currency conversion stored in database (display only)

## Status
🔲 Not started

## Assigned to
*(developer name here)*
