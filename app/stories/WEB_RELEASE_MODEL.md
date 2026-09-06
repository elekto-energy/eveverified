# WEB RELEASE MODEL — provider-backed story + homepage review (LOCK before code)
**Status:** LOCKED FOR BUILD v1.3 — v1.2 locked 2026-08-24; v1.3 locked 2026-09-06 after owner review,
  adding section G (governed-development demonstration). Sections A–F and the recorded deviations are
  unchanged from v1.2 (sha256 752ba0a51191e7640dec0fa7ba1629af50b4f44f5ada877bfd8a27a3110df2ba).
  v1.1 recorded the View-refusal excerpts and the interaction specification.
  v1.2 carries the three comprehension rules, which GOVERN that specification.
  Amended before any build consumed the earlier hashes
  (v1.0 be382d09..., v1.1 38856e1a4c48ae3493f28a0dbd1ac4d2d2f60dbf146f28a0de5fcb06f1a5f224).
**Scope:** eveverified.com only. grc.eveverified.com is NOT touched in this track.
**Repo:** elekto-energy/eveverified · working copy D:\EVE11\Projects\003_determinism_se
**Base:** origin/main bf7922d88a6e076553a6da841e17531b5452ad77, clean tree
**Copy source (release input):** PUBLIC_EVIDENCE_COMMITMENTS.md v1.1
  sha256 eb49434f3640e8e4df2c7b0c106d81c27a7c22c91220588884b1eafdd4ac0219
  Claim wording, the eighteen digests and the two refusal excerpts come from
  that file unchanged. If its hash differs at build time the copy changed, and
  that must be a deliberate decision rather than a side effect of building the UI.
**Story model:** app/stories/PROVIDER_BACKED_STORY_MODEL.md v1.2
  sha256 c293fb6fac0f483b0a37659111a074c45ef8196c5de08034a70380eb3a36ff5b
  LOCKED FOR BUILD. A locked release model must not reference a draft.
  Carries the interaction specification AND the three comprehension rules that
  govern it.
**Date:** 2026-08-24

---

## WHAT WAS MEASURED FIRST

Nothing below is inferred from how the site looks. Each was read from the repo.

    app/page.tsx            Navigation · Hero · Products · StartingPoint ·
                            HowItWorks · Philosophy · Footer   (596 bytes; copy
                            lives in the components and in two data files)
    lib/constants.ts        navItems — /stories exists, buried under "More"
    data/products.ts        products[] (capabilities) · principles[] (claims)
    app/sitemap.ts          explicit ROUTES list; /stories absent entirely
    app/stories/page.tsx    redirect stub -> /stories/accountability
    StoriesClient.tsx       DEAD CODE. `git grep StoriesClient` returns only its
                            own export. The three-card index renders nowhere.
    HowItWorks              engine properties: Witness Mode · Deterministic Core ·
                            Evidence Chain · Cryptographic Sealing. NO fail-closed.
    Hero                    two CTAs, both leaving for grc.eveverified.com

Consequence: B, C and D are edits to FOUR data/config files plus one new page
directory. No existing component's JSX needs restructuring except two additions.

---

## A. PROVIDER-BACKED STORY

    app/stories/provider-backed/page.tsx                metadata + mount
    app/stories/provider-backed/ProviderBackedStory.tsx three states
    app/stories/provider-backed/EvidenceCommitmentsPanel.tsx

Content and locks are fully specified in PROVIDER_BACKED_STORY_MODEL.md v1.2,
which carries the interaction specification — the constant SEALED EXPECTATION
panel, the two independent View-refusal disclosures, the three-level
progressive disclosure — and the three COMPREHENSION RULES that govern it.

The comprehension rules take precedence over the interaction specification
wherever they conflict. In short:

    10-SECOND RULE       the first viewport must convey the whole proof with no
                         hashes, manifests, credentials, projections, schemas,
                         provider internals or EVE record types
    PROGRESSIVE EVIDENCE four layers; each stands alone; nothing in a later
                         layer is needed to make an earlier one make sense
    CONSTANT EXPECTATION the sealed expectation stays visually constant across
                         all three states — the constancy IS the argument

Simplifying the ENTRY POINT is required. Simplifying the CLAIM is forbidden.

The five that must survive the UI build:

