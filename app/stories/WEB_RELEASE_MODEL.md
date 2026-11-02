# WEB RELEASE MODEL — provider-backed story + homepage review (LOCK before code)
**Status:** LOCKED FOR BUILD v1.9 — v1.2 locked 2026-08-24; v1.3 locked 2026-09-06 after owner review,
  adding section G (governed-development demonstration). Sections A–F and the recorded deviations are
  unchanged from v1.2 (sha256 752ba0a51191e7640dec0fa7ba1629af50b4f44f5ada877bfd8a27a3110df2ba).
  v1.4 locked 2026-10-31 by owner decision, adding section H (Services page and navigation entry).
  Sections A-G and the recorded deviations are unchanged from v1.3
  (sha256 2f6737eb635c597746c681dae4b853c5d27f93fce6238f1b62fa73a237286b49).
  v1.5 written 2026-10-31 by owner direction, adding section I (Services design prototype, preview only).
  Sections A-H and the recorded deviations are unchanged from v1.4
  (sha256 86d431e6c2ff8d629a19304a8c9def765608118de190a41254e25f32e7bb0b86).
  v1.6 written 2026-10-31 by owner direction, adding section J (EVE Verified Lab, three case studies).
  Sections A-I and the recorded deviations are unchanged from v1.5
  (sha256 3ab1f2d18157951ca8020c08dbbbeaf7c035af2f59c2a99f1fade38f822bf5c4).
  v1.7 written 2026-10-31 by owner GO, adding section K (scroll-driven presentation and colour themes of /services).
  Sections A-J and the recorded deviations are unchanged from v1.6
  (sha256 f4c599ad589e2ee46a5369cbf5e3e8694633511aa4dfb5e89acd4447c00448d7).
  v1.8 written 2026-11-02 by owner GO (preview only), adding section L (CETaS article in /insights).
  Sections A-K and the recorded deviations are unchanged from v1.7
  (sha256 523a5a5807e93d9c5dd442089510a988c44ba68ad8d723ec927d14d6e6ee86c2).
  v1.9 written 2026-11-02 by owner GO (R1 only, preview only), adding section M (link and sitemap cleanup).
  Sections A-L and the recorded deviations are unchanged from v1.8
  (sha256 6709a34ceedcbcb5c87bf9af18e3f4e091ff8f18513dd3617886690f57233d40).
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

---

## H. SERVICES PAGE AND NAVIGATION ENTRY (v1.4 - 2026-10-31)

**Scope:** eveverified.com only. One new page (/services), one top-level
navigation entry, one sitemap entry. No homepage change, no hero change, no
component change, no change to any existing page or demonstration.

**Copy source (release input):** the owner work order "eveverified.com -
Services page (Technical Review)" of 2026-10-31, page copy section, used
verbatim. Page metadata title and description are owner decisions recorded in
H3. No claim, metric, customer name or wording beyond that copy is added.

**Destination:** https://eveverified.com/services - a static page. Its only
form path is the existing CTA target /contact. Three external links point to
public GitHub resources (H4).

### H1 - Navigation entry: owner decision, DEVIATION 2 not resolved

    lib/constants.ts   navItems: { name: 'Services', href: '/services' }
                       placed after 'Verify', before 'More'; no children

The Services entry is an OWNER DECISION. It does NOT resolve DEVIATION 2.
DEVIATION 2 states that navigation should change only once the long-term
structure for demos and stories is decided. That decision has not been made;
this entry neither makes it nor depends on it. Every other navItems entry is
unchanged.

### H2 - Page structure

    app/services/page.tsx   server component; shell as app/page.tsx
                            (bg-ent-bg, Navigation, sections, Footer);
                            ent-* classes as app/contact/page.tsx and
                            components/StartingPoint; no framer-motion

Services are a typed array at the top of the file:

    type NamedItem = { name: string; description: string }
    type Service   = { name: string; summary: string;
                       reviewAreas: NamedItem[]; engagementContents: NamedItem[];
                       cta: { label: string; href: string } }

One entry: Technical Review. Adding a service is adding one array entry. No
placeholder or "coming soon" entries. The lead-ins "Review areas include:" and
"Every engagement includes:" are fixed strings in the render code, not fields.

Shared sections outside the array: "Public technical work", "How an
engagement works", "What this is not".

CTA: "Discuss an engagement" followed by U+2192, target /contact (the existing
Resend-backed contact form; app/api/contact/route.ts is not touched).

