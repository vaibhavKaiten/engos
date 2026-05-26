# Frontend Design Standards — Always Apply

## Visual quality
- Interfaces must look intentional — no default browser styles, no unstyled states
- Every component needs: default state, hover state, focus state, disabled state, loading state
- Animations should feel physical — ease-in-out for movement, ease-out for elements entering, ease-in for elements leaving
- Shadow should imply elevation — use sparingly and consistently

## Component architecture
- Components are dumb by default — they receive data and emit events
- Business logic lives in hooks, not components
- A component that exceeds 200 lines should be split
- Props should be the minimum required to render — avoid passing the entire object when one field is needed

## Naming conventions
- Components: PascalCase (`UserCard`, `AuthForm`)
- Hooks: camelCase starting with `use` (`useAuth`, `useUserProfile`)
- Utilities: camelCase (`formatDate`, `parseAmount`)
- CSS classes / Tailwind: readable over short (`flex items-center gap-4` not cryptic abbreviations)
- Files: match the default export name (`UserCard.jsx` exports `UserCard`)

## File structure inside a feature
```
feature/
├── components/     (presentational, no data fetching)
├── hooks/          (data fetching, state, side effects)
├── utils/          (pure functions)
└── index.js        (public API of the feature — export only what other features need)
```

## Tailwind rules (if using Tailwind)
- Never use arbitrary values unless there is no utility available — `w-[347px]` is a code smell
- Extract repeated class combinations into a component — not a CSS file
- Mobile-first: base styles for mobile, then `md:` and `lg:` overrides
- Do not use `!important` — it means the component model is broken

## Accessibility
- Every interactive element is reachable by keyboard
- Focus indicators are visible — never `outline: none` without a replacement
- ARIA labels on icon-only buttons — `<button aria-label="Close">`
- Colour is never the only way to convey state
