# GOVERNANCE SCENE — proof timeline (LOCK before code)
**Status:** DRAFT for Joakim review · lock before building GovernanceScene
**Principle:** Same engine as AgvScene. Make governance as legible as AGV. The story is
"This approval existed. Nobody could prove it still applied." Every step maps to a real
field in the sealed record. Verdict/record/verify fetched live.
**Source record:** EVE-ISO42001-00004652 (REAL, sealed, valid)
  case_id: SCOPE_CHANGE_OWNER_UNCONFIRMED
  result:  ACCOUNTABILITY_CONTINUITY_GAP
**Date:** 2026-06-14

## The headline (for a human, not a detector)
> This approval existed. Nobody could prove it still applied.

An audit lead, DORA officer, or ISO auditor recognises this instantly. That is the goal —
not "see our Accountability Continuity Detector."

## The three stories side by side (the real point)
| Story      | Human question                         | Verdict                       |
|------------|----------------------------------------|-------------------------------|
| Governance | Does the approval still apply?          | ACCOUNTABILITY_CONTINUITY_GAP |
| AGV        | May the action be performed?            | DENIED                        |
| Energy     | May the settlement proceed?             | HELD                          |
Same EVE core. Different domain. Same proof chain.

## The 9 steps (each anchored to a real record field)
Phase colour: green = settled/approved · amber = facts shifting · red = gap surfaced.
No robot here — the "actor" is the approval/decision chain. Visual = a chain of approval
links; the broken link highlights at the gap.

```
STEP 1  Risk assessment approved
  Visual   Approval link solid (green). Owner named.
  Label    A risk assessment was approved by a named owner.
  Event    risk_assessment_approved
  Data     (scenario) prior approval on record

STEP 2  New vendor added
  Visual   A new node joins the chain (amber tint begins).
  Label    A new vendor is added to the assessed system.
  Event    vendor_added
  Data     (scenario) system composition changed

STEP 3  System scope changed
  Visual   Chain widens; original approval no longer spans it.
  Label    The system's scope changed after approval.
  Event    scope_changed
  Data     trigger_basis: approval_scope_mismatch   ← LIVE

STEP 4  New risk data arrives
  Visual   New facts flow in (amber).
  Label    New risk data arrives that the approval never saw.
  Event    new_risk_data
  Data     trigger_basis: authority_invalid_after_changes   ← LIVE

STEP 5  Prior approval reused
  Visual   Someone points the old approval at the new scope; link strains.
  Label    Someone tries to rely on the prior approval.
  Event    prior_approval_reused
  Data     trigger_basis: last_human_review_stale   ← LIVE

STEP 6  ACCOUNTABILITY_CONTINUITY_GAP
  Visual   The link between approval and current scope breaks (red).
  Label    EVE surfaces an accountability continuity gap.
  Event    accountability_continuity_gap
  Data     result: ACCOUNTABILITY_CONTINUITY_GAP   ← LIVE (record.result)
           basis: accountable_owner_unconfirmed · declared_authority_unconfirmed   ← LIVE

STEP 7  Human review required
  Visual   Red node routes to a named human silhouette.
  Label    A named human owner must confirm before the chain proceeds.
  Event    human_confirmation_required
  Data     required_human_confirmation (the 4 questions)   ← LIVE
           materiality_assessed_by_eve: false   ← LIVE (EVE never decides)

STEP 8  Record sealed
  Visual   The whole chain (incl. the gap) sealed into one record card.
  Label    The full decision trail is sealed, tamper-evident.
  Event    seal
  Data     record: EVE-ISO42001-00004652   ← LIVE (top.eve_id)
           seal / chain_seal   ← LIVE

STEP 9  Cryptographic verification
  Visual   Green VALID badge.
  Label    Anyone can re-check the cryptographic seal. No login.
  Event    verify
  Data     verify: VALID   ← LIVE (top.valid)
```

## Live mapping (steps 3–9 use real record fields)
- Step 3 basis      <- payload.data.trigger_basis includes 'approval_scope_mismatch'
- Step 4 basis      <- 'authority_invalid_after_changes'
- Step 5 basis      <- 'last_human_review_stale'
- Step 6 result     <- payload.data.result (ACCOUNTABILITY_CONTINUITY_GAP)
         basis      <- 'accountable_owner_unconfirmed','declared_authority_unconfirmed'
- Step 7 confirm    <- payload.data.required_human_confirmation[] + materiality_assessed_by_eve:false
- Step 8 record     <- top.eve_id (EVE-ISO42001-00004652) + top.seal + top.chain_seal
- Step 9 verify     <- top.valid (true -> VALID)

Steps 1–2 are the scenario set-up (no live field — they are the story's premise, like
AGV's mission_start/route_assigned). Honest: labelled as the scenario, not as live data.

## Honesty (same locks as AGV)
- The verdict is ACCOUNTABILITY_CONTINUITY_GAP — NOT "non-compliant", NOT "breach".
  EVE surfaces a potential degradation; a human must confirm. is_compliance_score: false.
- materiality_assessed_by_eve: false shown explicitly at step 7.
- No fabricated hashes. VALID only because the record verifies live.
- Language: "EVE surfaces", never "EVE decides" / "EVE certifies".

## Open questions before lock
1. Visual metaphor: a chain of approval links with one breaking, or an approval "stamp"
   that no longer covers the widened scope? Suggest: approval link chain (matches the
   "continuity" language and breaks visibly at the gap).
2. Build GovernanceScene as its own component (like AgvSceneLive is separate), reusing
   the same step/stepper/live-fetch skeleton? Suggest: yes — shared skeleton, domain visuals.
3. Put all three scenes on /stories side by side as the demand test, OR each on its own
   domain page first? Suggest: AGV is already on its domain page; build Governance the
   same way, then place all three on /stories as the comparison.