### H3 - Metadata

app/layout.tsx defines title as a plain string, not title.template. Therefore,
per owner decision:

    title        'Services | EVE Verified'
    description  'Bounded engagements with a fixed scope and a fixed deliverable.'

### H4 - External links

Three links in "Public technical work", owner-verified and re-measured
2026-10-31, used exactly as written (no tracking parameters):

    Public comment #77
      https://github.com/LFDT-ProofOfControl/ov-poc-standard/issues/77
    Public comment register
      https://github.com/LFDT-ProofOfControl/ov-poc-standard/blob/master/docs/reviews/public-comment-register-2026-10.md
    Reproducible technical analysis
      https://github.com/LFDT-ProofOfControl/ov-poc-standard/issues/66#issuecomment-6056765203

Rendered with target="_blank" rel="noopener noreferrer", following the
existing precedent for links that leave the site (app/insights/page.tsx,
app/origin/page.tsx, app/solutions/tprm/TprmClient.tsx). The ent-* homepage
components carry no precedent: their external links are all first-party
*.eveverified.com subdomains.

### H5 - Wording notes

"checked independently" is kept verbatim by owner decision. The G4 rule
("independent" only inside a negation) is scoped to the homepage card and does
not govern this page.

### H6 - Sitemap

    app/sitemap.ts   { path: '/services', priority: 0.7,
                       changeFrequency: 'monthly',
                       lastModified: new Date('2026-10-31') }
                     Top-level group, after /philosophy

### H7 - Tracking

No EVE-GOV act record was made for this release. The ACCEPTED_BASELINE_WEB
series was not advanced. This section is the release record.

### H8 - Files touched by v1.4 (complete)

    EDIT app/stories/WEB_RELEASE_MODEL.md   status block; this section
    EDIT data/demonstrations.ts             pin block (version, hash, date)
                                            re-pinned to THIS file's v1.4 hash
    EDIT lib/constants.ts                   one navItems entry
    EDIT app/sitemap.ts                     one route entry
    NEW  app/services/page.tsx

### H9 - Verification before release (in this order)

    1  this file's sha256 measured AFTER it is written; the same value pinned
       in data/demonstrations.ts - a mismatch means the model changed after it
       was pinned: stop and decide
    2  npm run build   must pass clean (typecheck included)
    3  stage exactly the five files above; never `git add .`
    4  commit on the working branch; push, merge into main and production
       publication each require separate owner approval
    5  live smoke after an approved publication: https://eveverified.com/services
       renders; Services appears in the navigation on desktop and mobile; the
       CTA opens /contact; the three external links resolve

---

## I. SERVICES DESIGN PROTOTYPE - EVIDENCE SYSTEMS (v1.5 - 2026-10-31)

**Scope:** /services and its sub-routes only. Branch + Vercel preview only. No merge, no
deployment to production, no release without a separate OWNER-GO. Home page, global
navigation (lib/constants.ts, components/Navigation), components/Footer, /pilot (page, form,
/api/pilot, links), all existing APIs, app/globals.css, tailwind.config.ts and the site theme
are NOT touched.

**Copy source (release input):** owner direction "EVE VERIFIED SERVICES DESIGN" of 2026-10-31
(palette, three branches, price line, branch boundaries), the owner's pilot copy of 2026-10-31,
and the verbatim v1.4 section H copy where listed in I3. Copy written for the prototype is
listed in I4 as PROPOSED and needs owner review before any release.

**Destination:** preview deployment of this branch. Production /services keeps the v1.4 page
until a separate OWNER-GO.

### I1 - Owner decisions applied

    branches   Agent Verification Review, Pilot Partnerships, EVA Business Workflows
    price      Agent Verification Review: "From EUR 4,500" (rendered with the euro
               sign U+20AC) + "depending on scope";
               no package deliverable is specified beyond the v1.4 copy
    pilot      Pilot Partnerships is a new commercial offer, separate from the old
               /pilot programme; it does not link to /pilot
    EVA        described as custom development and qualification, not production-ready
               automation (Phase A, 2026-10-31: EVA is demo scope; FlowWink not reviewed)
    CTA        every CTA targets /contact (existing form; app/api/contact untouched)

DEVIATION 2 is not affected: no navigation entry is added or changed.