1. Three states in order — sealed expectation, two refusals, one verification.
   The refusals come FIRST. A visitor who sees the success first reads an
   ordinary integration.
2. VALID is shown as a RECORDED result with its date, never in the live-verified
   badge idiom the other stories use. No "Verify record ->" button: there is no
   public endpoint that re-checks these artifacts, and offering one that does not
   exist is worse than offering none.
3. Language: fail-closed state, refusal. Never "failed state" — the system did
   not fail, it did exactly what it is built to do.
4. The two View-refusal disclosures show RECORDED SYSTEM-GENERATED EXCERPTS from
   2026-08-24, never live output. Each is a complete sentence quoted verbatim;
   the full internal error messages are NOT published, because they carry the
   operator's surface identifier and credential reference and the public surface
   has no need to know them. No word inside a quoted sentence is masked — a
   redacted quote presented as the system's words is the same defect class as an
   edited record. Attribution is exact and never swapped: the surface sentence is
   from P3, the credential sentence from P5.
5. The first viewport passes the 10-second rule. If a technical detail has to
   appear above the fold for the page to make sense, the narrative is wrong —
   not the rule.

Mirrors accountability/page.tsx exactly in shape: metadata export, then a single
component mount. No new page idiom is invented.

---

## B. DISCOVERABILITY

### What is NOT done
- `/stories` redirect stub: UNTOUCHED. Whether /stories should be an index or a
  story is a separate decision, not a demo release.
- `StoriesClient.tsx`: UNTOUCHED. It is dead code and reviving it would silently
  change what /stories means.
- navItems "More" dropdown: the story is NOT added there. Marine, ComplieDocs,
  Company and Pilot Program live in that dropdown; putting the strongest proof
  beside them buries it.

### What is done
A new homepage section, `VerifiedDemonstrations`, placed AFTER Products and
BEFORE StartingPoint. See C2 — it is the same decision.

Rationale: this is the only demonstration on the site that shows a production
provider-backed verification against Azure DevOps, using an authenticated read.
The others are scenarios and an experimental track. Subordinating the strongest
evidence to a scroll story or a dropdown would invert the hierarchy.

WORDING LOCK: never "external provider" or "third party". Azure DevOps is a real
provider, but the tenant read is the operator's own. "External provider" invites
the reading that an outside party supplied or attested the evidence, which is
exactly what boundary note 2 denies.

---

## C. HOMEPAGE REVIEW

### C1 — Hero: one added path, no restructuring
Hero currently has two CTAs, both leaving for grc.eveverified.com. A third
button would crowd the row and dilute both.

    ADD, below the boundary line "EVE proves the chain. The organisation acts on it."

      See EVE refuse twice — then verify once ->
      One sealed expectation. Two fail-closed states. One authenticated
      provider-backed verification.

    Rendered as a quiet text link, not a third button. It is a different KIND of
    invitation from the two CTAs: those say "try the product", this says "see the
    proof". Making it look identical would flatten that distinction.

    UNCHANGED: badge, h1, sub, boundary line, both CTAs, flow illustration.

### C2 — Capabilities are not demonstrations
The site currently has one list: `products[]`. Four capabilities with status
badges. There is no place where a VERIFIED DEMONSTRATION can live, which is
precisely why the accountability story is unreachable from the homepage.

    NEW SECTION  components/VerifiedDemonstrations/index.tsx
    NEW DATA     data/demonstrations.ts

    Header: "Verified demonstrations" / "What EVE actually did, and what was sealed."
    Distinct from the Products header ("Powered by the same verification engine").

    Entry 1  Provider-backed verification        -> /stories/provider-backed
             One sealed expectation. Two fail-closed refusals. One authenticated
             provider read. Production, not synthetic.
    Entry 2  Accountability continuity           -> /stories/accountability
             The approval still existed. The accountability chain did not.

    Each entry carries an honest kind-label so the two are never conflated:
             PRODUCTION · PROVIDER-BACKED       (provider-backed)
             SCENARIO · LIVE-VERIFIED RECORD    (accountability)

    This label is load-bearing. The accountability story fetches and verifies a
    real sealed record live; ours publishes commitments. Same section, different
    claims, stated.

