# EVE Verified

**Evidence & Verification Engine** - Deterministic AI Platform

🌐 [eveverified.com](https://eveverified.com) | [eveverified.se](https://eveverified.se)

---

## 🧠 Philosophy

Like Euler's number (*e* ≈ 2.71828...), EVE applies stable inference rules to approved premises. Outputs are evidence-bound, sealed, and verifiable.

```
e = 2.718281828459045...
    ∞ decimals, exactly defined
```

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
eveverified/
├── app/
│   ├── page.tsx          # Main page
│   ├── layout.tsx        # Root layout + metadata
│   └── globals.css       # Tailwind + custom styles
├── components/
│   ├── Navigation/       # Fixed nav with blur
│   ├── Hero/             # e-visualization + tagline
│   ├── EVECore/          # Interactive agent tree
│   ├── AgentNode/        # Reusable agent component
│   ├── ProductCard/      # Product cards grid
│   ├── Philosophy/       # Principles + manifesto
│   └── Footer/           # Company info
├── data/
│   ├── agents.ts         # Agent data (expandable)
│   └── products.ts       # Products + principles
├── lib/
│   └── constants.ts      # e utilities + colors
└── public/
    └── ...               # Static assets
```

---

## 🎨 Design System

### e-based Spacing
```typescript
const E = 2.718281828459045
const eSpace = (n) => `${(E * n).toFixed(2)}rem`
```

### Colors
| Name | Hex | Usage |
|------|-----|-------|
| eve-green | `#00ff88` | Primary, CTAs |
| eve-cyan | `#00d4ff` | ComplieDocs, secondary |
| eve-orange | `#ff6b00` | Witness Mode |
| eve-purple | `#a855f7` | Factory Engines |

---

## 🌳 Adding New Agents

Edit `data/agents.ts`:

```typescript
export const agentData = {
  // Add new agent
  newAgent: {
    id: 'new-agent',
    name: 'New Agent',
    symbol: '★',
    description: 'Description here',
    color: '#00ff88',
    tier: 2,
    children: []
  },
  
  // Add to parent's children array
  factory: {
    // ...
    children: ['compliance', 'video', 'newAgent'] // Added here
  }
}
```

The tree grows automatically! ✨

---

## 🏢 Company

**Organiq Sweden AB**  
Org.nr: 559505-3579

---

## 📜 License

Proprietary - All Rights Reserved

© 2024-2026 Organiq Sweden AB
