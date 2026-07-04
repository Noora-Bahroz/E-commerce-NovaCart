# NovaCart – E-Commerce Dashboard

A production-quality e-commerce dashboard built with **React 19**, **Vite**, and **Context API** demonstrating modern front-end architecture, performance optimization, and responsive design.

**Live Demo:** [e-commerce-novacart-zeta.vercel.app ](https://e-commerce-novacart-zeta.vercel.app/)
**Repository:** https://github.com/Noora-Bahroz/E-commerce-NovaCart

---

## Setup Instructions

```bash
# Clone the repository
git clone https://github.com/your-username/ecommerce-dashboard.git
cd ecommerce-dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Create production build
npm run build

# Preview production build
npm run preview
```

## Features

- **Mock Authentication** – Login form with field validation, session persisted via `localStorage`
- **Product Catalog** – Fetches from [Fake Store API](https://fakestoreapi.com)
- **Search** – Debounced full-text search across product name and description
- **Filter** – Category dropdown filter
- **Sort** – Sort by price (asc/desc) and name (asc/desc)
- **Pagination** – Client-side pagination with ellipsis for large ranges
- **Responsive Design** – Optimized for mobile (320px+), tablet, and desktop
- **State Management** – Context API + `useReducer` for auth and product state
- **Error Handling** – Dedicated error state with retry capability
- **Empty State** – Friendly message when no products match filters
- **Loading State** – Animated spinner during API fetch
- **Form Validation** – Email format and password length validation with inline errors
- **Unit Tests** – 31 tests covering validators, hooks, components, and auth flow

---

## Architecture

```
src/
├── components/
│   ├── Auth/            LoginForm, ProtectedRoute
│   ├── common/          LoadingSpinner, ErrorMessage, EmptyState
│   ├── Layout/          Header, AppLayout
│   └── Products/        ProductList, ProductCard, SearchBar,
│                        FilterPanel, SortSelect, Pagination
├── context/             AuthContext, ProductContext
├── hooks/               useDebounce, useLocalStorage
├── pages/               LoginPage, DashboardPage, NotFoundPage
├── services/            api.js (fetch layer)
├── test/                Unit tests (Vitest)
├── utils/               validators.js
├── App.jsx              Router + lazy-loaded pages
├── main.jsx             Entry point
└── index.css            Global styles (responsive)
```

### Key Decisions

| Concern | Approach |
|---|---|
| **State Management** | Context API + `useReducer` – lighter than Redux for this scope; two isolated contexts avoid unnecessary re-renders |
| **Routing** | React Router v7 with lazy-loaded pages (`React.lazy` + `Suspense`) for code splitting |
| **API Layer** | Thin async functions in `services/api.js`; dynamic `import()` inside callbacks for potential chunk splitting |
| **Search Optimization** | `useDebounce` hook delays filter execution by 300ms, preventing re-renders on every keystroke |
| **Render Optimization** | `React.memo` on pure presentational components (ProductCard, Pagination, SearchBar, etc.); `useCallback` for stable handler references |
| **Styling** | Plain CSS with CSS custom properties for theming; no extra dependency |
| **Testing** | Vitest + React Testing Library – 31 tests across critical paths |

### Performance Optimizations

1. **Code Splitting** – All page components are lazy-loaded via `React.lazy()` and wrapped in `<Suspense>`
2. **Debounced Search** – The `useDebounce` hook (300ms) ensures filtering only runs after the user stops typing
3. **Memoization** – `React.memo` wraps ProductCard, SearchBar, FilterPanel, SortSelect, and Pagination; `useCallback` stabilizes all event handlers in ProductList
4. **Efficient Context Splitting** – Auth and Product contexts are separate; components only re-render when their relevant context changes
5. **Lazy Image Loading** – Product images use `loading="lazy"` and `decoding="async"`
6. **Computed Filtering** – Filter/sort/paginate logic uses `useMemo`-equivalent computed property inside the context provider

### Data Flow

```
User Action → Component → Context Dispatch → Reducer → New State → Re-render
                                     ↕
                              API Service → fetch()
```

- Product data is fetched once on mount and cached in context
- Search, filter, and sort operate on the cached data (no additional API calls)
- Pagination is purely client-side
- Auth state is synced with `localStorage` for persistence across sessions

---

## Testing

```bash
npm test                 # Run all tests (CI mode)
npm run test:watch       # Watch mode for development
```

**Test coverage:**
- `validators.test.js` – 6 tests (email/password validation)
- `useDebounce.test.js` – 3 tests (initial value, delay, cancel)
- `LoginForm.test.jsx` – 5 tests (render, validation errors, success)
- `ProductCard.test.jsx` – 4 tests (details, image, no-rating fallback, stars)
- `Pagination.test.jsx` – 7 tests (render, active page, disabled state, callbacks)
- `LoadingSpinner.test.jsx` – 1 test (status role)
- `ErrorMessage.test.jsx` – 3 tests (message, retry button, no-retry)
- `EmptyState.test.jsx` – 2 tests (default + custom message)

**Total: 31 tests**

---

## Tech Stack

- **React 19** – Latest stable with concurrent features
- **Vite 8** – Fast bundler with HMR
- **React Router v7** – Declarative routing with lazy loading
- **Context API + useReducer** – State management
- **Vitest + Testing Library** – Unit testing
- **Fake Store API** – Product data source
- **CSS Custom Properties** – Theming and responsive design

---

## Deployment

The app is deployed on **Vercel**:

1. Push the repo to GitHub
2. Import the project in Vercel
3. Vercel auto-detects Vite and uses `npm run build`
4. Done

Alternatively, deploy anywhere that supports static files:
```bash
npm run build    # Outputs to dist/
```