### C3 — Fail-closed as a first-class engine property
`HowItWorks.properties` lists four engine properties and fail-closed is not one
of them. It appears only as a feature chip. Yet it is the behaviour the whole
provider-backed story demonstrates.

    ADD as a fifth property:

      Fail-Closed
      When a required source is unavailable or a required credential cannot be
      resolved, EVE refuses the verification path. In the provider-backed
      demonstration, no observation or determination was recorded and EVE did
      not downgrade to an unauthenticated read.

    The two sentences are deliberately different in kind: the first states the
    ARCHITECTURAL principle, the second reports the MEASURED outcome of P3 and
    P5. Collapsing them into "EVE refuses and records nothing" would turn a
    result measured on one path into a universal claim about every EVE
    operation.

### C4 — Claim discipline: "Cryptographic Truth"
    data/products.ts · principles[3].title

    Cryptographic Truth   ->   Cryptographic Integrity

The DESCRIPTION is already correct — it speaks of verifiability and source
links, not truth. Only the title overclaims.

Two reasons beyond taste:
- The same file's HowItWorks already uses "Cryptographic Sealing". The site
  currently says both, and only one of them is defensible.
- The provider-backed story's central boundary is that VALID means integrity,
  not truth. Publishing that story beside a principle titled "Truth" puts a
  visible contradiction on the same domain.

CHANGE: one string. The description is NOT edited.

---

## D. SITEMAP / SEO

    app/sitemap.ts

    ADD  { path: '/stories/accountability',     priority 0.8, monthly }
    ADD  { path: '/stories/provider-backed',    priority 0.9, monthly,
           lastModified 2026-08-24 }

    DO NOT ADD  /stories
    Reason: it redirects to /stories/accountability and is not canonical content.
    A sitemap points at the indexable page, never at a URL that immediately
    forwards the visitor.

Neither story is currently in the sitemap. The site's strongest existing
narrative is invisible to search. That is fixed here because it is directly in
scope.

### Deliberately NOT fixed in this release
    /control-chain · /control-chain/agv · /control-chain/energy
    /iso42001/chain-scanner
    /insights/accountability-continuity-checkpoint
    /contact · /origin · /eve-verified sub-routes

These are also missing, and some may be intentionally unlisted — the file
already documents /medical and /pilot as deliberate exclusions. Adding them all
would turn a demo release into a general SEO migration, and would index routes
nobody has decided should be indexed. Each needs its own decision.

RECORDED AS DEBT, not fixed here.

### The hardcoded NOW
`const NOW = new Date('2026-05-24')` is the fallback for every route without an
explicit lastModified. It is stale, but changing the fallback rewrites the
declared modification date of seventeen routes at once, which is a claim about
those pages that this release has not verified.

DECISION: leave NOW alone. Give the three new entries explicit lastModified
dates. Revisit the fallback separately.

---

## E. VERIFICATION BEFORE RELEASE

    1  copy source hash          PUBLIC_EVIDENCE_COMMITMENTS.md must still be
                                 eb49434f...c0219 (v1.1). If not, the copy
                                 changed — stop and decide, do not build.
    2  eighteen digests          each 64 hex characters, never truncated in the
                                 verifiable view; compared against the copy source
    3  npm run build             must pass clean
    4  npm run lint              must pass clean
    5  visual pass               desktop and mobile, both new surfaces
    5b comprehension pass        a reader who does NOT work in governance, GRC
                                 or security reads only the first viewport and
                                 is asked what happened. They should be able to
                                 say, in their own words: EVE decided what it
                                 needed first, refused twice when something was
                                 missing, then checked — and what it needed never
                                 changed. If they cannot, the page fails this
                                 check regardless of how correct it is.
                                 A build cannot self-certify this: it needs an
                                 actual person who was not in the build.
    6  claim scan                no hardcoded value presented as fetched; no
                                 live-verified badge idiom on recorded results;
                                 no "Verify record" button on provider-backed;
                                 no fake terminal, simulated request, spinner or
                                 "verifying..." state anywhere in the interaction
    6b excerpt scan              the two refusal excerpts match the copy source
                                 character for character; neither carries an
                                 identifier; attributions read P3 and P5 in that
                                 order and are not swapped
    7  leak scan                 no host address, path, account name, environment
                                 variable name, organisation identifier or record
                                 id in any published file

Check 7 is not theoretical: the underlying records contain all of those, and
the public copy source was written specifically to exclude them.

