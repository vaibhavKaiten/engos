# Web Design Guidelines — Always Apply

Source: Vercel Web Interface Guidelines

## Core principles
- **Hierarchy first** — every page has one dominant action. Never compete for attention.
- **Whitespace is not empty** — generous spacing improves comprehension. Do not fill space.
- **Colour carries meaning** — do not use colour purely decoratively. Every colour choice must communicate something.
- **Typography is UI** — font size, weight, and spacing communicate hierarchy without icons or borders.

## Layout rules
- Maximum content width: 1280px on desktop, full width on mobile
- Page padding: minimum 16px on mobile, 24px on tablet, 40px on desktop
- Never let text lines exceed 72 characters — it harms readability
- Use an 8px grid — all spacing values should be multiples of 8 (8, 16, 24, 32, 40, 48...)

## Interactive elements
- Minimum tap target size: 44x44px — this is a hard minimum, not a guideline
- Every interactive element needs a visible focus state for keyboard navigation
- Hover states should have a transition — 150ms ease is the standard
- Disabled states must look different — do not just reduce opacity alone

## Forms
- Labels above inputs — never placeholder-only labelling
- Show error messages below the field that caused the error — never at the top only
- Validate on blur, not on keystroke
- Required fields must be marked — use an asterisk (*) and explain it once

## Feedback and loading
- Any action that takes more than 300ms needs a loading indicator
- Optimistic UI for simple actions (likes, toggles) — revert on error
- Success and error states must be explicit — never silent
- Empty states need explanation and a clear next action

## Accessibility
- All images need alt text — decorative images use alt=""
- Colour contrast minimum: 4.5:1 for body text, 3:1 for large text
- Do not rely on colour alone to communicate state — use icons or text too
- All forms must be completable with keyboard only