### I2 - Visual identity "Evidence Systems" (scoped)

    palette    Signal Orange #D95724, Warm Ivory #F3ECDD, Graphite #282A27,
               Olive Grey #777868, Sand #D3C6AD - used as Tailwind arbitrary values
               inside app/services only; no theme token added
    fonts      IBM Plex Sans (UI/body), IBM Plex Mono (labels, indices, technical
               detail), Source Serif 4 (large headings); self-hosted latin woff2
               files in app/services/fonts, loaded with next/font/local in
               app/services/layout.tsx and exposed only as CSS variables
               --ev-font-sans/-mono/-serif
    rationale  Plex was drawn for engineering and industrial use and has a matching
               mono for technical detail; Source Serif 4 optical sizes keep large
               headings sober at display size. All three are SIL OFL 1.1
               (notice: app/services/fonts/OFL-NOTICE.txt)
    motifs     verification chain (the seven stages of the public EVE README core
               model) inside a dashed "Agreed scope" boundary; evidence card showing
               the structure of the written review (field names only, no values);
               dashed scope-boundary boxes; orange square markers
    excluded   generic AI imagery; invented statuses, hashes, record ids, counts,
               customer names or metrics

Contrast (WCAG 2.1, measured on the palette): Graphite on Ivory 12.31, Graphite on Sand
8.58, Ivory on Graphite 12.31, Sand on Graphite 8.58, Orange on Ivory 3.34, Orange on
Graphite 3.68, Olive on Ivory 3.82. Rule applied: body text only in the first four
pairs; Signal Orange only for non-text marks and text of 24px or larger; Olive Grey only
for rules and borders. Focus: 2px Signal Orange outline on every link and button.

### I3 - Copy reused verbatim from v1.4 section H

Summary paragraph of the former "Technical Review" (now under Agent Verification Review),
"Review areas include:" with the five areas, "Every engagement includes:" with the three
items, the whole "Public technical work" section with the three H4 links (target="_blank"
rel="noopener noreferrer"), "How an engagement works", "What this is not", and the line
"Bounded engagements with a fixed scope and a fixed deliverable."

### I4 - Copy written for the prototype (PROPOSED, owner review required)

    hero H1            "Can you prove your AI agent was authorized to act?"
                       (from the commercial decision document, status proposed)
    branch lines       the one-line descriptions of the three branch cards
    chain caption      "Each transition is inspected on its own. Evidence does not
                       establish a claim by itself, and authorization is not proof
                       that the action occurred." (paraphrase of the public README)
    kickers/labels     "EVE Verified / Services", "Three service branches",
                       "Version-bound technical review", "Pilot partners wanted",
                       "Custom development and qualification", "Public record",
                       "Process", "Limitations", "Agreed scope", "Written review"
    review card        seven field names and "The structure every report follows.
                       Findings are separated from interpretation."
    pilot              owner copy of 2026-10-31 verbatim, plus "Scope and pricing
                       agreed per partnership"
    EVA                intro sentence, four example names from the owner direction,
                       "Scope boundary" sentence, "Discuss a workflow"
    closing            "Start with a scoped conversation."
    metadata           description, openGraph and twitter title/description for
                       /services (fixes the v1.4 follow-up: share card inherited
                       from the home page)

### I5 - Isolation, measured on the local dev server before commit

    /           body font Inter, body bg rgb(11,17,32), Plex not loaded
    /contact    body font Inter, body bg rgb(11,17,32), Plex not loaded
    /services   body font Inter, nav link font Inter (unchanged); Plex loaded and
                used only inside the services content wrapper
    width       no horizontal overflow at 1440px and 390px (scrollWidth = viewport)
    typecheck   tsc --noEmit: exit 0

DEVIATION recorded: the first preview build (commit 9fed090, Vercel
dpl_33mP7EMErWrBfR9Dw5tfynrkwoZ5) failed in next/font/google while loading IBM Plex
Sans ("TypeError: Cannot read properties of null (reading '1')" at
@next/font/dist/google/loader.js:112, a font URL without a file extension). The local
build of the same commit compiled, so the result depended on the Google Fonts
response. Fix: the four font files are committed and loaded with next/font/local; the
build no longer fetches fonts. Local build after the fix: "Compiled successfully";
page-data collection still stops on the pre-existing missing RESEND_API_KEY
(app/api/contact, app/api/pilot), as recorded in v1.4.

### I6 - Tracking

