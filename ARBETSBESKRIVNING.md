# ARBETSBESKRIVNING: determinism.se / eveverified.com
## Session: 2026-01-19
## Projekt: D:\EVE11\Projects\003_determinism_se\

---

## ✅ LÅSTA SIDOR (färdiga, rör ej)

### 1. `/` (Main/Home)
- 3-pelare struktur: Witness (Observe), Factory (Execute), Governance (Control)
- Hero med pulsande e-visualisering
- Philosophy-sektion med 4 principer
- Products-sektion
- Manifest quote: "e has infinite decimals but remains exactly defined"

### 2. `/eve` (EVE Patent Page)
- Human-in-Control sektion (ABSOLUTE)
- Core vs Play lägen (Core = default, Play = explicit sandbox)
- Trinity Orchestration (LLM → EVE → Factory)
- 5-komponent arkitektur (Knowledge Core, Witness Mode, Authorization, X-Vault, Trinity)
- Agent Ecosystem (25 agents, 47 engines, 325K chunks)
- "Agents are configured roles, not autonomous"
- Backup: `backup/2026-01-19-eve-page-backup.tsx`

### 3. `/elekto` (ELEKTO Cyber-Physical)
- EVE VERIFIED badge
- MarinaViz (kompakt 16:9)
- Sharing ≠ Selling (tokens = access units, inte currency)
- 6-stegs Energy Token Lifecycle
- Offline-First Resilience
- Powered by EVE sektion
- 3 applikationer: Marinas, Camping, Housing Cooperatives
- Technical Foundation (Polygon, MQTT, ECDSA-256, etc.)
- Patent pending (PRV, 27 claims)
- Backup: `backup/elekto-page-backup.tsx`

### 4. `/philosophy` (Philosophy Page)
- Återställd till original med 4 principer från data/products.ts
- Manifest quote
- The Mathematics / The Engineering sektioner

### 5. `/eve-verified` (EVE VERIFIED Page) — NY
- Dedikerad verifieringssida
- Pulsande SVG-visualisering (EVE Core → Products → EVE VERIFIED)
- What EVE VERIFIED Means (6 garantier)
- What Can Be Verified (4 kategorier)
- How Verification Works (5 steg)
- What EVE VERIFIED Is Not (6 saker)
- Core Principles (Witness, Determinism, Cryptographic, Human)
- Verify an Artifact (placeholder för framtida funktion)
- Legal Note + OrganiQ footer

---

## 📁 FILSTRUKTUR

```
/app
├── elekto/page.tsx           ✅ Låst
├── eve/page.tsx              ✅ Låst
├── eve-verified/
│   ├── page.tsx              ✅ Låst (metadata)
│   └── EveVerifiedClient.tsx ✅ Låst (client component)
├── philosophy/page.tsx       ✅ Låst
└── page.tsx                  ✅ Låst (main)

/components
├── EveArchitecture/
│   ├── index.tsx             (ArchitectureViz, TrinityViz, etc.)
│   ├── AgentEcosystem.tsx    (uppdaterad språk)
│   └── Principles.tsx        (HumanInControl, CoreVsPlay, etc.)
├── Philosophy/index.tsx      ✅ Återställd till original
├── MarinaViz/index.tsx       (kompaktare 16:9)
├── Navigation/index.tsx
└── Hero/index.tsx

/lib/constants.ts             (navItems uppdaterad)
/data/agents.ts               (3-lager struktur)
/data/products.ts             (principles)
```

---

## 🧭 NAVIGATION (uppdaterad)

```
EVE | ELEKTO | Philosophy | EVE Verified | ComplieDocs | [Contact]
```

---

## 📋 KANONISKA DOKUMENT (följ dessa)

### EVE Philosophy
- Witness, Never Decide
- Deterministic Core
- Cryptographic Truth
- Infinite Expansion, Precisely Defined
- "Människan bestämmer. Systemet bevisar."

### EVE System Guidelines
- Human-in-Control är ABSOLUT
- EVE Core = default/production
- EVE Play = explicit sandbox
- Trinity = orkestrering (inte en modell)
- Agents = konfigurerade roller (inte autonoma)
- "Generate" ≠ "Decide"

### ELEKTO Guidelines
- Sharing ≠ Selling
- Tokens = access units (aldrig "currency", "payment")
- Cyber-physical, inte blockchain-hype
- Offline-first är en USP
- Industriell ton, ej crypto/fintech-språk

---

## 🔜 MÖJLIGA NÄSTA STEG

1. **Navigation styling** — Kanske dropdown för produkter?
2. **Footer** — Uppdatera med alla nya länkar
3. **ComplieDocs sida** — /compliedocs eller extern länk?
4. **CableDNA sida** — /cabledna (coming soon)
5. **Responsiv test** — Mobilvy för alla sidor
6. **Build/deploy** — Verifiera att allt bygger korrekt
7. **SEO** — Meta tags, OG images
8. **Contact-sektion** — Formulär eller mailto?
9. **Verification service** — Faktisk funktionalitet för /eve-verified

---

## 🔧 TEKNISK INFO

- Framework: Next.js 14
- Styling: Tailwind CSS
- Animations: Framer Motion
- Euler timing: E = 2.71828... (pulsanimationer)
- Färger: eve-green (#00ff88), eve-orange (#ff6b00), eve-cyan (#00d4ff), eve-purple (#a855f7)

---

## ⚠️ VIKTIGT

- **Radera ALDRIG filer utan backup först**
- **Philosophy-komponenten ska använda `principles` från data/products.ts**
- **EVE Play får INTE ligga i Philosophy** — det är separat
- **Inga buzzwords** — matematiskt torr, självsäker ton
- **Siffror är fakta, inte skryt** — "25 agents" (inte "powerful 25 agents")

---

## 📂 BACKUPS

```
/backup/
├── 2026-01-19-eve-page-backup.tsx
├── elekto-page-backup.tsx
├── MarinaViz-backup.tsx
└── Philosophy-backup.tsx
```

---

Senast uppdaterad: 2026-01-19
Av: Claude + Joakim
