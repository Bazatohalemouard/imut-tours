# Rwanda Noble Tours

A responsive, mobile-first React app with two features:
1. **File Upload** — upload Excel/CSV files and preview them in a styled table
2. **Chat** — talk to your AI health assistant via a POST endpoint

---

## Prerequisites

- **Node.js** ≥ 18 — install via [https://nodejs.org](https://nodejs.org) or `brew install node`
- **npm** ≥ 9 (comes with Node)

---

## Setup (macOS)

### 1. Clone / place the project
```bash
cd ~/Desktop   # or wherever you want
# copy the healthchat-app folder here
cd imut-tours
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure the chat API endpoint

Open `src/pages/HomePage.jsx` and update line 7:

```js
const API_URL = 'http://localhost:8000/chat'  // ← change to your endpoint
```

Replace `http://localhost:8000/` with your actual backend URL.

### 4. Run in development
```bash
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## Project Structure

```
healthchat-app/
├── src/
│   ├── App.jsx              # Layout + navigation between pages
│   ├── main.jsx             # React entry point
│   ├── index.css            # Tailwind + custom styles
│   └── pages/
│       ├── HomePage.jsx   # Excel/CSV upload & table preview
│       └── TripsPage.jsx     # Chat UI + API integration
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## API Integration

**Request** (POST to your endpoint):
```json
{
  "session_id": "session-1718000000000",
  "message": "Umutwe uri kundya."
}
```

**Expected response**:
```json
{
  "reply": "Umutwe ubabaza ..."
}
```

The `session_id` is auto-generated per browser session (not persisted across page reloads). Chat history is in-memory only — refreshing clears it.

---

## Build for Production

```bash
npm run build
```

Output is in the `dist/` folder. Serve with any static host (Netlify, Vercel, nginx, etc.).

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Dev server & bundler |
| Tailwind CSS v3 | Utility-first styling |
| xlsx (SheetJS) | Excel/CSV parsing |
| lucide-react | Icons |

