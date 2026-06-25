# ACCOUNTABILITY STORY — five-act scroll narrative (LOCK before code)
**Status:** locked for build
**Headline:** The approval still existed. The accountability chain did not.
**Form:** SCROLL narrative (not an animation). Governance is narrative, not visual.
**Placement:** TOP of /stories, above the three example cards (AGV/Energy/Governance).
**Source record:** EVE-ISO42001-00004652 (REAL, sealed, valid, namespace iso42001)
**Date:** 2026-06-14

## Why scroll, not animation
AGV works as animation because it is physical (robot moves -> human appears -> DENIED).
Governance is not physical. It is a broken decision chain. The reader must FEEL the gap:
decision exists, evidence exists, but the chain cannot be reconstructed. Scroll reveals
each act in sequence; the UNKNOWN / GAP lands as a full-width beat, not a diagram.

## Maxim's recipe: show the failure FIRST
Acts 1-3 set up the mess and the question. Act 4 is the failure (UNKNOWN -> GAP). Acts 5-6
are EVE's answer: it does NOT decide, it surfaces + requires a human + seals a verifiable
record. The visitor understands EVE is about reconstructing WHY a decision was made.

## The six beats (scroll reveals each)
Honesty: Acts 1-3 are the SCENARIO premise (the real-world mess - no record field claims
them). Acts 4-6 are anchored to real fields in EVE-ISO42001-00004652, fetched LIVE.

ACT 1 - The approval existed
  Beat     A risk decision was approved by a named owner. On record. Signed off.
  Premise  (scenario - the starting point, not a live field)
  Visual   calm, neutral. "APPROVED" in muted green.

ACT 2 - The facts changed
  Beat     Months later the system changed: new vendor, retrained model, widened scope,
           new risk data. The approval never saw any of it.
  Premise  (scenario)
  Visual   the five fragmented systems - Jira / Teams / Email / Vendor portal / GRC sheet.
           Each holds a PIECE of the truth. None holds the chain. Amber, drifting.

ACT 3 - The auditor's question
  Beat     Six weeks later, the auditor asks the only question that matters:
           "Does the previous approval still apply?"
           Six sub-questions appear (who approved / on what evidence / still valid /
           did facts change / who owns the next decision / can you prove it wasn't altered).
  Premise  (scenario - these mirror, but are not identical to, the record's 4 confirmations)
  Visual   the question, large. The five systems cannot answer together.

ACT 4 - UNKNOWN -> ACCOUNTABILITY_CONTINUITY_GAP   <- THE FAILURE
  Beat     The honest answer is not "no". It is UNKNOWN - not because data is missing,
           but because the accountability CHAIN is broken. EVE names it precisely.
  LIVE     result = ACCOUNTABILITY_CONTINUITY_GAP            (record.result)
           trigger_basis (5, each shown):                    (record.trigger_basis)
             approval_scope_mismatch
             authority_invalid_after_changes
             declared_authority_unconfirmed
             accountable_owner_unconfirmed
             last_human_review_stale
  Visual   full-width red beat. UNKNOWN first (large), then the GAP name, then the 5 basis.

ACT 5 - EVE does NOT decide
  Beat     EVE does not say compliant, non-compliant, incident, material, or approved.
           It surfaces the gap and requires a NAMED HUMAN to confirm before the chain
           proceeds. The four required confirmations are shown.
  LIVE     required_human_confirmation (4):                  (record.required_human_confirmation)
             who currently owns the next decision
             under what declared authority
             whether that authority is still valid
             whether the prior approval applies given changed facts
           materiality_assessed_by_eve = false               (record.materiality_assessed_by_eve)
           is_compliance_score = false                        (record.is_compliance_score)
           boundary_note (verbatim)                           (record.boundary_note)
  Visual   the four questions as a checklist a human must answer. EVE-neutrality line.

ACT 6 - The proof
  Beat     The whole chain - the prior approval, the detected gap, its basis, and the
           required human confirmation - is sealed into one tamper-evident record.
           Anyone can re-check it. No login.
  LIVE     record id   = EVE-ISO42001-00004652               (top.eve_id)
           verify      = VALID                                (top.valid)
           seal / timestamp                                   (top.seal, top.payload...)
  Visual   green. record id, VALID badge, "Verify record ->" link to verify.eveverified.com.

## Live field mapping (Acts 4-6 only - Acts 1-3 are premise)
- Act 4 result   <- payload.data.result (ACCOUNTABILITY_CONTINUITY_GAP)
- Act 4 basis    <- payload.data.trigger_basis[] (all 5; has() greys absent values)
- Act 5 confirm  <- payload.data.required_human_confirmation[] (4)
- Act 5 flags    <- materiality_assessed_by_eve=false, is_compliance_score=false
- Act 5 note     <- payload.data.boundary_note (verbatim)
- Act 6 record   <- top.eve_id
- Act 6 verify   <- top.valid (true -> VALID; else "could not verify")

## Honesty locks (same as every EVE surface)
- The verdict is ACCOUNTABILITY_CONTINUITY_GAP - NOT "non-compliant", NOT "breach",
  NOT "incident". is_compliance_score:false. materiality_assessed_by_eve:false, shown.
- Acts 1-3 (approval, five systems, auditor question) are the SCENARIO - labelled as the
  setup, never as live/verified data. The five named systems (Jira/Teams/etc.) are generic
  illustration, not claims about any real org.
- No fabricated hashes. VALID only because the record verifies live; on fetch failure show
  "verifying..." / "could not verify", never a hardcoded VALID.
- Language: "EVE surfaces", never "EVE decides" / "EVE certifies" / "EVE judges materiality".

## Placement on /stories
1. Hero (existing).
2. THE MAIN STORY - this five-act scroll narrative. Full-bleed, immersive.
3. Divider: "Real examples - same pattern, three domains".
4. The three existing cards (Governance / AGV / Energy) as the worked examples.

The visitor reads the failure first (main story), THEN sees three concrete instances of the
same observe -> rule -> verdict -> record -> verify pattern. AGV/Energy stop being "robot/energy
demos" and become evidence the pattern generalises.