---

## F. RELEASE

    git status --porcelain -uall    review every path; never `git add .`
    explicit staging of the changed files only
    commit
    push origin main
    Vercel builds automatically from the linked repo
    live smoke: / and /stories/provider-backed, desktop and mobile

Base was clean at bf7922d8, so any dirty path at commit time is something this
release introduced and must be accounted for.

---

## IMPLEMENTATION DEVIATIONS FROM v1.2

Recorded rather than silently absorbed. A locked model that is quietly exceeded
during the build stops being a lock.

### DEVIATION 1 — app/layout.tsx, metadataBase

    added   metadataBase: new URL('https://eveverified.com')
    when    during verification step E, after the first successful build
    why     The build emitted 22 warnings: Next.js was resolving relative
            social-image URLs against http://localhost:3000 because
            metadataBase was unset. The new story page declares openGraph and
            twitter metadata, so it inherits the site's /og-image.png — which
            would have been emitted as a localhost URL and produced a broken
            share card in production.
    scope   Metadata only. No claim changes, no content changes, no component
            or copy changes.
    note    The warning predates this release and affects 22 pages. This release
            added one more page to that set, which is why it is fixed here
            rather than deferred: it is a defect this work introduced a share of.

### DEVIATION 2 — homepage weighting: evidence before capability

    2a  app/page.tsx — VerifiedDemonstrations moved BEFORE Products, so
        verified evidence precedes capability claims on the homepage.
        v1.2 §C2 placed it after Products; that ordering is superseded.

    2b  components/Hero/index.tsx — the secondary hero CTA was reassigned
        from the generic governance demo to the provider-backed evidence
        story. The live Pre-Action CTA remains primary. The separate quiet
        text link added in v1.2 §C1 was REMOVED, because it pointed at the
        same destination as the new secondary CTA and would have been a
        duplicate.

    why     Measured imbalance. Before this change the pre-action demonstration
            held seven placements on the homepage (navigation item, navigation
            CTA, primary hero button, first product card, StartingPoint CTA and
            two footer links) while the provider-backed story held two.
    scope   Placement and one link target. No copy claims changed, no new
            claims introduced, no component rebuilt for this reason.
    kept    The two entry points remain different in kind, which is the point:
            PRIMARY is live, synthetic and interactive; SECONDARY is a recorded
            production run. A caption under the buttons states that difference
            so the pair is not read as two of the same thing.
    not done  lib/constants.ts is UNTOUCHED. No navigation entry was added:
            navigation is global, and it should change only once the long-term
            structure for demos and stories is decided. The story already has
            high visibility through the hero and the first homepage section.
    reachability  The governance demo remains reachable from the navigation
            ("GRC") and from its own product card. Nothing was removed from the
            site, only reprioritised.

### DEVIATION 3 — pre-existing rendering defect, found during visual QA

    what    components/HowItWorks/index.tsx rendered the literal characters
            \u2014 in the section intro: "The system decides what happens next
            \u2014 EVE does not execute." JSX text children do not interpret
            \u escapes, so the escape sequence was printed on the live homepage.
    scope   ONE line. The em dash replaced the escape sequence. No copy meaning
            changed.
    not a defect  The same escape inside a JavaScript string literal
            ('...the same result \u2014 every time.') IS interpreted by
            JavaScript and rendered correctly. That line was normalised to a
            literal em dash for consistency, but it was NOT broken. Recorded so
            the deviation is not overstated as two fixes.
    left alone  \u2019 on the Witness Mode line is inside a JS string and
            renders correctly. Untouched.
    why fixed here  It is visible on the production homepage today, it is one
            line, and it sits in a file this release already opens. Deferring a
            visible defect in a file we are editing anyway is how such things
            survive for years.

