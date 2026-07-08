---
description: Full audit of Nhexa-Client — components, pages, store, services, and styles. Checks component naming, layer violations, SCSS conventions, Pinia store misuse, and test coverage. Produces a prioritized remediation plan.
---

You are the lead reviewer for Nhexa-Client. Your job is to audit code against the project's architecture conventions and produce a prioritized remediation plan.

If `$ARGUMENTS` is provided, review that specific file or directory.
If no argument is given, ask the user what scope to review (single component, directory, or full project).

---

## Architecture

Nhexa-Client is a Vue 3 + TypeScript + Pinia marketing/landing app:

```
src/
  app/
    components/    Feature components — each in its own folder with .vue + .scss
    pages/         Route views — LandingPage.vue, SearchPage.vue
    routes/        Vue Router config
  middlewares/
    services/      Axios wrappers — api.ts, token.ts
    store/         Pinia store (single store, Options API style)
    misc/          Static data and constants
  styles/          root.css, style.css — global tokens
  utils/           Pure helpers
```

**Layer rules:**
- Components are feature-scoped — no cross-feature imports between component folders
- Pages are thin route views — no business logic, delegate to components
- Store (`middlewares/store/`) is the only place for global state — no component-level reactive state for shared data
- Services (`middlewares/services/`) own all API calls — no `axios` imports in components or pages

---

## What to check

### A. Naming conventions

| Context | Convention | Example |
|---|---|---|
| Component files | `PascalCase.component.vue` | `HeroBanner.component.vue` |
| Top-level components (no sub-components) | `PascalCase.vue` | `AccMenu.vue` |
| Page files | `PascalCasePage.vue` | `LandingPage.vue` |
| SCSS files | Same name as component | `HeroBanner.component.scss` |
| Service files | `camelCase.ts` | `api.ts`, `token.ts` |
| Store actions | `handleX` for async | `handleUserData`, `handleGetNhexaEnv` |
| Utils | `camelCase.ts` | `capitalizeFirstLetter.ts` |

Flag any component file not following the `.component.vue` suffix convention (except established top-level exceptions like `AccMenu.vue`, `AppMenu.vue`).

### B. Layer violations

- **API calls in components:** grep for `axios` or `fetch` imports directly in `.vue` files — must go through `middlewares/services/`.
- **Store access in pages:** pages may read from store for routing guards, but should not dispatch actions or write state — delegate to components.
- **Cross-component imports:** a component in `components/HeroBanner/` must not import from `components/Products/` — components are feature-scoped.
- **Logic in pages:** flag any `LandingPage.vue` or `SearchPage.vue` with more than ~30 lines of non-template logic.

### C. Style conventions

- Each component must have a co-located `.component.scss` file — no inline `<style>` blocks in `.vue` files with more than 5 rules.
- Global design tokens are in `src/styles/root.css` — flag any hardcoded color (`#xxxxxx`, `rgb()`) in component SCSS that matches a CSS variable.
- No scoped styles that duplicate global utility classes from `src/styles/style.css`.
- Three.js canvas containers: `width: 100%`, `height: 100%`, no fixed pixel dimensions.

### D. Pinia store

- `middlewares/store/index.ts` is the single store — flag any `defineStore()` call outside this file.
- Store state must be typed — flag any `state: () => ({ field: null })` without an explicit interface.
- Actions that call the API must use `middlewares/services/` — no direct `axios` in store actions.
- Flag any `ref()` / `reactive()` in a component that holds data that other components also need — should be in store.

### E. TypeScript

- Flag `any` types in component props, emits, or composables.
- Flag missing prop type definitions (`.vue` files with `defineProps()` without TypeScript generics).
- Flag missing `defineEmits()` declarations on components that emit events.

### F. Tests

Vitest + @vue/test-utils is configured but the only test file is empty. Report what needs to be created:

- **High:** Store actions that fetch and transform API data
- **Medium:** Components with conditional rendering or user interaction
- **Low:** Utility functions, static data helpers

---

## Output format

For each file reviewed:

```
### src/app/components/HeroBanner/HeroBanner.component.vue

Naming
✓ Correct .component.vue suffix
✓ Co-located HeroBanner.component.scss

Layer
✓ Uses services/api.ts for data
⚠ Line 34: direct axios.get() call — use middlewares/services/api.ts

Style
✓ No inline styles
⚠ HeroBanner.component.scss line 12: hardcoded #38B6FF — use var(--color-accent)

Store
✓ Uses useStore() correctly
⚠ Line 67: local ref() holding user data shared with AppMenu — move to store

TypeScript
⚠ Line 5: defineProps() without type parameter — add <{ title: string; subtitle?: string }>

Tests
⚠ No test file — HIGH priority (data fetching + conditional render)
```

---

## Remediation plan

```
## Remediation Plan

### P1 — Quick wins
- [ ] Add TypeScript generics to all defineProps() calls missing types
- [ ] Replace hardcoded colors with CSS variables (list files + lines)
- [ ] Remove direct axios imports from components (list files)

### P2 — Architecture
- [ ] Move shared reactive state from components to store (list)
- [ ] Extract logic from fat pages into components (list)

### P3 — Style consistency
- [ ] Replace inline <style> blocks with co-located .scss files (list)
- [ ] Remove duplicated global utility styles in component SCSS (list)

### P4 — Test coverage
- [ ] Implement store action tests (list actions)
- [ ] Implement component tests for conditional rendering (list)
- [ ] Implement utility function tests
```

Show counts: total findings, by severity (P1/P2/P3/P4), by category.
