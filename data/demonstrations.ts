// ═══════════════════════════════════════════════════════════════════════════
// VERIFIED DEMONSTRATIONS
//
// Distinct from data/products.ts. Products are CAPABILITIES — what EVE can do.
// These are DEMONSTRATIONS — what EVE actually did, and what was recorded.
//
// The two lists must never be merged. A capability describes intent; a
// demonstration describes an outcome that was measured and can be checked.
//
// Governed by:
//   app/stories/WEB_RELEASE_MODEL.md            v1.2
//     752ba0a51191e7640dec0fa7ba1629af50b4f44f5ada877bfd8a27a3110df2ba
//   app/stories/PROVIDER_BACKED_STORY_MODEL.md  v1.2
//     c293fb6fac0f483b0a37659111a074c45ef8196c5de08034a70380eb3a36ff5b
//
// Claim wording originates in the locked copy source and is not composed here.
// ═══════════════════════════════════════════════════════════════════════════

/**
 * The kind label is LOAD-BEARING, not decoration.
 *
 * Two demonstrations can both be honest and still make different claims. The
 * accountability story fetches a sealed record and verifies it while the
 * visitor watches. The provider-backed story publishes commitments to evidence
 * that was verified on a recorded date. Presenting them in one section without
 * distinguishing them would let the weaker claim borrow the stronger one's
 * force.
 *
 * PRODUCTION_PROVIDER_BACKED
 *   A production run. EVE read a real provider over an authenticated
 *   connection. Evidence is published as cryptographic commitments; the full
 *   records are retained for controlled diligence.
 *
 * PRODUCTION_GOVERNED_ACTION
 *   The strongest claim on this list, and it is separated for that reason.
 *   A production run in which a verified determination governed whether an
 *   external workflow performed a real action, and EVE afterwards verified
 *   that the same action had occurred — both halves bound to ONE sealed
 *   requirement. The others verify evidence; this one also shows a decision
 *   and its consequence. Filing it under PRODUCTION_PROVIDER_BACKED would let
 *   the weaker label mask the stronger claim, which is the same defect this
 *   type exists to prevent, in the opposite direction.
 *
 * SCENARIO_LIVE_VERIFIED
 *   A scenario narrative anchored to a real sealed record which is fetched and
 *   integrity-checked live, in the browser, at read time.
 */
export type DemonstrationKind =
  | 'PRODUCTION_PROVIDER_BACKED'
  | 'PRODUCTION_GOVERNED_ACTION'
  | 'SCENARIO_LIVE_VERIFIED'

export interface Demonstration {
  id: string
  /** Short label rendered as the kind badge. Never abbreviated in the UI. */
  kindLabel: string
  kind: DemonstrationKind
  /** The one-line claim. Plain language: no digests, no internal vocabulary. */
  headline: string
  /**
   * Layer 1 of the progressive evidence rule — immediate understanding.
   * A visitor who reads only this has understood the proof.
   */
  layer1: string[]
  /** Layer 2 — what happened, still in plain language. */
  layer2: string[]
  /** Two sentences at most. No hashes, no record ids, no schema versions. */
  summary: string
  href: string
  linkLabel: string
  /**
   * Stated on the card so the two kinds can never be conflated by a reader who
   * does not open the story.
   */
  evidenceNote: string
  /**
   * Renders full width, ahead of the grid. At most ONE demonstration may set
   * this. It is a claim about relative strength, not a layout preference: the
   * featured card is the one a visitor should read if they read only one.
   */
  featured?: boolean
}

export const demonstrations: Demonstration[] = [
  {
    id: 'governed-action',
    kind: 'PRODUCTION_GOVERNED_ACTION',
    kindLabel: 'Production · Governed action · Before + after',
    headline:
      'Insufficient evidence blocked the action. Sufficient evidence allowed it.',
    layer1: [
      'One sealed requirement',
      'A person changed the world between the runs',
      'Verified again afterwards',
    ],
    layer2: [
      'Real provider read',
      'Blocked, then allowed',
      'Real side effect',
      'Verified after the fact',
    ],
    summary:
      'EVE read a real Azure DevOps work item, and the evidence was not ' +
      'sufficient — policy returned block and the external workflow did ' +
      'nothing. A person then moved the work item to Done. The same ' +
      'requirement, the same action, the same workflow: this time the ' +
      'evidence was sufficient, policy returned allow, the workflow acted, ' +
      'and EVE verified afterwards that it had.',
    href: 'https://grc.eveverified.com/chain/governed-action',
    linkLabel: 'See the block, the change, and the verified outcome',
    evidenceNote:
      'Recorded production runs against a real provider. The action changed ' +
      'state in an isolated demonstration target — no real vendor access was ' +
      'granted.',
    featured: true,
  },
  {
    id: 'provider-backed',
    kind: 'PRODUCTION_PROVIDER_BACKED',
    kindLabel: 'Production · Azure DevOps · Provider-backed',
    headline: 'The expectation was sealed before the outcome existed.',
    layer1: ['One expectation', 'Two refusals', 'One verified outcome'],
    layer2: ['Sealed', 'Refused twice', 'Provider-backed verification'],
    summary:
      'EVE sealed what it required before the outcome existed. It refused when ' +
      'required access was unavailable — once for the source, once for the ' +
      'credential — then authenticated to Azure DevOps and verified the completed ' +
      'work item against the unchanged expectation.',
    href: '/stories/provider-backed',
    linkLabel: 'See EVE refuse twice — then verify once',
    evidenceNote:
      'Recorded production verification, published as cryptographic commitments. ' +
      'Not a live check.',
  },
  {
    id: 'accountability',
    kind: 'SCENARIO_LIVE_VERIFIED',
    kindLabel: 'Scenario · Live-verified record',
    headline: 'The approval still existed. The accountability chain did not.',
    layer1: ['An approval on file', 'Facts that changed', 'A question nobody could answer'],
    layer2: ['Approved', 'Changed', 'Accountability gap surfaced'],
    summary:
      'A risk decision was approved and remained on file. Months later the facts ' +
      'had moved and the chain behind the approval could no longer be ' +
      'reconstructed. EVE surfaced the gap rather than deciding what it meant.',
    href: '/stories/accountability',
    linkLabel: 'Read the story',
    evidenceNote:
      'Anchored to a sealed record that is fetched and integrity-checked while ' +
      'you read.',
  },
]
