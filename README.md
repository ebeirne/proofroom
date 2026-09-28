# Proofroom

Define a product brief, approve a version, prepare an agent assignment and verify configured requirements without model calls.

[Open the workspace](https://beirne-proofroom-demo-0928.vercel.app/)

## Local and GitHub verification

Requires Node.js 22+. No runtime packages are required.

1. Clone this repository. The browser workspace can create and export an approved brief JSON.
2. In the project to check, save that JSON and a `proofroom.config.json` (see the example below).
3. Run `node /path/to/proofroom/runner.cjs /path/to/project --allow-run --out report.json`.
4. Read the JSON receipt or import it in the workspace. Exit 0 means all configured requirements have passing checks. Exit 1 means failed, unrun, changed or uncovered checks. Exit 2 means configuration/runtime error.

`--allow-run` explicitly permits executing trusted project code with your user permissions. It is NOT a sandbox. Without it, test commands are not run and their coverage blocks completion. The supported command runtime is Node; args are passed directly without a shell. Timeouts terminate the process tree; output is bounded. Do not run untrusted repositories locally.

```json
{
  "version": 1,
  "brief": "product-brief.json",
  "rules": [{"id":"source","requirement":"R1","file":"src/cart.cjs","op":"exists"}],
  "tests": [{"id":"cart","requirement":"R1","args":["--test","test/cart.test.cjs"],"timeoutMs":30000}]
}
```

Use the IDs from your own brief. File operations are exists, contains, excludes and jsonEquals (with a JSON Pointer). Node tests can assert runtime behavior, but the quality and completeness of those tests still matter.

### Hosted repositories

Copy `runner.cjs`, `brief-core.js`, `verifier.js`, `report-summary.cjs`, your brief/config and `.github/workflows/proofroom.yml` into your repository. The workflow runs on pushes to main or manual dispatch. It installs Node 22, runs configured checks, publishes a summary and uploads a receipt artifact. Permissions are contents:read. It does not accept arbitrary pull-request code or configure secrets. GitHub's normal Actions pricing/limits apply; review uses no AI tokens.

Public repository workflow status can be connected in the website using owner/repo. The connection reads GitHub's API, not source files or credentials. Open each run to see the commit, summary, logs and receipt. Private repositories can use the workflow and import receipts manually; private OAuth integration is not implemented.

### Try this repository itself

`node runner.cjs . --allow-run --out proofroom-report.json`

The included approved brief maps three requirements to 32 core and integration tests. These are synthetic tests, not proof of market value or universal AI alignment.

## Workspace

Requirements have acceptance criteria, dependencies, explicit decision keys and human/test classification. Open questions and conflicting decision values block approval. Edits invalidate approval and old assignments. MASTER.md and TASK.md exports are portable. Local JSON imports are validated. Browser file checks never execute uploaded files or send them to a server. Recent receipts stay in local storage; imported receipts are explicitly unauthenticated. Tasks remain temporary.

## Limits

Proofroom verifies configured assertions, not arbitrary natural language. Passing tests do not prove subjective quality, security or full requirements coverage. An intentionally weak test can pass. The tool cannot infer missing tests. Local approvals and hash receipts are not signatures or an adversarial security boundary. Reports hash the approved brief, config and explicitly checked source files; they do not hash every dependency in a repository. GitHub status reflects a workflow conclusion; review the receipt for its exact assertions.

## Tests

`node --test brief-core.test.cjs verifier.test.cjs runner.test.cjs`

Covers approval invalidation, altered assignments, missing evidence, literal/JSON assertions, missing files, hashes, real failing/passing Node tests, timeouts, no-execution mode, uncovered requirements, path escape rejection and changed checked files. Website browser smoke covers file selection, assertion results, static residents and connection status. Native download completion is not asserted.

## Art and earlier concepts

Town illustration generated with AI; residents are stationary and tree crowns sway. Reduced motion is honored. `booking/` and `legacy/` preserve prior concepts. `art-direction.md` records the image prompt.

## Portfolio release check (2026-09-28)

The landing page starts with a working fail / fix / pass calculation, with the full workspace in a disclosure below it. This is a runnable portfolio MVP, not a general AI correctness guarantee.

Release checks: 39 existing model, brief, file-verifier and process-runner tests pass on Windows. Two UI regressions cover demo reset and corrupt saved history. Browser smoke covers approval, task creation, explicit failed/uncovered file checks and public GitHub status. The self-verification runner reports all three configured requirements covered.

Run all checks: `node --test model.test.cjs brief-core.test.cjs verifier.test.cjs runner.test.cjs ui.test.cjs`.

## Dark workspace redesign
The interface uses a minimal black canvas with brief, checks and history tabs, including keyboard tab navigation. The recorded demo is retained in a disclosure and labeled as the earlier interface. Existing verification engines are unchanged. All 41 tests pass after redesign; desktop and 390px browser checks confirm the demo and tab panels work.
