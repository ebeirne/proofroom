# Proofroom

A small, browser-local feedback desk by Beirne Studios.

[Try the live demo](https://beirne-proofroom-demo-0928.vercel.app/)

## How it works

1. Add a note with context, owner and priority.
2. Move it through Open, In review and Resolved. Search and filter the list.
3. Export a JSON handoff as a backup or import it into another browser.

Click a note to edit it. Deleting notes and resetting sample data require a second confirmation. Imports are validated and require confirmation before replacing the current workspace.

## Run locally

No build step or runtime dependencies. Serve this directory with any static server, for example:

```sh
python -m http.server 8000
```

Open http://localhost:8000. Keep using the same origin to retain browser-local notes.

## What this is and is not

This is a self-initiated software concept. The sample notes are fictional. Data is stored in localStorage in the current browser. There is no backend, account system, automatic syncing or real-time collaboration. Export before clearing browser data. JSON export/import is a manual handoff, not cloud sharing.

## Files

- index.html: interface and explanation
- style.css: white, navy, cyan and coral visual theme
- app.js: feedback state, validation, storage and handoffs
- stationery-garden.png: original AI-generated supporting illustration
- vercel.json: static hosting configuration

## Design and AI disclosure

The visual direction uses a Japanese stationery-inspired illustration, generous white space and navy outlines with cyan and pink accents. The illustration was generated with AI. The interface and code were developed with AI assistance and reviewed through local browser checks. No client affiliation or measured business outcomes are claimed.

## Verification

The current app was exercised in the browser for creating/editing notes, status changes, filtering, reload persistence, deletion confirmation, JSON export preview and import. Desktop and phone layouts were checked. No automated end-to-end test suite is included.
