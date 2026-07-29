# 🏗️ Project Architecture — apm-22

> **Angular 22 Learning Project** — A standalone-component, signal-first Angular application demonstrating modern Angular patterns including the Facade pattern, functional route guards, and reactive state management via Signals.

---

## 📦 Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Angular | ^22.0.0 |
| Language | TypeScript | ~6.0.2 |
| Styling | TailwindCSS v4 + PostCSS | ^4.1.12 |
| Icons | Font Awesome | ^4.7.0 |
| Reactive | RxJS | ~7.8.0 |
| Test Runner | Vitest | ^4.0.8 |
| Coverage | @vitest/coverage-istanbul | ^4.1.10 |
| Package Manager | npm | 11.16.0 |

---

## 📁 Project Structure

```
apm-22/
├── src/
│   ├── index.html                  # App shell / entry HTML
│   ├── main.ts                     # Bootstrap entry point
│   ├── styles.css                  # Global styles
│   └── app/
│       ├── app.ts                  # Root component (App)
│       ├── app.config.ts           # ApplicationConfig providers
│       ├── app.routes.ts           # Top-level route definitions
│       │
│       ├── home/                   # Feature: Home page
│       │   ├── home.ts
│       │   └── home.spec.ts
│       │
│       ├── products/               # Feature: Products
│       │   ├── product.ts                      # Product interface (model)
│       │   ├── product.data.ts                 # Static seed data
│       │   ├── product.service.ts              # HTTP data service
│       │   ├── product.service.spec.ts
│       │   ├── product-facade.ts               # Facade / state manager
│       │   ├── product-facade.spec.ts
│       │   ├── product-detail-guard.ts         # CanActivateFn route guard
│       │   ├── product-detail-guard.spec.ts
│       │   ├── product-list/                   # Route component: /products
│       │   │   ├── product-list.ts
│       │   │   ├── product-list.html
│       │   │   └── product-list.spec.ts
│       │   ├── product-detail/                 # Route component: /products/:id
│       │   │   ├── product-detail.ts
│       │   │   ├── product-detail.html
│       │   │   └── product-detail.spec.ts
│       │   ├── product-edit/                   # Route component: /products/new & /products/:id/edit
│       │   │   ├── product-edit.ts
│       │   │   ├── product-edit.html
│       │   │   └── product-edit.spec.ts
│       │   ├── product-filter/                 # UI sub-component: search/filter bar
│       │   │   ├── product-filter.ts
│       │   │   └── product-filter.spec.ts
│       │   └── product-table/                  # UI sub-component: data table
│       │       ├── product-table.ts
│       │       ├── product-table.html
│       │       └── product-table.spec.ts
│       │
│       ├── shared/                 # Shared/reusable building blocks
│       │   ├── convert-to-spaces-pipe.ts       # Pipe: replaces dashes with spaces
│       │   ├── convert-to-spaces-pipe.spec.ts
│       │   ├── layout/
│       │   │   └── navigation/                 # Top navigation bar component
│       │   │       ├── navigation.ts
│       │   │       └── navigation.spec.ts
│       │   └── star/                           # Star-rating display component
│       │       ├── star.ts
│       │       └── star.spec.ts
│       │
│       └── user/                   # Feature: Authentication
│           ├── user.model.ts                   # User & UserCredentials interfaces
│           ├── auth.ts                         # Auth service (@Service)
│           ├── auth.spec.ts
│           └── login/                          # Route component: /login
│               ├── login.ts
│               ├── login.html
│               └── login.spec.ts
│
├── public/                         # Static assets served at root
├── angular.json                    # Angular CLI workspace config
├── tsconfig.json                   # Root TypeScript config
├── tsconfig.app.json               # App-specific TS config
├── tsconfig.spec.json              # Test-specific TS config
├── .postcssrc.json                 # PostCSS / TailwindCSS v4 config
└── package.json
```

---

## 🗺️ Routing

All routes use **lazy-loaded standalone components** via `loadComponent`.

| Path | Component | Guard |
|---|---|---|
| `/` | → redirect to `/home` | — |
| `/home` | `Home` | — |
| `/products` | `ProductList` | — |
| `/products/new` | `ProductEdit` | — |
| `/products/:id` | `ProductDetail` | `productDetailGuard` |
| `/products/:id/edit` | `ProductEdit` | — |
| `/login` | `Login` | — |
| `**` | → redirect to `/home` | — |

---

## 🧩 Component Tree

```
App (root)
├── Navigation            (shared/layout/navigation)
│   └── RouterLink, RouterLinkActive
└── <router-outlet>
    ├── Home
    ├── ProductList
    │   ├── ProductFilter
    │   └── ProductTable
    │       └── Star (star rating)
    ├── ProductDetail
    │   └── Star
    ├── ProductEdit
    └── Login
```

