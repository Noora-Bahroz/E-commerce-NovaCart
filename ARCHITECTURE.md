# Nova Store — Architecture Document

## Project Overview

Nova Store is a production-quality e-commerce dashboard built with React 19 and Vite. It demonstrates modern front-end engineering practices including component-based architecture, declarative state management, performance optimization, responsive design, and comprehensive unit testing. The application provides a mock authentication flow, a searchable and filterable product catalog sourced from the Fake Store API, and a polished user experience across devices.

---

## Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Framework** | React 19 | Latest stable release with concurrent rendering improvements |
| **Bundler** | Vite 8 | Fast development server with instant HMR and optimized production builds |
| **Routing** | React Router v7 | Declarative routing with built-in lazy loading support |
| **State Management** | Context API + useReducer | Lightweight alternative to Redux; sufficient for this scope without added boilerplate |
| **HTTP** | Fetch API (native) | Zero-dependency; Fake Store API is a simple REST interface |
| **Testing** | Vitest + React Testing Library | Fast, Vite-native test runner with user-centric testing utilities |
| **Styling** | Plain CSS (Custom Properties) | No extra dependency; CSS custom properties provide theming and maintainability |
| **Deployment** | Vercel | Zero-config deployment with automatic CI/CD from GitHub |

---

## Architecture Decisions

### 1. State Management: Context API + useReducer over Redux

Two isolated contexts (`AuthContext` and `ProductContext`) are used instead of a single global store. This ensures that components only re-render when their relevant slice of state changes. `useReducer` provides predictable state transitions via dispatched actions, making the state logic testable and scalable without Redux's boilerplate.

### 2. Code Splitting with React.lazy

All page-level components (`LoginPage`, `DashboardPage`, `NotFoundPage`) are lazy-loaded. This splits the bundle into separate chunks that are loaded on demand, reducing the initial payload to approximately 76 KB gzipped.

### 3. API Layer Separation

API calls are abstracted into `services/api.js` using plain async functions. This keeps fetch logic decoupled from components and makes it easy to mock in tests or swap providers in the future.

### 4. Client-Side Pagination

Because the Fake Store API returns only 20 products, pagination is implemented client-side. The full dataset is cached in context on first fetch, and all filtering, sorting, and pagination operate on the cached data — eliminating redundant network requests.

### 5. Debounced Search

A custom `useDebounce` hook delays search evaluation by 300 milliseconds. This prevents expensive filtering operations from running on every keystroke, reducing CPU work and improving perceived performance.

---

## State Management Flow

```
┌─────────────┐     ┌──────────────────┐     ┌──────────────┐
│  User Action │────▶│  Context Dispatch │────▶│   useReducer  │
└─────────────┘     └──────────────────┘     └──────┬───────┘
                                                     │
                                                     ▼
                                            ┌──────────────────┐
                                            │   New State      │
                                            │   → Re-render    │
                                            └──────────────────┘
                                                     ▲
                                                     │
┌─────────────┐     ┌──────────────────┐              │
│  API Service │────▶│  fetchProducts() │─────────────┘
└─────────────┘     │  fetchCategories()│
                    └──────────────────┘
```

- **AuthContext** manages `user` and `isAuthenticated` state. On `LOGIN` dispatch, the user object is persisted to `localStorage` via a `useEffect` side effect. On `LOGOUT`, it is removed.
- **ProductContext** manages products, categories, UI filter state (search, category, sort, page), and derived data. Products are fetched once on mount. The filtering pipeline runs as a computed value:
  1. Full-text search on `title` and `description`
  2. Category filter
  3. Sort (price asc/desc, name asc/desc)
  4. Pagination slice

---

## Performance Optimizations

| Technique | Implementation | Impact |
|---|---|---|
| **Code splitting** | `React.lazy()` on all page components | Separate chunks loaded on demand; initial bundle ~76 KB gzipped |
| **React.memo** | `ProductCard`, `SearchBar`, `FilterPanel`, `SortSelect`, `Pagination` | Prevents re-render when parent state changes but props are stable |
| **useCallback** | All event handlers in `ProductList` | Stable function references prevent child re-renders |
| **Debounced search** | Custom `useDebounce` hook (300 ms) | Reduces filter computation from every keystroke to once after typing pauses |
| **Lazy image loading** | `<img loading="lazy" decoding="async">` | Defers offscreen images; reduces initial page weight |
| **Context splitting** | Separate `AuthContext` and `ProductContext` | Components only re-render when their relevant context changes |
| **Dynamic import in callbacks** | `fetchProducts` and `fetchCategories` use dynamic `import()` | Enables further code splitting of the API service |

---

## Responsiveness

The application is fully responsive across three breakpoints using CSS media queries:

| Breakpoint | Target | Layout Adjustments |
|---|---|---|
| **> 768 px** | Desktop | Full horizontal controls bar; 4-column product grid |
| **481–768 px** | Tablet | Stacked controls; 2-column product grid; reduced card image height |
| **≤ 480 px** | Mobile | 2-column grid with smaller cards; compact header; full-width controls |

The layout uses CSS Grid (`grid-template-columns: repeat(auto-fill, minmax(...))`) for the product grid, which naturally adapts to available space. The sticky header provides navigation context on scroll without consuming vertical space.

---

## Testing

**Framework:** Vitest + React Testing Library  
**Total tests:** 31 across 8 test files

| Test file | Tests | Scope |
|---|---|---|
| `validators.test.js` | 6 | Email format, password length, edge cases |
| `useDebounce.test.js` | 3 | Initial value, delayed update, cancellation on rapid input |
| `LoginForm.test.jsx` | 5 | Render, validation errors on submit, invalid email, short password, success state |
| `ProductCard.test.jsx` | 4 | Product details, image rendering, missing rating fallback, star display |
| `Pagination.test.jsx` | 7 | Render conditions, active page highlight, disabled buttons, click handlers, ellipsis |
| `LoadingSpinner.test.jsx` | 1 | ARIA role and accessible label |
| `ErrorMessage.test.jsx` | 3 | Message display, retry button callback, no-retry render |
| `EmptyState.test.jsx` | 2 | Default and custom messages |

Tests follow the Arrange-Act-Assert pattern and simulate user interactions via `@testing-library/user-event` rather than firing synthetic DOM events, ensuring tests resemble real user behavior.

---

## Conclusion

Nova Store demonstrates a modern React architecture that balances performance, maintainability, and user experience. Key architectural highlights include:

- **Two isolated contexts** with `useReducer` for predictable, testable state management
- **Zero unnecessary network calls** — full dataset cached client-side with local filtering
- **~76 KB initial bundle** achieved through code splitting, lazy loading, and tree shaking
- **31 unit tests** covering critical paths with user-centric testing practices
- **Responsive design** across mobile, tablet, and desktop with minimal CSS overhead

The architecture is intentionally lightweight — avoiding external state management libraries and CSS frameworks — to keep dependencies minimal while demonstrating scalable patterns. The same architectural decisions (context isolation, computed state, debounced inputs, memoization) translate directly to larger applications, making Nova Store a solid foundation for growth.