No EVE-GOV act record was made for this release. The ACCEPTED_BASELINE_WEB series was not
advanced. Atlas roadmap not changed. The prototype and its boundaries are documented in the
Atlas 02_ACTIVE_WORK zone.

### I7 - Files touched by v1.5 (complete)

    EDIT app/stories/WEB_RELEASE_MODEL.md   status block; this section
    EDIT data/demonstrations.ts             pin block re-pinned to THIS file's v1.5 hash
    EDIT app/services/page.tsx              Evidence Systems layout, three branches
    NEW  app/services/layout.tsx            scoped fonts as CSS variables
    NEW  app/services/fonts/IBMPlexSans-latin-var.woff2
         e2291e842cf5af167122a22881a740c7f2dda7716f1e8cd76680264f4a859470
    NEW  app/services/fonts/IBMPlexMono-latin-400.woff2
         08949f728dc52d528e69b1667d15c89a5686a4ee9a296ff90983985f99c380f7
    NEW  app/services/fonts/IBMPlexMono-latin-500.woff2
         01d285447409c8a588692162439a038b8cbd7871309ee20267b0d2d91c6e8e22
    NEW  app/services/fonts/SourceSerif4-latin-var.woff2
         f2ea9c12d2fe9bd3a9589b02ad2c0909da88f30938c91adc838c4f4098f9f9e0
    NEW  app/services/fonts/OFL-NOTICE.txt

### I8 - Verification before any release (in this order)

    1  this file's sha256 equals the pin in data/demonstrations.ts
    2  Vercel preview build of the branch commit READY (build of record)
    3  owner review of the preview on desktop and mobile, and of the I4 copy
    4  claim scan: no invented status, metric, customer or certification claim
    5  separate OWNER-GO for merge into main and production publication

---

## J. EVE VERIFIED LAB - THREE CASE STUDIES ON /services (v1.6 - 2026-10-31)

**Scope:** one new section "EVE Verified Lab" on /services, placed after the three service
branches and directly before "Public technical work", plus a 32px column-alignment fix
(gap-x-4) in the four section bodies built in v1.5. No new route, no navigation change, no
change to any other page, API, global style or demonstration.

**Copy source (release input):** owner work order "EVE Verified - Services Lab case studies",
owner decisions of 2026-10-31 (three cards with separate roles; HR-1 to HR-9 as a separate
card; review cost not shown publicly), and the owner brief "LAB_CASE_STUDIES_BRIEF_2026-10-31"
(card structure and claim locks). Every sentence was checked against registered Atlas
records (zone 01_AUTO_SYNC) and corrected where the records differ (J2). This section was
revised once before release; the earlier unreleased v1.6 preview (two cards) is superseded.

**Destination:** /services#lab.

### J1 - Card structure (labCases data in app/services/page.tsx)

    fields   id, kind, title, summary, flow?, flowNote?, happened[], facts[], limits,
             services[]
    layout   per card: title, summary, "What happened", "Measured result", "Limits",
             related service links; cards stacked; two columns inside a card on desktop
    A        "AI agents reviewing and improving each other's work"   (2026-10-20 run)
    B        "AI reviewers finding real defects in an AI-built task runner" (HR-1 to HR-9,
             2026-10-29)
    C        "Evidence sync: about 16 minutes to under 5"             (2026-10-31 run)
    links    A, C -> Agent Verification Review; B -> Agent Verification Review and
             EVA Business Workflows. No claim that either service is production-qualified.

### J2 - Evidence-to-claim map and corrections

Card A - verified-handoff record (2026-10-20) and review-phase result record.

    write/review/correct cycle, two agents            CONFIRMED
    reviewer "supplied a script that reproduces"      CONFIRMED  owner draft "proposed corrections"
                                                                 NOT used: the developer wrote the
                                                                 fixes
    four defect categories                            CONFIRMED
    21 passed -> 28 passed                            CONFIRMED
    replay: 1 accepted, 5 rejected                    CONFIRMED  3 of 5 refused by package /
                                                                 single-use checks, 2 by EVE; copy
                                                                 says "EVE handoff verification
                                                                 together with package integrity
                                                                 checks"
    small validator written for the exercise          CONFIRMED  domain not named on the page
    same model; independence not established          CONFIRMED  "independent" not used positively
    not admitted or stopped live by EVE               CONFIRMED  post-hoc replay