---

## 🔄 Data & State Flow

The project follows the **Facade pattern** for state management using Angular Signals.

```
HTTP Layer        Service Layer        Facade Layer         UI Layer
──────────        ─────────────        ────────────         ────────
products.json ──► ProductService ───► ProductFacade ──────► ProductList
                  (RxJS / HttpClient)  (Signal store)       ProductDetail
                                       ├─ products()        ProductEdit
                                       ├─ selectedProduct()
                                       ├─ loading()
                                       └─ error()
```

### Key State Signals in `ProductFacade`

| Signal | Type | Description |
|---|---|---|
| `products` | `readonly Signal<Product[]>` | All loaded products |
| `selectedProduct` | `readonly Signal<Product \| null>` | Currently viewed/edited product |
| `loading` | `readonly Signal<boolean>` | Loading indicator |
| `error` | `readonly Signal<string>` | Last error message |
| `productCount` _(computed)_ | `Signal<number>` | Total product count |
| `hasProducts` _(computed)_ | `Signal<boolean>` | Whether any products exist |
| `hasError` _(computed)_ | `Signal<boolean>` | Whether an error is active |

---

## 🔐 Authentication

| File | Role |
|---|---|
| `user/auth.ts` | `@Service()` — holds `currentUser` signal; exposes `isLoggedIn` computed signal, `login()`, `logout()` |
| `user/user.model.ts` | `User` interface (`id`, `username`, `admin`) and `UserCredentials` interface |
| `user/login/login.ts` | Login form component routed at `/login` |

The root `App` component reads `isLoggedIn` from `Auth` and passes it down to `Navigation` via `input()`, which conditionally renders the **Log In / Log Out** button.

> **Note:** The current `Auth.login()` is a mock implementation — it sets a hard-coded user without making a real API call.

---

## 🛡️ Route Guards

| Guard | File | Strategy |
|---|---|---|
| `productDetailGuard` | `product-detail-guard.ts` | Functional `CanActivateFn` — calls `ProductService.getProductById(id)`, redirects to `/products` if not found |

---

## 🔧 Shared Utilities

| Name | Type | Purpose |
|---|---|---|
| `ConvertToSpacesPipe` | `@Pipe` | Replaces a character (default `-`) with spaces in a string |
| `Star` | `@Component` | Renders a 5-star rating using Font Awesome; emits `ratingClicked` event |
| `Navigation` | `@Component` | Top navigation bar; receives `title` and `isLoggedIn` as `input()`, emits `logout` via `output()` |

---

## 🧪 Testing

- **Runner:** [Vitest](https://vitest.dev/) (configured via `@angular/build`)
- **Coverage:** Istanbul (`@vitest/coverage-istanbul`)
- **Command:** `npm test` runs `ng test --coverage`
- Every feature component, service, facade, guard, and pipe has a corresponding `.spec.ts` file.

| Area | Spec File |
|---|---|
| Root App | `app.spec.ts` |
| Home | `home.spec.ts` |
| Product Service | `product.service.spec.ts` |
| Product Facade | `product-facade.spec.ts` |
| Product Detail Guard | `product-detail-guard.spec.ts` |
| Product List | `product-list/product-list.spec.ts` |
| Product Detail | `product-detail/product-detail.spec.ts` |
| Product Edit | `product-edit/product-edit.spec.ts` |
| Product Filter | `product-filter/product-filter.spec.ts` |
| Product Table | `product-table/product-table.spec.ts` |
| Auth Service | `user/auth.spec.ts` |
| Login | `user/login/login.spec.ts` |
| Navigation | `shared/layout/navigation/navigation.spec.ts` |
| Star Component | `shared/star/star.spec.ts` |
| ConvertToSpaces Pipe | `shared/convert-to-spaces-pipe.spec.ts` |

---

## ⚙️ Key Angular Patterns Used

| Pattern | Where |
|---|---|
| **Standalone Components** | All components — no NgModules |
| **Angular Signals** (`signal`, `computed`, `effect`) | `ProductFacade`, `ProductList`, `Auth`, `App` |
| **Facade Pattern** | `ProductFacade` — single source of truth for product state |
| **Functional Route Guards** (`CanActivateFn`) | `productDetailGuard` |
| **Lazy-loaded Routes** (`loadComponent`) | All routes in `app.routes.ts` |
| **Signal-based Inputs/Outputs** (`input()`, `output()`, `model()`) | `Navigation`, `ProductFilter`, `ProductTable` |
| **`inject()` function** | All services — constructor injection avoided |
| **`@Service()` decorator** | `Auth` service (Angular 22 new API) |

---

*Generated: 2026-07-29*
