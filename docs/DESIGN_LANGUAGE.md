# EVE DESIGN LANGUAGE — Commercial track
**Locked 2026-06-12 (Joakim) · First applied: /solutions/tprm**

## Princip

> **Complexity below. Clarity above.**
> Funktionerna får vara raketforskning. Ytan ska kännas som ett lugnt,
> pålitligt kontrollrum.

Stilnamn: **audit-grade retro-futurism** / industrial retro-futurist verification.

## Referenser (mood)

SAAB-radar · ABB-kontrollsystem · Bloomberg terminal · Commodore 64-allvar ·
80-talets labbutrustning · industriell övervakningspanel.

ALDRIG: AI-spel, cyberpunk-neon, crypto-glow, casino, "AI brain", arcade,
fashion/editorial-typografi.

## Palett

| Ton | Värde | Roll |
|---|---|---|
| Bas | `#0a0a0a` (eve-dark) | Sidbakgrund (sajtkoherens: nav/footer) |
| Navy-grafit | `#0c0f15` | Sektionsband |
| Panelgrafit | `#0e1218` | Moduler, kort, stage-boxar |
| Fält-navy | `rgb(7,9,13)`-ton | WebGL/canvas-grundton — instrumentglas |
| Stål | `slate-400/500` | Kanter, sekundära knappar, listmarkörer, länkar |
| Stålvit | `slate-200 → white` | Fyllda primär-CTA:er ("ABB-knappen") |
| Amber | `#f59e0b` | PARTIAL-status + caution-accent (boundaries) |
| Grön | `#00ff88` | **ENDAST status** — se grön-regeln |

## Grön-regeln (hård)

Grön får endast förekomma där den betyder verifierad status:
`valid` · `sealed` · `SUPPORTED` · `Verified` · Verify-knappar/länkar.

Aldrig: CTA-fyllnad, hover-dekor, numrering, listmarkörer, selected-states,
rubrikaccenter på icke-statusord. Fosfor-disciplin: när grön syns betyder den
något — det är därför den fungerar.

## Form

- Hörn: `rounded-sm` (2px). Aldrig `rounded-full`/piller. Aldrig `rounded-xl`
  på paneler.
- Kanter: hairlines i stål (`border-slate-500/25` paneler,
  `border-slate-400/40` betonade). Glow/bloom: nej.
- En (1) fylld CTA-stil per sida (stålvit). Allt annat outline.
- Moduler hellre än kort: gap-px-grid med separatorfärg som ram
  (se verdict-modulerna på /solutions/tprm).

## Typografi

- Rubrik (H1, hero): Georgia serif, light — notariell tyngd. Ingen kursiv
  som dekor. Statusord kan vara gröna (status, inte flourish).
- Brödtext/UI: Inter (sajtstandard).
- ALL data i mono: hashar, seal-ID:n, rule-ID:n, versioner, statusetiketter,
  stage-rubriker (11px, `tracking-[0.2em]`, versaler).

## Instrumentdetaljer

- Tekniska mikroetiketter/annotationsräls: 10px mono, grå, tick-streck,
  positionerade vid verklig betydelse (EVIDENCE IN · RESOLVER · VERDICT ·
  SEALED · VERIFY). Axelmärkning, inte dekor.
- Verdict-statusmoduler: `NAMN — kort etikett` (SUPPORTED — Evidence found).
- Bevis före påstående: riktiga seal-ID:n, hashar och live verify-länkar i
  marknadsmaterialet. "Trust" sägs inte — den klickas.
- Rörelse: deterministisk, långsam (perioder ≥15 s), seedad (E_DIGITS),
  aldrig per-frame-slump. `prefers-reduced-motion` respekteras alltid.
  Färg i rörliga element följer grön-regeln: ofärdigt = grått.

## Copy-röst

- Led med leverabeln: evidence in → SUPPORTED/PARTIAL/NO_ANSWER → sealed
  workpaper → verify later. Arkitektur endast under "How it works".
- Ärliga begränsningar är del av designen (boundary-block med amber-rand).
- Låsta meningar används ordagrant (verify-satsen, "not an audit"-satsen).
- Skryt aldrig om AI. Säg: det här håller, det här är granskningsbart.

## Gäller

Alla köpar-/säljytor i kommersiella spåret: /solutions/* (TPRM nu,
Agent Governance i GTM-steg 2), framtida grc.eveverified.com-köparytor,
pitch-material. Tekniska demos (Control Chain) får vara råare men följer
grön-regeln.

*Ändringar i detta dokument är medvetna beslut, aldrig drift.*