Card B - five review-round records, resolution tables, review-request generator, install
document (registered copy), enable record, first unattended period result (2026-10-29).

    package: takes owner-approved tasks, runs them    CONFIRMED  built by the developer agent;
    through the verification chain, reports results              three helper modules by another
                                                                 agent were included unchanged
    one agent reviews, a second checks the review     CONFIRMED  "a second agent checked each
                                                                 review" - not "accepted"
    owner signed each review period before it ran     CONFIRMED  signature on the period, not on
                                                                 the outcomes
    5 rounds, 9 sessions, 6 REJECT with blocking      CONFIRMED  R1 HR-1 REJECT, HR-2 REJECT;
    findings, 3 ACCEPT, accepted in round 5                      R2 HR-3 ACCEPT, HR-4 REJECT;
                                                                 R3 HR-5 REJECT, HR-6 REJECT;
                                                                 R4 HR-7 ACCEPT, HR-8 REJECT;
                                                                 R5 HR-9 ACCEPT
    three defect examples                             CONFIRMED  first example worded as "a result
                                                                 whose evidence did not match was
                                                                 still counted as reported"
    fixes, resubmission, one resolution table         CONFIRMED  the table overstated what was
    wrong and caught                                             included
    installed and switched on the same day after      CONFIRMED  an earlier "installed, not
    owner approval; first unattended period: three               switched on" reading reflected
    small tasks, each accepted by the reviewing                  an earlier moment the same day;
    agent, no one stepping in                                    the tasks were small and done by
                                                                 a worker agent
    reviewers same model, same provider               CONFIRMED  "not independent review"
    review cost                                       NOT SHOWN  owner decision

Card C - synchronisation live-run record, both revision reports, both code reviews, owner
installation approval (2026-10-31).

    cause: more than 3,600 checks one after another   CONFIRMED
    up to four checks in parallel, same rules,        CONFIRMED  four approved; higher
    nothing published if a check fails                           concurrency not approved
    reviewer from a different AI provider; seven      CONFIRMED  provider from the registered
    points, chiefly the shared-login refresh risk;               project pointer; "independent"
    serialised, tests added, accepted; reviewer did              NOT used; reviewer name not
    not run the tests                                            published
    tests on the production machine; previous         CONFIRMED
    version kept for rollback
    faulty existing test, failed for old and new      CONFIRMED  documented; corrected copy used
    about 16 min -> 4 min 50 s; 3.3x; 3,678; 0        CONFIRMED  one live run; no authentication
    errors                                                       or rate-limit lines in its log

### J3 - Leak and claim scans (app/services/page.tsx, before commit)

    leak scan   no local or server paths, host names, IP addresses, workspace or account ids,
                e-mail, agent ids, record ids, run/period/mandate ids, hashes, git refs,
                Drive ids, reviewer names, model or provider names, cost figures, internal
                labels or the agent framework name: 0 hits
    claim scan  "independen*", "certif*", "audit*", "guarantee", "autonomous",
                "self-improv*", "production-ready", "fully", "proven", "secure": only in
                negations or in copy approved in v1.4

### J4 - Verification before commit

    typecheck   tsc --noEmit: exit 0
    isolation   / and /contact: Inter, no services fonts; /services nav: Inter (unchanged)
    width       no horizontal overflow at 1440px and 390px
    visual      desktop and mobile screenshots reviewed

### J5 - Tracking

No EVE-GOV act record; ACCEPTED_BASELINE_WEB not advanced; Atlas roadmap unchanged.

### J6 - Files touched by v1.6 (complete)

    EDIT app/stories/WEB_RELEASE_MODEL.md   status block; this section
    EDIT data/demonstrations.ts             pin block re-pinned to THIS file's v1.6 hash
    EDIT app/services/page.tsx              Lab section, labCases data, alignment fix

### J7 - Release (owner GO of 2026-10-31, conditional)

    1  this file's sha256 equals the pin in data/demonstrations.ts
    2  Vercel preview build of the branch head READY (build of record)
    3  pull request opened; merged as a merge commit only if 1-2 pass and no deviation
    4  production check: /services 200, the three cards and the contact link present
    5  result recorded in the Atlas 02_ACTIVE_WORK zone

---

## K. SCROLL-DRIVEN PRESENTATION AND COLOUR THEMES OF /services (v1.7 - 2026-10-31)

**Scope:** presentation only on /services. No copy, figure, link, claim or route is added,
removed or changed, except the theme switch labels ("Theme", "Evidence", "Light", "Dark").
No change to the home page, navigation, footer, /pilot, APIs, globals.css,
tailwind.config.ts or other pages. Branch + Vercel preview; merge and production
publication need a separate OWNER-GO.

