# MiRent 🏡

A condo rental platform for Makati, Philippines — built with **React + Vite**.  
Features unit search, availability filtering, inquiry forms, and an AI-powered chatbot (Claude).

## Tech Stack
- ⚛️ **React 18** — component-based UI
- ⚡ **Vite** — fast dev server & build tool
- 🤖 **Claude AI** — chatbot via Anthropic API
- 🎨 **CSS Variables** — design tokens, no external CSS framework

## Project Structure
```
mirent/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx / .css
│   │   ├── HomePage.jsx / .css
│   │   ├── SearchBar.jsx / .css
│   │   ├── DatePicker.jsx / .css
│   │   ├── ResultsPage.jsx / .css
│   │   ├── InquiryModal.jsx
│   │   ├── LoginModal.jsx
│   │   ├── Modal.css
│   │   ├── Chatbot.jsx / .css
│   │   └── Toast.jsx / .css
│   ├── data/
│   │   └── units.js        ← All unit data lives here
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css           ← Global design tokens
├── index.html
├── vite.config.js
└── package.json
```

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173
```

## Chatbot Setup (Anthropic API)

The chatbot uses Claude via the Anthropic API. To enable it:

1. Get an API key from [console.anthropic.com](https://console.anthropic.com)
2. **For local dev:** The chatbot calls the API directly. Add a proxy or use the key carefully.
3. **For production:** Create a simple backend endpoint (e.g. Vercel serverless function) that forwards requests to Anthropic with your API key, instead of calling from the browser.

Example Vercel serverless function (`/api/chat.js`):
```js
export default async function handler(req, res) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(req.body),
  });
  const data = await response.json();
  res.json(data);
}
```
Then in `Chatbot.jsx`, change the fetch URL to `/api/chat`.

## Deploy to GitHub + Vercel

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mirent.git
git push -u origin main
```

### Step 2 — Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → "Add New Project"
2. Import your GitHub repo
3. Framework: **Vite** (auto-detected)
4. Build command: `npm run build`
5. Output directory: `dist`
6. Add environment variable: `ANTHROPIC_API_KEY=sk-ant-...`
7. Click **Deploy** 🚀

## Customizing Units

Edit `src/data/units.js` to add/remove units, change rates, or update bookings.

```js
{ id: 15, b: 'gramercy', f: '10th', type: '1BR', lbl: '1-Bedroom',
  rate: 1200, icon: '🏠', sqm: 42,
  amenities: ['WiFi','AC','Pool'],
  bk: [[1,5],[20,25]] }  // booked day ranges this month
```