### DEVIATION 4 — section separation and hero caption legibility

    4a  components/VerifiedDemonstrations/index.tsx — the section header was
        replaced with the benchmark's navy statement band (`.proves` idiom).
        Reason: after DEVIATION 2a the section sits directly above Products,
        and two adjacent #f7f8fa bands read as one long light block of six
        cards — the same conflation C2 exists to prevent, mirrored. The band
        also echoes the navy band on the story page the section opens.
        The copy changed by one word only: "The section above describes what
        EVE can do" became "below", because the order changed.
        The heading remains a real <h2>; the band is styling, not a downgrade
        of the document outline.

    4b  components/Hero/index.tsx — the caption under the two CTAs was
        enlarged from text-xs/ent-muted to text-sm/ent-dim, with the two path
        names emphasised. Reason: that caption carries the entire distinction
        between the live synthetic demonstration and the recorded production
        run. At the previous size and contrast it was effectively unreadable,
        so the distinction it exists to make was not being made.

    not done  `Cryptographic Integrity` wraps onto two lines in the five-column
            principles grid while the other four fit on one. Left as is: the
            wording is a claim decision and must not be shortened to fit a
            narrow card. Layout does not get to edit claim language.

### DEVIATION 5 — homepage positioning copy

    5a  hero badge — "Live · Pre-Action Verification Platform" became
        "Live · Evidence Verification for AI & Automated Systems".
        Reason: pre-action is now ONE use of EVE, not the whole of it. The
        badge described the narrower earlier product.

    5b  hero sub — replaced with "EVE verifies real system evidence against
        requirements fixed beforehand — and refuses when required evidence
        cannot be verified." Both halves are demonstrated: the sealed
        expectation and the two fail-closed refusals.

    5c  hero ownership line — added "EVE verifies the evidence. Human-defined
        policy determines what happens next." above the existing "EVE proves
        the chain. The organisation acts on it."
        Reason: EVE is more than a witness — a verified determination is used,
        under human-defined policy, to decide what happens next. That is real
        and is already demonstrated by the pre-action API. But policy is the
        customer's and execution is the workflow's, so the sentence credits the
        policy layer without letting EVE claim either.

    5d  secondary CTA label — "See EVE refuse twice — then verify once" became
        "See the Azure-backed proof", and the caption now names Azure DevOps.
        Reason: a visitor could not tell from the previous wording that the
        second path led to a real run against a real system of record.

    5e  data/demonstrations.ts — kindLabel became "Production · Azure DevOps ·
        Provider-backed" and the summary now names Azure DevOps and the
        completed work item.

    5f  VerifiedDemonstrations band — "The section below describes what EVE can
        do. These are runs that happened…" contradicted its own heading
        "What EVE actually did". Replaced with "These are demonstrations of what
        EVE actually did — with the evidence status stated for each one."

    REJECTED  "Verifiable Control for AI & Automated Systems" as the badge.
            EVE can determine the decision path under human-defined policy, but
            "control" reads as enforcement to a first-time visitor, and the same
            page states four times that EVE does not execute. The stronger
            capability is expressed further down (5c), where there is room to
            attribute it correctly, rather than compressed into a badge.

    scope   Copy and one data label. No component rebuilt, no new interaction,
            no evidence claim beyond what the sealed records already carry.

## VERIFICATION STATUS — honest, not aspirational

    build + typecheck    PASS
                         Compiled successfully; types valid; 37/37 static pages;
                         /stories/provider-backed prerendered as static.
    eslint               NOT CONFIGURED / NOT RUN
                         `npm run lint` prompts for initial ESLint configuration
                         and never executes. The build's own "Linting and
                         checking validity of types" is the Next.js typecheck,
                         not ESLint.
                         Configuring ESLint is deliberately NOT done in this
                         release: it would surface findings across the whole
                         existing codebase and turn a demonstration release into
                         a lint migration. Recorded as technical debt.

### INCIDENT — the lint prompt configured ESLint by accident

    what      Answering the `npm run lint` configuration prompt wrote
              .eslintrc.json. Next.js lints during `next build` whenever a
              config exists, so the next build FAILED on roughly eighty
              pre-existing errors across the site — unescaped entities, unused
              variables, `any` types — in accountability, control-chain,
              iso42001, medical, AskComponents and lib/constants.
    ours      None of the errors came from files this release created or edited.
              All four new/edited source files were checked: no unescaped
              entities in JSX text, no unused constants, no `any`.
    fix       .eslintrc.json removed. The repository is back in the state this
              release was planned against, and the build passes.
    rejected  Fixing ~80 findings (the lint migration we had explicitly
              declined) and setting `eslint.ignoreDuringBuilds` in
              next.config.js. The second is worse than the first: a flag that
              silences linting permanently outlives everyone's memory of why it
              was added.
    lesson    An interactive prompt answered mid-verification changed the
              build's behaviour. A tool that asks a question during a release
              step is a decision point, not a formality.

