# React & Next.js Best Practices — Always Apply

Source: Vercel Engineering (70 rules across 8 categories)

## Critical — async waterfalls (highest impact)
- Never `await` sequentially inside a component when requests can run in parallel — use `Promise.all()`
- Fetch data as high in the tree as possible — avoid prop-drilling fetches
- In Next.js, use server components for data fetching — client components for interactivity only
- Never fetch inside `useEffect` if the data is needed on first render — use server components or RSC

## Bundle size (high impact)
- No barrel imports from large libraries — import directly: `import { Button } from '@lib/ui/Button'` not `from '@lib/ui'`
- Use `next/dynamic` for components not needed on initial render
- Do not import entire icon libraries — cherry-pick: `import { X } from 'lucide-react'`
- Images must use `next/image` — never raw `<img>` tags

## Server-side performance
- Use `React.cache()` to deduplicate repeated fetches in server components
- Use `generateStaticParams` for dynamic routes that can be statically rendered
- Set appropriate `revalidate` values on fetches — do not default to no-cache

## Re-render optimisation
- Wrap expensive child components in `React.memo` only when profiling shows they are causing problems — not by default
- `useCallback` and `useMemo` add overhead — only use when the computation is genuinely expensive
- State that only one component needs should live in that component, not a global store
- Avoid creating new object/array literals in JSX props — they cause unnecessary re-renders

## Component rules
- One component per file
- Functional components only — no class components
- Props should be typed with JSDoc if TypeScript is not in use
- No business logic inside components — extract to hooks or utility functions
- Components should render, not compute

## Hooks rules
- Never call hooks conditionally
- Custom hooks start with `use` and encapsulate one concern
- `useEffect` is a last resort — prefer derived state and event handlers

## State management
- Start with `useState` and `useReducer` — reach for a global store only when sharing state across distant components
- Server state (data from APIs) belongs in a server component or a data-fetching library, not `useState`
