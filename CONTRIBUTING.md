# Contributing

Thanks for your interest in the Crossword Builder (*sanaristikkotyökalu*) — a
web app for building and solving Scandinavian arrow-word crosswords.

This guide is for contributors. For what the project is and how it's built, see
the [README](./README.md) and [ARCHITECTURE.md](./ARCHITECTURE.md).

## Getting started

```bash
npm install      # or `npm ci` for a clean, locked install
npm run dev      # Vite dev server at http://localhost:5173
```

Requires **Node 20** (see `.node-version`; any ≥ 18 works).

## Branch & PR workflow

- `main` is the **production branch** — it auto-deploys to Cloudflare Pages and
  is **protected**: no direct pushes, and it changes **only via pull request**
  that the maintainer merges.
- Do your work on a feature branch (or a fork) and **open a PR against `main`**.
- Larger in-progress work is integrated on the `mvp` branch before going to
  `main`.

## Before opening a PR

Run the full local gate — there is no CI yet, so this is how we keep `main`
green:

```bash
npm test            # Vitest — all tests must pass
npm run lint        # ESLint — no errors
npm run format:check # Prettier — already formatted (run `npm run format` to fix)
npm run build       # type-check + production build must succeed
```

Please add or update tests for any behavior you change.

## Conventions

- **Language:** the **UI is Finnish** (all user-facing strings live in
  `src/i18n/fi.ts`, keyed by English keys — never hardcode Finnish in
  components). **Code, comments, and docs are English.**
- **Styling:** all UI must use the **Meshly Design Deck** tokens
  (`src/styles/tokens.css`) — no ad-hoc colors or spacing. Reuse the deck's
  patterns rather than inventing new ones.
- **Model edits** go through the pure transforms in `src/model` (e.g.
  `withCell`, `setCellType`) — never mutate puzzle state in place.
- **Commits:** use [Conventional Commits](https://www.conventionalcommits.org/)
  (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, optionally scoped, e.g.
  `feat(build): …`).

## PR checklist

- [ ] Tests pass, lint and format are clean, the build succeeds.
- [ ] New/changed behavior is covered by tests.
- [ ] User-facing text is in Finnish via `src/i18n/fi.ts`.
- [ ] UI follows the Design Deck (no ad-hoc styles).
- [ ] The PR description explains the change.

## Ideas & roadmap

Bug reports and feature ideas are welcome via issues. Planned post-MVP work
(dictionary suggestions, bent arrows, print/PDF, and more) is tracked
separately; check open issues before starting larger work so we can align on
approach.
