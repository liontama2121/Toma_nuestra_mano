# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # development server at http://localhost:3000
npm run build    # production build
npm run lint     # ESLint via next lint
```

No test suite is configured.

## Architecture

The project is a **single-page Next.js 14 (App Router)** site for Fundación Toma Nuestra Mano, a Colombian NGO. It follows **Clean Architecture** with four layers:

```
src/
  domain/          # entities + repository interfaces (pure TypeScript, no deps)
  application/     # use cases — orchestrate domain logic
  infrastructure/  # StaticXRepository — all data is hardcoded here (no backend)
  presentation/    # React components, hooks
  lib/
    di.ts          # manual dependency injection: wires use cases ↔ repositories
    tokens.ts      # brand color constants (mirrors tailwind.config.ts colors)
```

### Data flow

Server Components (e.g. `ProgramsSection`, `ImpactSection`, `DonationSection`) import use cases directly from `src/lib/di.ts` and call `.execute()` at render time. To add or change content, edit the corresponding `Static*Repository` in `src/infrastructure/repositories/`.

Sections that need browser APIs split into a Server Component wrapper + a `*Client.tsx` file marked `'use client'` (e.g. `ImpactSection` + `ImpactCounterClient`).

### Animations

- **anime.js** is lazy-imported inside hooks to avoid SSR issues.
- `useScrollReveal(staggerDelay?)` — attach `ref` to a container; add `data-reveal` to each child element that should animate in on scroll.
- `useCounterUp` — animates numeric counters when they enter the viewport.
- **framer-motion** is available as a dependency but used sparingly alongside anime.js.

### Styling

- Tailwind CSS with a custom dark-space palette defined in `tailwind.config.ts`. Use the named color tokens (`azul`, `verde`, `naranja`, `oro`, `morado`, `fondo`, `fondo2`, `texto`) rather than raw hex values.
- Font families: `font-orbitron` (headings) and `font-nunito` (body) via CSS variables; the base font is `Elianto` (local TTF) applied globally in `layout.tsx`.
- `src/lib/tokens.ts` exports the same colors as a typed TypeScript object for use in inline styles (e.g. `program.color`).

### Adding a new section

1. Create the entity in `src/domain/entities/`.
2. Add a repository interface in `src/domain/repositories/`.
3. Implement a `Static*Repository` in `src/infrastructure/repositories/` with the hardcoded data.
4. Create a use case in `src/application/use-cases/`.
5. Wire it up in `src/lib/di.ts`.
6. Build the Server Component (and optional `*Client.tsx`) in `src/presentation/components/sections/`.
7. Import and render it in `src/app/page.tsx`.
