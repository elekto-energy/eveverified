# PROOF-TIMELINE MODEL v2 — AGV (LOCKED 2026-06-14)
**Status:** LOCKED · build AgvScene v2 against this
**Control:** Starts on load (auto, 1.8s/step), then steppable. Play/pause + ◀ ▶ + step dots.
            User can pause, step forward/back, stand on any step. NOT autoplay-once.
**Source record:** EVE-CTRL-AGV-00004658 (bridges ctrl-poc EVE-CTRL-AGV-000013)
**Visual language:** same as current scene — dark bg, simple robot, simple human,
                     clear labels. Like an interactive technical drawing. No Hollywood.
**Date:** 2026-06-14

## LOCKED decisions
- 9 steps total. Rule evaluated = its own step (step 5), labelled "no event hash generated".
- Auto-advance 1.8 s/step. Replay button. Clickable step dots.
- Step number ALWAYS visible: "STEP 4 OF 9".
- No fabricated hashes. VALID shown only because the record exists.
- AGV first as reference implementation; Energy + Governance clone the same engine later.

## The 9 steps

Each step: VISUAL (what robot/human look like) · LABEL (what's happening) ·
EVENT (what hashes to chain) · DATA (raw field from record).
Robot colour: GREEN = full speed safe · AMBER = unsafe intent pending · RED = denied/stopped.

```
STEP 1  Mission started
  Visual   Robot GREEN, stationary. No human yet.
  Label    Mission started — EVE opens a session.
  Event    mission_start
  Data     mission_mode: MISSION_ACTIVE

STEP 2  Route assigned
  Visual   Robot GREEN, begins rolling right. Motion lines appear.
  Label    Route assigned — motion begins at full speed.
  Event    route_assigned
  Data     robot_motion: FULL_SPEED · route: ROUTE_A_WAREHOUSE_AISLE_3

STEP 3  Human detected
  Visual   Human appears ahead. Distance marker "2.4 m". Robot still GREEN.
  Label    Human worker detected at 2.4 m.
  Event    human_detected  (→ signal HUMAN_PROXIMITY_DETECTED)
  Data     human_detected: true · distance_to_human_m: 2.4

STEP 4  Unsafe action requested
  Visual   Robot turns AMBER, still moving toward human.
  Label    Operator requests: continue at full speed.
  Event    unsafe_action_requested  (intent recorded FIRST, before evaluation)
  Data     requested_action: continue_at_full_speed

STEP 5  Rule evaluated   (NO EVENT HASH GENERATED — evaluation, not an event)
  Visual   Robot AMBER, rule label appears over the scene.
  Label    EVE evaluates the governed rule.
  Event    — none. Labelled clearly: "Evaluation step · no event hash generated".
  Data     rule basis: speed_reduction_mandatory_when_human_present

STEP 6  DENIED
  Visual   Robot turns RED, stops. Motion lines gone.
  Label    Unsafe continuation denied.
  Event    unsafe_action_denied
  Data     execution_verdict: DENIED · action_applied: false · HTTP 409

STEP 7  Mission held
  Visual   Robot RED, stopped. Human still present.
  Label    Mission held — robot stopped.
  Event    (state transition recorded with the denial)
  Data     mission_mode: MISSION_HELD · robot_motion: STOPPED

STEP 8  Record sealed
  Visual   Scene dims; a record card slides up.
  Label    The full run is sealed into one tamper-evident record.
  Event    seal
  Data     adapter: EVE-CTRL-AGV-000013 → Bridge: EVE-CTRL-AGV-00004658
           seal_hash: b36aab84…

STEP 9  Verify
  Visual   Green VALID badge on the record card.
  Label    Anyone can re-check the seal. No login.
  Event    verify
  Data     verify: VALID  → verify.eveverified.com/?id=EVE-CTRL-AGV-00004658
           Buttons appear: See full chain → /control-chain/agv · Verify record →
```

## Controls (LOCKED)
- On load: scene auto-advances through the 9 steps at 1.8 s/step.
- Play/Pause button. ◀ Prev / Next ▶. 9 clickable step dots (jump to any).
- Step counter ALWAYS visible: "STEP n OF 9".
- Pausing stops auto-advance; user steps manually from there.
- Replay restarts from step 1.
- Each step shows its LABEL + the EVENT/DATA rows for that step (always visible,
  not just at the end — so a paused step is fully readable).
- prefers-reduced-motion: no auto-advance, start on step 1, manual stepping only.

## Honesty (lock — same discipline as the verify fix)
- "Event" row shows the real event TYPE recorded. No fabricated per-step hash strings.
- Step 5 shows the basis string as the basis, not as the full rule text (rule text
  lives in ctrl-poc, not in the Bridge payload).
- Steps 8–9 (record + verify) show the REAL Bridge ID and a real VALID, because the
  record exists. If it didn't, these steps would say "pending" — never VALID.

## API CONTRACT (LOCKED 2026-06-14) — verify endpoint for EVE-CTRL-AGV-00004658
GET https://api.eveverified.com/eve/verify/{eve_id} returns:
```
top-level:  valid(bool) · eve_id · seq · timestamp · namespace · action · status · seal · chain_seal
payload.data: record_id · session_id · execution_verdict · verdict_basis[] · action_applied ·
              requested_action · human_detected · distance_to_human_m · mission_mode ·
              robot_motion · seal_hash · domain_model · verification_chain · hardware_attestation ·
              is_demo · boundary_note
```
WHICH STEPS USE LIVE DATA (steps 6-9 only; 1-5 are the locked scenario):
- Step 5 rule basis  <- payload.data.verdict_basis[0]   (shown as basis, not full rule text)
- Step 6 DENIED       <- payload.data.execution_verdict + action_applied
- Step 7 mission held <- payload.data.mission_mode + robot_motion
- Step 8 sealed       <- payload.data.record_id (adapter) · top.eve_id (bridge) ·
                        payload.data.seal_hash (adapter hash) · top.seal · top.chain_seal
                        THREE DISTINCT HASHES — label each correctly, never merge.
- Step 9 verify       <- top.valid (true -> VALID badge)
NOT IN VERIFY RESPONSE — must NOT be shown as live:
- HTTP 409 (runtime behaviour, shown as scenario text only)
- per-event hashes (never fabricated)
FAILURE MODE: if fetch fails or valid!=true -> steps 6-9 show "verifying..." / "could not verify",
NEVER a hardcoded VALID. The story (steps 1-5) still renders.

## Reuse (the point)
Same 9-row skeleton → Energy and Governance later:
  Energy:     grid_outage → island_mode → reserve_breach → settlement_request
              → rule → HELD → state → seal → verify
  Governance: approval → scope_changed → new_facts → authority_uncertain
              → ACCOUNTABILITY_CONTINUITY_GAP → (no verdict, a surfaced gap) → seal → verify
Same visual language. Same observe → record → evaluate → verdict → seal → verify shape.

## Open questions — RESOLVED
1. Step 5 own step: YES, kept, labelled "no event hash generated".
2. Speed: 1.8 s/step (read time over flash).
3. AGV first as reference: YES.
