# Module 24 — Foreign owner resource section

## Purpose
A dedicated information hub inside the host portal for
foreign unit owners. Provides guidance on Philippine rental
regulations, tax obligations, and practical operation tips.
Mirent does not provide legal advice — this section
connects foreign hosts to the right professionals and resources.

## Users
- Foreign hosts (primary)
- Local hosts (visible but less relevant)

## Content sections

### 1. Philippine rental regulations overview
- HLURB / DHSUD condo unit rental rules
- Short-term vs long-term rental distinctions
- Barangay permit requirements
- Building administration compliance notes
- Updated: quarterly review by Mirent team

### 2. Tax obligations for foreign unit owners
- BIR registration requirements for non-residents
- Withholding tax on rental income (non-resident rate)
- Annual ITR filing requirements
- PEZA zones (if applicable to condo location)
- Disclaimer: "This is general information only.
  Consult a licensed Philippine CPA for your specific situation."
- CTA (call to action): "Find a CPA who specializes in
  foreign property owners" → link to curated directory

### 3. Banking and remittance guide
- How to receive rental income from Philippines abroad
- BSP remittance rules overview
- Recommended remittance channels (general info only)
- Common payment methods used by Philippine tenants
- Disclaimer: "Mirent does not process payments.
  This is for reference only."

### 4. Practical operations guide (foreign host)
- How to manage your property remotely using Mirent
- Setting up your agent as delegate
- How to read your revenue reports from abroad
- How to use the mobile app / web portal from any timezone
- Timezone guide: Manila time vs your local time
- Emergency contacts checklist (what to prepare before you leave)

### 5. Professional directory (curated, not paid placement)
- CPAs specializing in foreign property income (Philippines)
- Property lawyers handling condo ownership for foreigners
- Building administrators (by area)
- Expat property management contacts
- Note: "Listings are for reference only.
  Mirent does not endorse or guarantee any service provider."

### 6. FAQ — Foreign owners
- Can I own a condo unit in the Philippines as a foreigner?
- Do I need to be in the Philippines to rent out my unit?
- How do I receive my rental income abroad?
- What happens if my tenant damages the unit?
- Can my agent sign contracts on my behalf?
- How do I handle tax if I live in [Korea / Japan / China]?

## UI screens

### Screen 1 — Resource hub home
- Welcome banner: "Resources for Foreign Unit Owners"
- Section cards (6 sections above) with icons
- Language: available in English + Korean + Japanese +
  Simplified Chinese (matching module 21 rollout)
- Last updated date per section

### Screen 2 — Individual resource page
- Article-style layout
- Table of contents (jump links)
- "Was this helpful?" feedback button
- Related resources sidebar
- "Connect with a professional" CTA at bottom

### Screen 3 — Professional directory
- Filter by: specialty, location, language spoken
- Per listing: name, specialty, contact method, languages
- No pricing shown (contact directly)

## Content maintenance
- Mirent team reviews and updates quarterly
- Version history tracked (so hosts know if regulations changed)
- "Last reviewed: [date]" shown on each article

## Data this module needs
- Host language preference (from module 21)
- Host country/timezone (from onboarding)
- Resource content (CMS or markdown files)

## Data this module produces
- Resource view logs (which articles read most — for content priority)
- "Was this helpful" feedback records

## Connections to other modules
- Linked from: `08-host-onboarding-wizard` (shown to foreign hosts)
- Uses: `21-multi-language-interface` (for translations)
- Linked from: `03-host-portal-dashboard` (help menu)

## What this module does NOT do
- Does not provide legal advice
- Does not endorse any professional in the directory
- Does not process payments or banking transactions
- Does not replace consultation with a licensed professional

## Tech notes
- Content: Markdown files in `/content/resources/` folder
  (easy for non-developer to update)
- CMS option (V5): headless CMS like Contentful or Sanity
- Translation: same i18next system as module 21
- Search: simple text search within resource section
- No external login required — accessible inside host portal only

## Acceptance criteria
- [ ] All 6 sections accessible from resource hub home
- [ ] Content displays in host's preferred language
  (where translation available)
- [ ] Legal disclaimer present on tax and legal sections
- [ ] Professional directory filterable by specialty and language
- [ ] "Last reviewed" date visible on each article
- [ ] "Was this helpful" feedback submits correctly
- [ ] Resource hub linked from onboarding wizard for foreign hosts
- [ ] Content updatable without code deployment
  (markdown file edit only)

## Status
🔲 Not started

## Assigned to
*(developer name here)*
