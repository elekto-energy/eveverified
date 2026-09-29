# EVE Verified

## Evidence Verification Engine

**Evidence-bound governance for AI systems, agents, and consequential workflows.**

EVE is a verification and governance architecture for systems that need to distinguish between:

- what is known,
- what is claimed,
- what evidence supports the claim,
- which policy or authority permits an action,
- what was actually executed,
- and what remains unknown or not established.

EVE is designed around a simple principle:

> **Evidence should remain distinguishable from inference, authority, and action.**

Rather than asking an AI system to simply produce a confident answer, EVE creates explicit boundaries around the evidence and decisions that consequential workflows depend on.

**Website:** https://eveverified.com  
**Developed by:** Organiq Sweden AB, Stockholm, Sweden

---

# Why EVE exists

Modern AI systems can generate, interpret, retrieve, transform, and act on information at increasing levels of autonomy.

That creates a verification problem.

A plausible output is not necessarily:

- supported by the available evidence,
- derived from the intended source,
- produced under the intended policy,
- authorized for the intended action,
- or reproducible after the fact.

The problem becomes more important when AI systems interact with other agents, tools, APIs, databases, organizations, or physical systems.

EVE treats these boundaries as first-class system objects.

Instead of collapsing evidence, interpretation, authorization, and execution into a single AI response, EVE keeps them separable and inspectable.

---

# Core model

A simplified EVE workflow can be represented as:

```text
SOURCE
   ↓
EVIDENCE
   ↓
CLAIM
   ↓
VERIFICATION
   ↓
POLICY / AUTHORITY
   ↓
ACTION
   ↓
RECORDED OUTCOME
```

Each transition should be independently inspectable.

The existence of evidence does not automatically establish a claim.

An established claim does not automatically authorize an action.

Authorization does not prove that the intended action occurred.

And an observed outcome does not retroactively prove that the original evidence was sufficient.

These distinctions are deliberate.

---

# Evidence before confidence

EVE is designed to preserve the boundary between evidence and inference.

A system should be able to say:

```text
ESTABLISHED
PARTIAL
UNKNOWN
NOT_ESTABLISHED
CONTRADICTED
```

when appropriate.

`NOT_ESTABLISHED` does **not** mean false.

It means that the available evidence does not establish the proposition under the applicable verification rules.

This distinction is important in AI-assisted research, governance, compliance, incident analysis, and automated decision workflows.

---

# Evidence identity and provenance

EVE treats the identity of an artefact as part of the evidence.

Where appropriate, records can bind evidence to cryptographic digests and explicit provenance.

Conceptually:

```text
artefact
   ↓
identity / digest
   ↓
provenance
   ↓
claim
   ↓
verification rule
   ↓
result
```

This helps distinguish questions that are often accidentally combined:

- Is this the same artefact?
- Does it originate from the asserted source?
- Does it contain the asserted information?
- Does that information establish the claim?
- Is the claim sufficient for the proposed action?

Content identity and semantic meaning are not the same thing.

Neither are independent analysis and independent provenance.

---

# Governed action

EVE is not intended only to verify documents after an event.

The same evidence boundary can be used before consequential actions.

A governed workflow can require that an action proceed only when specified evidence, policy, authority, and state conditions have been established.

Conceptually:

```text
PROPOSED ACTION
      ↓
EVIDENCE STATE
      ↓
POLICY
      ↓
AUTHORITY
      ↓
VERIFICATION
      ↓
ALLOW / BLOCK / ESCALATE
```

The objective is not to make AI infallible.

The objective is to make the conditions under which a system is allowed to act explicit, inspectable, and reproducible.

---

# Human authority

EVE does not assume that AI should be the final authority.

Human approval can itself be represented as part of the governed chain.

This allows a system to distinguish between:

```text
AI proposed
AI verified
policy permitted
human authorized
system executed
outcome observed
```

rather than treating these as equivalent events.

For consequential workflows, the distinction matters.

---

# Verification records

EVE favors durable verification records over transient conversational state.

A record may bind:

- source identity,
- evidence identity,
- claim,
- verification rule,
- policy state,
- authority,
- relevant system state,
- decision,
- execution,
- outcome,
- timestamps,
- and cryptographic identity.

The resulting record can be inspected independently of the AI conversation that helped produce it.

This supports reproducibility, auditability, handoff, and later review.

---

# Proof of absence

Some of the most important findings are about what the evidence does **not** establish.

EVE therefore treats absence as something that should be bounded rather than guessed.

For example:

```text
Question:
What unit does this value use?

Evidence searched:
Specified source set

Result:
No authoritative unit definition found

State:
NOT_ESTABLISHED
```

This is stronger than allowing a model to silently infer a likely answer.

The result records both the knowledge boundary and the scope within which the absence was tested.

---

# AI as an instrument

