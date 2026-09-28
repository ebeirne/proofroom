# Proofroom

A local-first product brief and evidence-review workspace for people building with coding agents.

## Workflow
Define a goal and audience. Add requirements, preferences, exclusions and approval rules with acceptance checks. Resolve questions, then approve that exact version. Prepare a task with dependencies and all hard project rules included. Export MASTER.md, TASK.md or a portable JSON brief. Record review evidence as attested, conflict or unverified.

## Boundaries
No AI provider, semantic contradiction detector, repository connection, test runner or enforcement harness is included. Explicit decision keys with differing values are detected; arbitrary prose contradictions are not. Approval is a local acknowledgment, not authentication or a tamper-proof signature. Evidence references are supplied by the reviewer and are not independently verified. Anyone with file access can create their own approved brief. This is not a security boundary.

Briefs persist locally under proofroom-brief-v1. Task packets and review entries are temporary and reset on refresh or brief changes. Export JSON to retain a portable brief. Google Fonts loads optional fonts. No product data is sent to a backend.

## Development
Static site, no build dependencies. Serve the directory with `python -m http.server 8000`.
Run `node --test brief-core.test.cjs`.

## Verification
17 core regression tests cover approval, explicit conflicts, missing decisions, stale and altered task packets, dependency closure, missing/failed/attested evidence, malformed imports, size limits and persistence round trips.
Browser checks covered the example flow, approval gate, task generation, missing evidence, a failed requirement, editing and approval invalidation, reload persistence and responsive layout. These are synthetic/local checks, not evidence that this improves real agent compliance. JSON parsing is unit tested; native file download completion is not asserted.

## Earlier concepts
`booking/` preserves the booking-scope planner. `legacy/` preserves the original feedback desk.

## Art
AI-generated town background with original SVG people. Background blur, reduced character scale and quiet motion keep the focus on content. OS reduced-motion preference is respected. See art-direction.md for generation details.
