# Blackstone

Digital overhaul for **Black Stone Elevators** (Manapakkam, Chennai) — an internship
project covering three deliverables:

1. **Website** — public marketing site *(in progress — Phase 1)*
2. **E-Catalogue** — interactive lift configurator for prospective buyers *(planned)*
3. **Software** — internal lead-tracking tool for the team *(planned)*

---

## 📂 Repo layout

```
Blackstone/
├── BUSINESS-DATA.md                        ← single source-of-truth for all facts
├── Website/
│   ├── blackstone-web/                     ← the new site (Vite · React · TS · Tailwind)
│   ├── www.blackstoneelevators.in/         ← mirror of the live IndiaMART site (reference)
│   ├── aeplica-blackstone-website/         ← vendor build (reference)
│   ├── oryn-_-bespoke-digital/             ← design reference
│   └── mirror_blackstone_site.py           ← script used to clone the live site
├── App/                                    ← E-Catalogue mobile app (later)
├── E-Catalogue/                            ← E-Catalogue webapp (later)
└── Software/                               ← internal tool (later)
```

---

## 🚀 Running the new site

```powershell
cd Website\blackstone-web
npm install
npm run dev
```

Open <http://localhost:5173>.

### Useful scripts

| Command | What it does |
|---|---|
| `npm run dev`       | Start Vite dev server with HMR |
| `npm run build`     | Production build → `dist/` |
| `npm run typecheck` | TypeScript project-references check |
| `npm run preview`   | Serve the production build locally |

---

## 📦 Tech stack

- **Vite 6** + **React 19** + **TypeScript**
- **Tailwind CSS** with a custom brand palette (gold-on-black)
- **Framer Motion** for scroll-triggered and entrance animations
- **React Router** for client-side navigation
- **Lucide React** for iconography
- **Vercel** for deployment (config already in `vercel.json`)

---

## ✍️ Where to edit content

All verified business data (address, GST, partners, services, FAQs) lives in
[`BUSINESS-DATA.md`](BUSINESS-DATA.md). The page components in
`Website/blackstone-web/src/pages/` read from those facts — update the data file
first if anything changes.
