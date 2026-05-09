# Module 20 — Revenue reports

## Purpose
Gives hosts a clear picture of their rental income, occupancy,
and agent performance. Reference only — not connected to
actual payment processing. Data based on confirmed bookings.

## Users
- Host (primary — full access)
- Foreign host (same access, currency display preference)

## Report types

### 1. Monthly revenue summary
- Total confirmed bookings (count)
- Total booking value (sum of amounts on receipts)
- Average nightly rate achieved
- Occupancy rate per unit (%)
- Best performing unit
- Worst performing unit
- Month-over-month comparison

### 2. Agent performance report
- Per agent: bookings submitted, approved, rejected, cancelled
- Approval rate per agent
- Average booking value per agent
- Cancellation rate per agent
- Watchdog flag rate per agent (from module 15)
- Commission reference total (calculated, not paid via Mirent)

### 3. Unit performance report
- Per unit: occupancy rate, total booking value, average stay length
- Peak demand periods (which dates booked fastest)
- Pricing suggestion acceptance rate (from module 17)
- Back-to-back booking frequency

### 4. Occupancy calendar heatmap
- Full year calendar view
- Color intensity = occupancy (darker = more booked)
- Hover/tap: shows exact booking count for that date

### 5. Foreign host currency report
- All amounts displayed in: PHP + selected foreign currency
- Currency: USD, KRW, JPY, CNY, HKD (host preference)
- Exchange rate: daily rate pulled from public API
- Disclaimer: "Exchange rates are for reference only"

## Export options
- PDF (formatted report)
- CSV (raw data for host's own accounting)
- Date range: custom selector (default: current month)

## UI screens

### Screen 1 — Reports dashboard
- Date range selector (month / quarter / year / custom)
- Currency preference selector (foreign hosts)
- Summary cards: total bookings, total value, occupancy %
- Quick links to each report type

### Screen 2 — Monthly summary view
- Bar chart: monthly booking value (last 12 months)
- Line chart: occupancy rate trend
- Table: unit-by-unit breakdown

### Screen 3 — Agent performance view
- Table: agents ranked by approval rate
- Watchdog flag rate column (color-coded)
- Expandable row: per-agent booking list

### Screen 4 — Export panel
- Select report type
- Select date range
- Select format (PDF / CSV)
- Download button

## Data this module needs
- All confirmed booking records
- Receipt amounts
- Agent profiles and booking assignments
- Watchdog flag data (from module 15)
- Dynamic pricing acceptance data (from module 17)
- Exchange rate data (external API)

## Data this module produces
- Report files (PDF / CSV)
- Analytics aggregates (stored for dashboard performance)

## Connections to other modules
- Reads from: `06-booking-core-approval`
- Reads from: `12-receipt-generator`
- Reads from: `15-ai-watchdog`
- Reads from: `17-ai-dynamic-pricing`
- Reads from: `19-promo-ads-system` (promo performance data)

## What this module does NOT do
- Not a BIR or official accounting system
- Does not process or record actual money movement
- Does not calculate taxes
- Does not pay commissions

## Tech notes
- Chart library: Recharts
- PDF export: pdfmake
- CSV export: papaparse or json2csv
- Exchange rate API: ExchangeRate-API (free tier) or frankfurter.app
- Report data: pre-aggregated nightly via cron job
  (do not calculate on-demand for large datasets)
- Heatmap: custom D3.js or CSS grid implementation

## Acceptance criteria
- [ ] Monthly summary shows correct totals from booking records
- [ ] Agent performance table ranks correctly by approval rate
- [ ] Occupancy heatmap renders correctly for full year
- [ ] Foreign currency display uses daily exchange rate
- [ ] Exchange rate disclaimer present on all foreign currency views
- [ ] PDF export generates correctly formatted report
- [ ] CSV export contains all raw data fields
- [ ] Custom date range selector works correctly
- [ ] Reports load in under 3 seconds (pre-aggregated data)

## Status
🔲 Not started

## Assigned to
*(developer name here)*
