# Animated Circular Cursor

Add a custom cursor: a gold ring that smoothly follows the mouse, idle-animates on its own (pulse + slow-rotating dashed inner ring), expands and fills when hovering interactive elements, and bounces on click. Falls back to the native cursor on touch devices.

## Files

**New: `src/components/AnimatedCursor.tsx`**
- Client component, mounted once.
- Detects `pointer: fine`; renders nothing on touch.
- Tracks `mousemove`, eases position toward target via `requestAnimationFrame` (lerp ~0.18) and applies `transform: translate3d(...)` to a fixed-position ring.
- Detects hover on `a, button, input, textarea, select, label, [role="button"], [data-cursor="hover"]` via `e.target.closest(...)` → scales ring ~2.4x + tints fill with gold at 18% opacity.
- `mousedown`/`mouseup` → quick scale-down bounce (0.85).
- Hides on `document mouseleave`, shows on `mouseenter`.
- Small center dot also tracks the raw position (hidden during hover state).
- Uses `var(--color-primary)` so it inherits the theme.

**Edit: `src/routes/__root.tsx`**
- Import `AnimatedCursor` and render it inside `RootComponent` above `<Outlet />`.

**Edit: `src/styles.css`**
- Add two keyframes used by the cursor:
  - `cursor-pulse` — ring scales 1 → 1.6 with opacity 0.6 → 0.
  - `cursor-spin` — rotates 0 → 360deg.
- Add a `.has-custom-cursor, .has-custom-cursor *` rule that sets `cursor: none` so the native cursor hides while the custom one is active (class is toggled by the component, so touch devices keep the native cursor).

## Notes
- No new dependencies.
- SSR-safe: all browser APIs are inside `useEffect`.
- z-index `9999`, `pointer-events: none` so it never blocks clicks.
- Works against the existing theme; if a luxury gold token isn't defined, it uses `--color-primary` as-is.