---

## FILES TOUCHED — complete list

    NEW  app/stories/provider-backed/page.tsx
    NEW  app/stories/provider-backed/ProviderBackedStory.tsx
    NEW  app/stories/provider-backed/EvidenceCommitmentsPanel.tsx
    NEW  components/VerifiedDemonstrations/index.tsx
    NEW  data/demonstrations.ts
    NEW  app/stories/PROVIDER_BACKED_STORY_MODEL.md          (already written)
    NEW  app/stories/WEB_RELEASE_MODEL.md                    (this file)

    EDIT app/page.tsx                one import + one component in the tree;
                                     order changed — DEVIATION 2a
    EDIT components/Hero/index.tsx   secondary CTA retargeted — DEVIATION 2b
    EDIT components/HowItWorks/index.tsx   one array entry;
                                     one rendering fix — DEVIATION 3
    EDIT components/VerifiedDemonstrations/index.tsx  navy band — DEVIATION 4a
    EDIT data/demonstrations.ts      kindLabel + summary — DEVIATION 5e
    EDIT data/products.ts            one string: principles[3].title
    EDIT app/sitemap.ts              two route entries
    EDIT app/layout.tsx              one property — DEVIATION 1, see above

    UNTOUCHED  app/stories/page.tsx · StoriesClient.tsx · lib/constants.ts ·
               ProductCard · StartingPoint · Philosophy component ·
               everything under grc.eveverified.com

---

## OPEN — carried from the story model

1. Whether the P8 determination could ever be exposed for public re-verification.
   Not investigated. Would change the "no Verify button" rule. Do not assume.
2. PAT scope for the read credential is unrecorded. Does not appear on the site,
   but is open in the underlying evidence and should be closed before records go
   out under diligence.
3. Sitemap debt above.
4. /stories redirect and the dead StoriesClient: a separate decision about what
   /stories should be.

---

## WHAT THIS RELEASE DOES NOT DO

- Does not touch grc.eveverified.com. No route, no page, no deploy there.
- Does not replace, migrate or reference PRODUCT-1's synthetic demo as though it
  were this one. The two stay separate and are labelled as different kinds.
- Does not claim live verification anywhere it does not happen.
- Does not fix sitemap debt beyond its own scope.

---

## G. GOVERNED DEVELOPMENT DEMONSTRATION (v1.3 — 2026-09-06)

**Scope:** eveverified.com homepage only — one new entry in the Verified
demonstrations section, one footer contact line. No new page, no navigation
change, no hero change, no component restructuring.

**Copy source (release input):**
    evidence/governed_actions/_review/gov/EVE-GOV-020/EVE_GOV_TASK_RESULT.json
    (the owner act that measured the public deployment; owner-held evidence, not
    in this repository). The measured numbers below come from that record and
    from the hosted deployment it describes. Nothing on the homepage may state a
    number that record does not carry.

**Destination:** https://demo.eveverified.com/actions — a public, read-only
snapshot demonstration. A CNAME to the hosted deployment; same bytes as the
owner's published/ directory (7/7 byte-identical, measured). No live store, no
API, no authentication, no write path.

### G1 — A fourth demonstration kind, and why it is separate

    PRODUCTION_PUBLISHED_SNAPSHOT

A production run of EVE's own governed development: the actions that built the
dashboard, the operator and the publication path were themselves declared,
admitted through pre-action gates, measured, reviewed and only then eligible for
promotion. Selected governed states were published as hash-sealed snapshots.

It is filed as its own kind because its claim is different from all three
existing kinds:

    stronger than SCENARIO_LIVE_VERIFIED   the runs are production, not scenario
    weaker than PRODUCTION_GOVERNED_ACTION the reviewer of every governed task
                                           was the same party that wrote the
                                           change; the review records say
                                           NOT_ESTABLISHED for independence, and
                                           the demonstration shows that field
    different from PROVIDER_BACKED         no provider is read; the evidence is
                                           EVE's own governed state

Filing it under any existing kind would let it borrow a claim it does not make.

### G2 — What "verified in your browser" means, and does not mean

