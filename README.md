# Proofroom

A visual what-if planner for software scope, by Beirne Studios.

[Try the live planner](https://beirne-proofroom-demo-0928.vercel.app/)

## What it does

Start with a small appointment-booking website. Select customer features and see the less obvious work they introduce. Click any work piece to inspect why it is included, which features depend on it, its assumption and the questions to ask before building.

- Seven optional features: instant booking, deposits, rescheduling, reminders, multiple staff, waitlists and customer accounts.
- Explicit dependency closure with shared work counted once.
- Lean versus selected-version comparison.
- Feature-specific tradeoffs and unanswered questions.
- Markdown and JSON brief export, plus a copyable preview.
- Browser-local persistence under a new versioned storage key.
- Reduced-motion support and keyboard-operable controls.

The explanation appears before the planner. The visual direction uses white space, navy ink, cyan and pink stationery shapes, a full AI-generated illustrated town behind the content, original filled SVG cartoon residents following continuous walking paths, and swaying trees. Motion does not carry required information.

## Model boundaries

This is a curated illustrative model for **one location with appointment-based services**. It is not an AI estimator, exhaustive requirements audit, quote, timeline generator or functioning booking service. Counts represent distinct modeled work pieces, not equal-sized tasks or development effort.

The lean baseline accepts booking requests, a person reviews them, and a confirmation follows. Selected automation extends that baseline. In this scenario deposits assume slot reservation before payment; other business models could handle deposits differently. The assumptions are exposed in the interface.

No accounts or backend are included. Choices and a project note stay in the current browser. Clearing browser data can remove them. Export a brief to keep a portable copy. The app does not transmit the project note. Google Fonts supplies optional typography; system fonts remain available as fallbacks.

## Run

No build step or application packages are required.

```sh
python -m http.server 8000
```

Open http://localhost:8000. Serve over HTTP so browser storage and downloads behave consistently.

## Test

Requires Node.js 18 or newer, with no package installation:

```sh
node --test model.test.cjs
```

The tests cover the lean baseline, transitive dependencies, shared dependency removal, every one of the 128 feature combinations, input normalization, model immutability and export consistency. These validate the implemented model, not whether its assumptions fit a particular customer's business.

Browser checks include presets, feature selection/removal, dependency detail dialogs, reload persistence, brief preview, copy action, download request, reduced-motion support and responsive layouts. Native download completion on disk is not asserted by these checks.

## Files

- `model.js`: inspectable feature/dependency model and pure planning/export functions.
- `app.js`: state, controls, persistence and download interactions.
- `index.html` and `style.css`: interface, artwork and motion.
- `model.test.cjs`: model regression tests.
- `legacy/`: original feedback-desk concept, retained with its separate storage key.

## Design and AI disclosure

This is self-initiated concept work. The full town illustration is AI-generated; the small characters are SVG. The product and code were built with AI assistance and tested locally. No customer affiliation, uniqueness guarantee or business results are claimed.
