# tamara-interview

Workspace for the Tamara technical hiring process.

## Hiring process

```
Code Pairing Interview (60 min) → Tech 1 (1 hr) → Bar Raiser (1 hr) → Final Interview / HRBP (15 min) → Offer
```

## Code Pairing Interview (60 min) — this round

- Problem statement arrives by email a few minutes before the interview; it's designed to be solved with an AI-powered IDE.
- Language and AI tool of choice are both up to the candidate.
- Assessed on: problem-solving approach, code structure/quality, communication of ideas while pairing, and effective use of AI-assisted tools.
- AI is explicitly expected for: scaffolding the app, generating TypeScript domain models from the sample, generating test cases, refactoring/cleanup toward production-ready output, and other time-consuming busywork.
- You own the final solution regardless of who typed it — be ready to interrogate requirements first, review/critique AI-generated code, explain tradeoffs out loud, and extend or modify it live on request.

### Prep checklist

- [ ] IDE set up with the extensions/tools you normally use
- [ ] Basic project scaffolding + boilerplate ready ahead of time so interview time goes to problem-solving, not setup
- [ ] Treat setup like pairing with a teammate — narrate decisions, ask clarifying questions
- [ ] Have the AI tool authenticated and ready to go

## Base scaffold

Pre-built ahead of the interview so interview time goes to the problem, not setup.

| Choice                                     | Why                                                                                                                                                      |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Next.js 16, App Router                     | Current default router; file-based routing and server components out of the box.                                                                         |
| TypeScript, `strict`                       | Catches shape mismatches in domain models/props before runtime.                                                                                          |
| Tailwind CSS v4                            | Utility styling with no separate stylesheet to keep in sync.                                                                                             |
| TanStack Query                             | Server-state caching/dedup/retry for API calls, instead of hand-rolled `useEffect` fetching.                                                             |
| React Hook Form + Zod                      | Uncontrolled-by-default form perf, with a single Zod schema driving both validation and inferred TS types.                                               |
| ESLint (`core-web-vitals` + TS) + Prettier | `eslint-config-prettier` disables stylistic ESLint rules so the two tools don't fight; Prettier owns formatting, ESLint owns correctness.                |
| Vitest + React Testing Library             | Fast, Vite-native test runner; RTL tests behavior through roles/labels, the way users and assistive tech see the UI.                                     |
| shadcn/ui on Base UI primitives            | Accessible primitives (keyboard/ARIA) with RTL support; components are copied into the repo, so only what's used is added and it can be edited directly. |

Tradeoffs made during scaffolding:

- **Dropped `cacheComponents`/`partialPrefetching`** (Next 16 experimental flags enabled by `create-next-app` by default). They require explicit `"use cache"` directives around dynamic content and would add framework ceremony with no payoff for a single-session interview app — removed to avoid unrelated build failures eating into interview time.
- **`QueryClient` instantiated in component state** (`src/app/providers.tsx`), not module scope — a module-level client would leak cached data across requests/users under SSR; `useState(() => new QueryClient())` gives each session its own instance at negligible cost.
- **Feature folders aren't pre-created** — `src/features/<name>/` gets created once the actual problem is known, rather than guessing a structure now and reshaping it later.
- **shadcn/ui initialized ahead of time, with no components added.** Init is slow and network-dependent on this machine (~5 min, two failed attempts in a dry run), while `shadcn add <name>` takes ~15s — so init is done now and components are added only when the problem needs them. Uses Base UI (shadcn's current default) rather than Radix; both meet the accessibility/RTL bar. `"rtl": true` in `components.json` makes generated components use logical classes (`ps-`/`pe-`). Generated files need `npm run format` afterwards to match the Prettier config.
- **`@types/node` bumped to `^24`** to match the installed Node 24 and Vitest 5's peer range — `^20` made every plain `npm install <pkg>` fail without `--legacy-peer-deps`.
- **Native SWC binary is blocked by a Windows Application Control policy** in this environment; Next/Turbopack falls back to the WASM build automatically. Build/typecheck/lint all pass, but first compile is slower than normal — if `next dev` feels sluggish to start on interview day, that's why, not a scaffold bug.

Scripts: `npm run dev`, `npm run build`, `npm run lint`, `npm run typecheck`, `npm run format` / `format:check`, `npm test` / `test:watch`.

## Tech 1 (1 hr) — frontend fundamentals

Covers: frontend fundamentals & trade-offs/accessibility/scalable code, browser & DOM manipulation, JavaScript/TypeScript, deployment & observability, testing strategy (unit/integration/E2E). Framed as scenario/discussion questions — always explain _why_, not just _what_.

## Bar Raiser (1 hr) — culture & values fit

20 min on themes raised in earlier rounds' feedback, 40 min on Tamara's values: **ownership**, **curiosity**, **resilience**. Prep real scenarios from your own experience that map to each value.

## Source

Full guide: `Web_Engineer_II_-_Interview_Preparation_Guide.pdf` (Tamara Candidate Guide).
# interview-task