AI can participate in EVE workflows without being treated as an unquestioned source of truth.

An AI model may act as:

- extractor,
- classifier,
- analyst,
- evaluator,
- grader,
- transformation tool,
- or reasoning instrument.

Its output can then be subjected to explicit verification rules.

This distinction is particularly important when AI systems are used to evaluate other AI systems.

The instrument that produces a measurement is part of the measurement chain.

---

# Public demonstrations and research

EVE is being developed alongside public demonstrations that test different parts of the architecture.

## Incident Record Claim Matrix

**Repository:**  
https://github.com/elekto-energy/incident-record-claim-matrix

A claim-level reconstruction of the public evidentiary record surrounding the July 2026 OpenAI–Hugging Face agent incident.

The work separates:

- organizational independence,
- evidence origin,
- analysis control,
- publication control,
- and instrument mediation.

Each propositional claim is assigned an explicit evidence state and, where unresolved, a resolution criterion.

The project demonstrates an important EVE principle:

> Independent analysis is not necessarily independent provenance.

---

## Baltic Evidence Showcase

**Repository:**  
https://github.com/elekto-energy/baltic-showcase

A reproducible evidence demonstration using published Baltic environmental data.

The work examines several verification boundaries, including:

- content identity versus product role,
- cell-level evidence,
- spatial identity,
- provenance,
- and semantic boundaries.

One demonstrated case preserves a value while refusing to assign a unit that the reviewed evidence does not establish.

The result is represented as a knowledge boundary rather than silently completed by inference.

---

# Areas of development

EVE is being explored across several related areas:

### AI governance

Binding evidence, policy, authority, and actions into inspectable workflows.

### Agentic systems

Controlling consequential actions performed by AI agents and multi-agent workflows.

### AI evaluation

Separating model outputs, evaluation instruments, scoring rules, evidence, and conclusions.

### Research provenance

Preserving the identity and provenance of source material and derived claims.

### Compliance and assurance

Creating evidence chains that can support human review, organizational controls, and audit.

### Verified development

Applying evidence and state verification to software development and AI-assisted engineering workflows.

### Verified handoff

Preserving enough identity, evidence, and state for another human or system to continue work without silently reconstructing missing assumptions.

---

# Design principles

EVE development follows several recurring principles.

## 1. Evidence is not inference

A plausible inference must not silently become evidence.

## 2. Unknown is a valid result

Missing evidence should remain visible.

## 3. Identity matters

A filename or description is not sufficient proof that two artefacts are identical.

## 4. Provenance matters

Independent interpretation does not create independent evidence provenance.

## 5. Instruments matter

The tools and models used to produce an evaluation can affect what the evaluation establishes.

## 6. Policy is separate from evidence

Evidence can establish facts without determining what an organization is permitted or required to do.

## 7. Authority is explicit

The actor or mechanism authorized to approve consequential action should be identifiable.

## 8. Actions require their own evidence

Authorization to act is not evidence that the action occurred correctly.

## 9. Records should survive the session

Important verification state should not depend on reconstructing an earlier AI conversation.

## 10. Do not fill evidence gaps silently

When a required proposition cannot be established, preserve the boundary.

---

# What EVE is not

EVE is not a claim that AI outputs can be made universally correct.

It is not a replacement for domain expertise.

It is not a single benchmark or scoring methodology.

It is not intended to turn probabilistic models into deterministic systems.

Instead, EVE provides architecture for making the surrounding evidence and governance boundaries more explicit.

The AI may remain probabilistic.

The rules governing what evidence is accepted, what authority is required, and what actions are permitted can still be explicit.

---

# Architecture

The public repository contains the EVE Verified web platform and demonstrations.

Current implementation includes a Next.js application and supporting components for presenting and interacting with EVE concepts.

```text
eveverified/
├── app/
├── components/
├── data/
├── docs/
├── lib/
├── public/
└── supabase/
```

The implementation continues to evolve as the verification architecture is tested against concrete use cases.

Not every internal research or governance artefact is published in this repository.

Public claims should therefore be evaluated against the artefacts actually made available, rather than assuming that unpublished material establishes them.

---

# Development

Install dependencies:

```bash
npm install
```

Run the development environment:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run the production build:

```bash
npm start
```

---

# Status

EVE is under active development.

The architecture is being tested through concrete research, governance, evidence, and agentic-workflow cases rather than treated as a finished specification.

Terminology, interfaces, and implementation may therefore evolve.

Where possible, public demonstrations preserve the evidence necessary to distinguish established results from exploratory concepts.

---

# About

**EVE Verified — Evidence Verification Engine**

Developed by **Joakim Eklund / Organiq Sweden AB**  
Stockholm, Sweden

https://eveverified.com

---

# License

Proprietary — All Rights Reserved unless otherwise stated for a specific public artefact or repository.

© 2024–2026 Organiq Sweden AB