WORDING LOCK. The phrase is permitted only with this meaning: the visitor's
browser re-derives each snapshot's declared hash from the published bytes and
compares it, and checks that the snapshot declares the contract the client
validates. That is verification of PUBLISHED BYTES and of a DECLARED CONTRACT.

It is NOT: "the system is verified", "the actions were audited", "the evidence
is complete", or "tamper-proof". None of those words may appear on the homepage
in connection with this demonstration. The demonstration itself renders three
distinct states — VERIFIED PUBLISHED SNAPSHOT, PUBLISHED SNAPSHOT CONTRACT
MISMATCH, PUBLISHED SNAPSHOT INVALID — and the homepage must not collapse them.

### G3 — The limitation travels with the claim

The card's evidenceNote MUST carry both limitations, visible without a click:

    A snapshot shows what the owner chose to publish at a specific point in
    time; it does not assert that the complete underlying evidence set has been
    exposed or independently reviewed.

The homepage may never be stronger than the demonstration it links to. The
demonstration shows "Independence: NOT_ESTABLISHED" on every action; the
homepage therefore says "independently reviewed" only inside a negation.

### G4 — Measured claims permitted on the card (from the copy source)

    7/7 published files byte-identical after remote hosting        (H2)
    zero requests to any live API or store from the hosted client   (H8, behaviour)
    no default live-API locator found in the delivered client JS    (H8, static —
                                                                    the 9 scripts
                                                                    /actions loads)
    failed runs published as failed: REFUSED, MISSING, UNRESOLVED   (H7)

Not permitted: record ids, hashes, action ids, counts of governed tasks, cost
figures, or any sentence containing "independent" outside a negation.

### G5 — Layer rules applied

    layer1   plain language only, no internal vocabulary:
             "Declared before it was written" · "Admitted through pre-action gates"
             · "Failed runs stay visible"
    layer2   "Published as hash-verifiable snapshots" · "Verified in your browser"
             (meaning fixed by G2) · "No access to the live store" ·
             "7/7 files byte-identical after hosting"
    summary  two sentences; states named in capitals exactly as the
             demonstration renders them
    href     https://demo.eveverified.com/actions — a public destination, like
             grc.eveverified.com in the existing entries; leak-scan rule E7
             concerns internal hosts, paths and identifiers, none of which appear

### G6 — Footer contact

    data/products.ts       company.email = joakim@organiq.se
    components/Footer      one mailto line under the org.nr line

The same address the contact page and grc.eveverified.com already publish.
Reason: a visible, consistent company contact on the homepage; recorded because
it is a public-identity change, not a copy change.

### G7 — DEVIATION recorded: 2 + 1 grid

With three non-featured demonstrations the two-column grid renders two cards
on one row and one alone on the next. The component is NOT changed for
symmetry: layout does not get to edit which claims exist, and a three-column
grid would shrink every card to fit a layout preference. If the section grows
again, the grid is a separate decision.

### G8 — Files touched by v1.3 (complete)

    EDIT app/stories/WEB_RELEASE_MODEL.md              this section; status line
    EDIT data/demonstrations.ts                        new kind + one entry;
                                                       header hash re-pinned to
                                                       THIS file's v1.3 hash
    EDIT components/VerifiedDemonstrations/index.tsx   one ACCENT entry (literal
                                                       classes); comment v1.3
    EDIT data/products.ts                              company.email
    EDIT components/Footer/index.tsx                   one mailto line

### G9 — Verification before release (in this order)

    1  this file's sha256 measured by the owner AFTER it is written; the same
       value pinned in data/demonstrations.ts — a mismatch means the model
       changed after it was pinned: stop and decide
    2  npm run build   must pass clean (typecheck included; ESLint remains
       unconfigured — see the recorded incident)
    3  claim scan      no "audited", "tamper-proof", "verified system",
                       "independent" outside a negation, no hash, no record id,
                       no action id on the homepage
    4  leak scan       no internal host, path, account, environment variable,
                       organisation identifier beyond the public org.nr already
                       shown, or record id in any touched file
    5  stage exactly the five files above; never `git add .`
    6  commit · push origin main · Vercel builds from the linked repo
    7  live smoke      https://eveverified.com/ (section renders, card present,
                       footer email present) · https://demo.eveverified.com/actions
                       (destination reachable; nothing on the homepage claims
                       more than what that page shows)