**Source:** owner requests 2026-10-31: a modern scroll experience ("stop, scroll sideways,
grow into view", "more effect when scrolling into a new part") instead of "a long PDF"; all
colours as CSS variables so themes can be swapped easily; for now the FlowWink light and
dark colours plus the current Evidence palette, until colours are decided.

### K1 - Effects

    hero       pinned (240vh) while the seven verification-chain stages light up one by one;
               an orange line fills along the chain; at the end the hero recedes (scale
               0.93, opacity 0.35) as the next part takes over
    branches   pinned horizontal track: the three branch cards move sideways while the page
               scrolls down; a progress line shows position; height = 100vh + 1.25 x track
               overflow (measured at runtime)
    headings   every section heading builds up word by word when it enters the view
    lab        each case-study card opens from the bottom edge (clip reveal)
    figures    Lab "Measured result" values that contain exactly one number count up to
               that number once; the final text is always the original string; values
               with several numbers are shown unchanged
    other      section heading blocks fade and rise into view once

Not built: stacked sticky Lab cards (cards are taller than a laptop viewport; a sticky
stack would hide their lower part).

### K2 - Colour themes

    file       app/services/theme.css, imported only by app/services/layout.tsx; every
               colour on /services is a var(--ev-*) token; no colour code remains in the
               components
    themes     evidence  owner palette of 2026-10-31 (default)
               light     FlowWink default light tokens (flowwink src/index.css :root,
                         commit 30e3648c)
               dark      FlowWink default dark tokens (same file, .dark)
    tokens     bg, bg-alt, surface, text, border, border-strong, rule, accent, callout,
               ink, on-ink, on-ink-muted, accent-on-ink
    ink        dark bands (hero, public record, closing) and card header bars carry class
               ev-ink; inside them --ev-accent switches to --ev-accent-on-ink
    default    DEFAULT_THEME in app/services/layout.tsx
    switch     "Theme: Evidence / Light / Dark" buttons in the hero; the choice is stored in
               localStorage (ev-theme) and applied before paint by an inline script in
               the services layout; buttons expose aria-pressed

Measured contrast (WCAG 2.1) of the FlowWink themes as used:

    light   text on bg 16.68, on bg-alt 14.54, on surface 17.06; on-ink on ink 16.64;
            on-ink-muted on ink 6.44; accent on bg 12.08; accent-on-ink on ink 6.4
            (FlowWink light primary on ink would be 1.51 - hence accent-on-ink)
    dark    text on bg 16.64, on bg-alt/surface 15.22; on-ink on ink 12.70; on-ink-muted
            on ink 4.91; accent on bg 6.20, on surface 5.67, on ink 4.73
    evidence unchanged from section I2

### K3 - Accessibility and fallbacks

    reduce motion   prefers-reduced-motion: all effects off, static layout, plain headings
                    and final figures
    mobile/tablet   below 1024px: no pinning and no horizontal track; reveals only
    keyboard        focusing a branch card in the horizontal track scrolls the page to the
                    point where that card is visible
    screen readers  word-reveal headings keep their text; counted figures expose the final
                    value in a visually hidden span, the animated digits are aria-hidden
    content         all text stays in the server-rendered HTML

### K4 - Implementation

    NEW  app/services/ServicesMotion.tsx   client components HeroChain, BranchesTrack /
                                           PinnedBranches, Reveal, WordReveal, ClipReveal,
                                           CountUp, ThemeSwitch; framer-motion (existing
                                           dependency, no new package)
    NEW  app/services/theme.css            three themes as CSS variables
    EDIT app/services/layout.tsx           data-ev-theme wrapper, default theme, stored
                                           choice applied before paint
    EDIT app/services/page.tsx             colours as tokens; hero and branches via the
                                           client components; headings, Lab cards and
                                           figures animated; theme switch in the hero

Deviations found during the build and fixed before commit: (1) the horizontal track first
bound its scroll progress before the pinned section existed and barely moved; it is now a
separate component mounted only when pinning is active. (2) A token conversion script
emptied two files once; both were restored from git and converted again; the result was
checked by line counts and a full visual pass.

### K5 - Verification before commit (local dev server, Playwright, Chromium)

    desktop 1440x900   hero stages light 1 -> 7; track 0 -> -653px with the third card fully
                       visible; no horizontal page overflow (scrollWidth 1440)
    themes             evidence, light and dark render; stored choice applied (attribute
                       read back); home page has no data-ev-theme and is unchanged
    reduced motion     static layout
    mobile 390x844     static layout, scrollWidth 390
    console            no page errors
    typecheck          tsc --noEmit: exit 0

### K6 - Tracking

No EVE-GOV act record; ACCEPTED_BASELINE_WEB not advanced; Atlas roadmap unchanged.

### K7 - Files touched by v1.7 (complete)

    EDIT app/stories/WEB_RELEASE_MODEL.md   status block; this section
    EDIT data/demonstrations.ts             pin block re-pinned to THIS file's v1.7 hash
    EDIT app/services/page.tsx
    EDIT app/services/layout.tsx
    NEW  app/services/ServicesMotion.tsx
    NEW  app/services/theme.css

---

## L. INSIGHTS ARTICLE - AGENTIC AI AND VERIFIABLE BOUNDARIES (v1.8 - 2026-11-02)

**Scope:** one new article route /insights/agentic-ai-verifiable-boundaries, one new entry
in the existing Insights list (app/insights/page.tsx), one sitemap entry. No other page,
navigation, footer, API or global style is changed. Branch + Vercel preview + pull request;
merge and production publication need a separate OWNER-GO.

**Copy source (release input):** owner draft DRAFT_EVE_CETAS_VERIFIABLE_BOUNDARIES_ARTICLE_2026-11-02
(Atlas 02_ACTIVE_WORK) and owner GO of 2026-11-02. The "What we have demonstrated" section
was rewritten to the wording that registered Atlas records support (L2).

**Destination:** /insights/agentic-ai-verifiable-boundaries; listed first on /insights.

### L1 - Source attribution

Rick Hennessy and Carolyn Ashurst, "Behavioural Assurance of Agentic AI for Sensitive and
High-Stakes Organisations", CETaS, The Alan Turing Institute, September 2026. Title,
authors, publisher, month, the eight behavioural failure categories (including goal
displacement, misreporting, policy-invisible violations and pseudo-corroboration) and the
argument that behaviour, not only final output, must be assessed were verified by the owner
against the original PDF. The article states that EVE Verified is not affiliated with CETaS
or The Alan Turing Institute and that the authors have not reviewed or endorsed EVE.

### L2 - EVE claims checked against registered Atlas records (01_AUTO_SYNC, 2026-11-02)

    C1 agents and handoff check       CONFIRMED  owner-approved, bounded runs with OpenClaw- and
                                                 Hermes-based agents; EVE's verified-handoff check
                                                 ran inside the execution chain before each
                                                 receiving agent started (first on 2026-10-22);
                                                 producer-tested, not independently verified.
                                                 The earlier 2026-10-20 case was a post-hoc replay
                                                 and is not what this sentence describes
    C2 CHAIN_VERIFIED                 CONFIRMED  meaning stated: the recorded chain is complete and
                                                 consistent within the chain verifier's checks;
                                                 not a statement that the code is correct
    C3 reviewer rejection             PARTIAL    rewritten: rejection can rest on an unmet
                                                 acceptance criterion; no claim that the reviewer
                                                 found the defect on its own
    C4 interrupted run, cost          CONFIRMED  as a documented risk found by code analysis, not
                                                 a production incident; stricter journal under
                                                 qualification
    C5 gateway after client exit      CONFIRMED  as source analysis and isolated tests; not
                                                 measured in production; stated as a principle
    C6 credentials                    REPLACED   documented risk, not an observed incident;
                                                 published only as the least-privilege and
                                                 credential-isolation principle; no environment
                                                 details, exposure paths or open items
    C7 DURING v1                      CONFIRMED  defines contracts, observations, assessments and
                                                 directive-outcome links; does not execute or stop
                                                 actions; not yet used in agent runs
    C8 correction loop, hardening     CONFIRMED  built and tested in isolation, under
                                                 qualification, not production-proven

### L3 - Design

Same Evidence identity as /services: self-hosted fonts from app/services/fonts and colour
tokens from app/services/theme.css, applied by an article-scoped layout; Reveal and
WordReveal from app/services/ServicesMotion.tsx. No new dependency.

### L4 - Scans and checks before commit (local dev server, Playwright, Chromium)

    leak scan    no internal record ids, version strings, host names, paths, hashes, reviewer
                 names, credential details or internal labels in the article: 0 hits
    claim scan   no certification, independent-verification or production-readiness claim
                 outside a negation
    render       desktop 1440px and mobile 390px: one h1, h2 order as above, no horizontal
                 overflow; no console errors
    metadata     title, description, canonical, og:type article, JSON-LD Article with citation
    links        CETaS link (target _blank, rel noopener noreferrer) and /contact present
    listing      /insights links to the article; sitemap.xml contains it
    typecheck    tsc --noEmit: exit 0

### L5 - Tracking

No EVE-GOV act record; ACCEPTED_BASELINE_WEB not advanced; Atlas roadmap unchanged.

### L6 - Files touched by v1.8 (complete)

    EDIT app/stories/WEB_RELEASE_MODEL.md   status block; this section
    EDIT data/demonstrations.ts             pin block re-pinned to THIS file's v1.8 hash
    EDIT app/insights/page.tsx              one list entry
    EDIT app/sitemap.ts                     one route entry
    NEW  app/insights/agentic-ai-verifiable-boundaries/page.tsx
    NEW  app/insights/agentic-ai-verifiable-boundaries/layout.tsx

## M. R1 - BROKEN LINKS, UNUSED ANCHORS, /eve-verified AND SITEMAP (v1.9 - 2026-11-02)

**Scope:** release R1 of the site cleanup proposal of 2026-11-02 (Atlas 02_ACTIVE_WORK,
WEB_SITE-CLEANUP_2026-11-02). Website only. No change to EVE Core, VHR, DURING, Atlas
governance or the agent platform. No page copy, design, API or form is changed. No file is
deleted. Branch + Vercel preview + pull request; merge and production publication need a
separate OWNER-GO. R2-R6 have direction approval only and are not part of this section.

### M1 - Baseline (crawl of 32 routes, local server, Playwright, Chromium)

Two broken internal targets were found; every other internal link resolved:

    #codegate        footer on every page; the CodeGate product has no page, and the footer
                     fell back to `#${product.id}`, an anchor that exists on no page
    /#architecture   navigation "More > Architecture"; the id exists only in an
                     unreferenced component (components/EVECore), not on the home page

/eve-verified posts to a local-only verification endpoint and cannot complete for any
visitor; the public verification service is verify.eveverified.com. The sitemap listed
/eve-verified and /about (a redirect to /about/what-is-eve) and omitted the published
article /insights/accountability-continuity-checkpoint.

### M2 - Changes

    EDIT components/Footer/index.tsx   a product without href is rendered as plain text
    EDIT lib/constants.ts              Architecture -> /#how-it-works (the home section that
                                       carries the chain and architecture properties)
    EDIT next.config.js                /eve-verified -> https://verify.eveverified.com, 301;
                                       app/eve-verified is kept as development history
    EDIT app/sitemap.ts                remove /eve-verified and /about; add
                                       /insights/accountability-continuity-checkpoint with
                                       lastModified 2026-06-14 (its last commit date);
                                       ASK entries kept (ASK is not unpublished)
    EDIT data/demonstrations.ts        pin block re-pinned to THIS file's v1.9 hash

### M3 - Code without importers: listed, not removed

No importer was found for components/AgentNode, components/BRFViz, components/EVECore,
components/MarinaViz and components/AskComponents.tsx. All are older implementations or
belong to ASK; they are kept under the owner rule to preserve older implementations. Any
removal is a separate decision.

### M4 - Checks (local production build, next start, Playwright, Chromium)

    typecheck   tsc --noEmit: pass
    build       next build: pass (local placeholder values for the mail and database
                environment variables; they are not part of the change)
    crawl       31 routes (/eve-verified now redirects off-site): 0 missing anchors
                (baseline, 32 routes: #codegate on 30 pages, /#architecture in the
                navigation); the only remaining finding is /stories, see M5
    redirect    GET /eve-verified -> 301, location https://verify.eveverified.com/
    sitemap     20 URLs, all 200 on the local build
    visual      desktop 1440px and mobile 390px: footer CodeGate renders as text in the same
                style; /#how-it-works lands at the section top

### M5 - Observed, not changed (outside R1)

/about and /stories use a server-side redirect inside a prerendered page; both the local
build and production answer 307 without a Location header and the browser follows client-
side. Crawlers that do not run JavaScript do not follow. Candidate for a later release
(config redirect), not part of R1.
