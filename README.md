# Next 16 Ts Boilerplate

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Getting Started

### Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [Docker](https://www.docker.com/) (optional, required for Docker setup)

### Environment variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

---

### Without Docker

> Requires a running MongoDB instance. Update `MONGO_HOST`, `MONGO_PORT`, and credentials in `.env` to point to it.

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

---

### With Docker

> MongoDB is included as a container — no local installation needed.

1. Build and start all services:
   ```bash
   docker compose -f dev.docker-compose.yml up --build
   ```

The application will be available at `http://localhost:3000`.

> **WSL2 users:** Uncomment `WATCHPACK_POLLING=true` in `.env` if hot reload is not working.

## Description

**Next 16 Ts Boilerplate** is a production-ready starting point for building full-stack web applications with Next.js, TypeScript, and MongoDB. It is not a UI kit or a framework — it is the foundation you clone once and stop rebuilding from scratch on every new project.

**The problem it solves:** every Next.js + TypeScript project starts with the same repetitive decisions — how to structure a full-stack codebase, how to separate server logic from client logic, where to put types, how to handle authentication, how to connect to a database safely, and how to deploy the whole thing with Docker and nginx. This boilerplate answers all of those decisions upfront, with a consistent, layered architecture that scales to real applications without introducing unnecessary complexity.

**What it includes:**

- **Next.js 16 + React 19 + TypeScript 5** — App Router with Turbopack for local development and optimized standalone builds for production. Strict typing enforced throughout; no `any`, consistent type imports, explicit return types required.
- **MongoDB + Mongoose** — connection managed with a global cache safe for Next.js hot-reload. Includes a seed mechanism that populates the database on first run.
- **JWT authentication** — cookie-based auth with `HttpOnly` cookies, JWT signed and verified with `jose`, password hashing with `bcryptjs`. Session reading via a `getSession()` server helper usable in any Server Component or API route.
- **Layered server architecture** — each domain (users, products, auth) has a Model, a DAO (data access), a Service (business logic), and a Controller (request handling). API routes are thin delegators that call the controller and nothing else.
- **Frontend service layer** — plain async modules in `src/services/` that wrap `fetch`, throw typed errors on non-ok responses, and keep all API communication out of Client Components.
- **Context + Provider + custom hook pattern** — demonstrated with a counter feature showing how to scope a provider to a specific route, enforce provider usage at the type level, and expose a clean hook API without prop-drilling.
- **Centralized type system** — all TypeScript interfaces live in `src/types/`, split by concern (props, states, contexts, hooks, domain models, API shapes, env variables). Environment variables are parsed and typed once in `src/server/configs/env.config.ts` with lazy memoization to avoid build-time evaluation failures.
- **Docker support** — separate `dev.docker-compose.yml` (with hot reload via webpack polling) and `prod.docker-compose.yml` (multi-stage build, standalone output, nginx reverse proxy). Production containers run as non-root users.
- **nginx reverse proxy** — production nginx config with gzip compression, security headers, and long-lived immutable cache for static assets.
- **Jest 30 + Testing Library** — full test suite with `ts-jest`, `jest-environment-jsdom`, `@testing-library/react`, and `@testing-library/user-event`. Supertest available for API route integration tests.
- **ESLint + Prettier + Husky + lint-staged** — pre-commit hooks block commits with linting errors and auto-format staged files. No manual formatting steps required.

**How to use it:**

1. Clone the repository and install dependencies.
2. Rename the project in `package.json` and update the title in `src/app/layout.tsx`.
3. Set your environment variables following `.env.example`.
4. Replace the template pages, components, services, models, and context with your own domain logic — the folder structure, auth setup, type conventions, database connection, and tooling stay exactly as they are.

## Technologies Used

1. Next.js 16
2. React JS
3. TypeScript
4. CSS3
5. MongoDB
6. Docker
7. Nginx

## Libraries Used

### Dependencies

```
"bcryptjs": "^2.4.3"
"jose": "^5.4.0"
"mongoose": "^8.4.1"
"next": "^16.0.0"
"react": "^19.0.0"
"react-dom": "^19.0.0"
```

### DevDependencies

```
"@eslint/eslintrc": "^3.0.0"
"@eslint/js": "^9.0.0"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/react": "^16.0.1"
"@testing-library/user-event": "^14.5.2"
"@types/bcryptjs": "^2.4.6"
"@types/jest": "^30.0.0"
"@types/node": "^22.0.0"
"@types/react": "^19.2.14"
"@types/react-dom": "^19.2.3"
"@types/supertest": "^6.0.2"
"eslint": "^9.0.0"
"eslint-config-next": "^16.0.0"
"eslint-config-prettier": "^9.0.0"
"eslint-plugin-prettier": "^5.5.5"
"eslint-plugin-react-hooks": "^5.0.0"
"globals": "^15.0.0"
"husky": "^9.0.0"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^15.0.0"
"prettier": "^3.0.0"
"supertest": "^7.0.0"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.0.0"
```

## Available Scripts

| Command                 | Description                          |
| ----------------------- | ------------------------------------ |
| `npm run dev`           | Start development server (Turbopack) |
| `npm run dev:docker`    | Start development server (webpack)   |
| `npm run build`         | Type-check and build for production  |
| `npm run start`         | Start production server              |
| `npm run test`          | Run tests                            |
| `npm run test:watch`    | Run tests in watch mode              |
| `npm run test:coverage` | Run tests with coverage              |
| `npm run lint`          | Check for linting errors             |
| `npm run lint:fix`      | Fix linting errors                   |
| `npm run lint:all`      | Fix linting errors (src + tests)     |
| `npm run format`        | Format code with Prettier            |
| `npm run format:check`  | Check code formatting                |
| `npm run format:all`    | Format Prettier (src + tests)        |

## Testing

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Production

The production setup runs three containers orchestrated by `prod.docker-compose.yml`:

| Container           | Image                   | Role                                      |
| ------------------- | ----------------------- | ----------------------------------------- |
| `boilerplate-nginx` | `nginx:stable-alpine`   | Reverse proxy, public entry point (8080)  |
| `boilerplate-app`   | `Dockerfile.production` | Next.js standalone server (internal only) |
| `boilerplate-db`    | `mongo:7.0`             | MongoDB database (internal only)          |

Only nginx is exposed to the outside. The app and database containers are internal to the Docker network.

### Environment variables

Make sure `.env` is set up before deploying. The values used in production differ from development:

```env
MONGO_HOST=boilerplate-db        # must match the db service name in docker-compose
MONGO_PORT=27017
MONGO_USER=root
MONGO_PASS=<strong-password>
MONGO_DB_NAME=boilerplate_db
MONGO_AUTH_SOURCE=admin
JWT_SECRET=<long-random-secret>
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

> Never commit `.env` to version control. Use `.env.example` as the reference template.

### Deploy

```bash
docker compose -f prod.docker-compose.yml up --build -d
```

The application will be available at `http://localhost:8080` (or your server's IP/domain on port 8080).

### How it works

- **`Dockerfile.production`** uses a three-stage build: `deps` installs packages with `npm ci`, `builder` runs `tsc` + `next build`, and `runner` copies only the standalone output — resulting in a minimal final image.
- **`Dockerfile.nginx`** runs as a non-root user (`appuser`). The `user nginx;` directive is removed from the main nginx config so it can bind to port 8080 without root privileges.
- **nginx** proxies all traffic to the app container. Static assets under `/_next/static/` are cached for 1 year (immutable). Images and fonts are cached for 1 day. HTML responses are never cached.
- **MongoDB** starts with a health check; the app container waits until the database is ready before starting (`depends_on: condition: service_healthy`).
- **Data** is persisted in the `mongo-prod-data` named volume — it survives container restarts and rebuilds.

### Useful commands

```bash
# View running containers
docker compose -f prod.docker-compose.yml ps

# Follow logs
docker compose -f prod.docker-compose.yml logs -f

# Stop all services
docker compose -f prod.docker-compose.yml down

# Stop and remove volumes (wipes the database)
docker compose -f prod.docker-compose.yml down -v

# Rebuild after code changes
docker compose -f prod.docker-compose.yml up --build --force-recreate -d
```

## Env Keys

| Key                                 | Description                                                                          |
| ----------------------------------- | ------------------------------------------------------------------------------------ |
| `MONGO_HOST`                        | MongoDB host. Use `boilerplate-db` when running inside Docker.                       |
| `MONGO_PORT`                        | MongoDB port.                                                                        |
| `MONGO_USER`                        | MongoDB root username.                                                               |
| `MONGO_PASS`                        | MongoDB root password.                                                               |
| `MONGO_DB_NAME`                     | Name of the database to connect to.                                                  |
| `MONGO_AUTH_SOURCE`                 | Database used for authentication (typically `admin`).                                |
| `JWT_SECRET`                        | Secret used to sign and verify JWT tokens. Use a long random string in production.   |
| `NEXT_PUBLIC_APP_URL`               | Public base URL of the application. Used for client-side fetch calls.                |
| `NEXT_REDIRECT_IF_ROUTE_NOT_EXISTS` | If `true`, redirects to home when a route doesn't exist. If `false`, shows 404 page. |
| `WATCHPACK_POLLING`                 | Set to `true` to enable polling-based file watching. Required on some WSL2 setups.   |

```bash
MONGO_HOST=boilerplate-db
MONGO_PORT=27017
MONGO_USER=root
MONGO_PASS=pass
MONGO_DB_NAME=boilerplate_db
MONGO_AUTH_SOURCE=admin
JWT_SECRET=your-secret-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_REDIRECT_IF_ROUTE_NOT_EXISTS=false
# WATCHPACK_POLLING=true
```

## Project Structure

```
next-16-ts-boilerplate/
├── __tests__/                          # Test suite
│   ├── __mocks__/                      # Shared mock data and module mocks
│   ├── jest.globalSetup.ts             # Global setup (runs once before all tests)
│   ├── jest.globalTeardown.ts          # Global teardown (runs once after all tests)
│   └── jest.setup.ts                   # Per-file setup (jest-dom matchers)
├── public/                             # Static assets served as-is
│   ├── icon-192.png
│   └── icon-512.png
├── src/
│   ├── app/                            # Next.js App Router root
│   │   ├── (pages)/                    # Route group for UI pages
│   │   │   ├── about/                  # /about page
│   │   │   ├── context-demo/           # /context-demo page
│   │   │   ├── login/                  # /login page
│   │   │   ├── products/               # /products page
│   │   │   │   └── [id]/               # /products/:id page
│   │   │   └── users/                  # /users page
│   │   ├── api/v1/                     # REST API routes (thin delegators)
│   │   │   ├── auth/login/             # POST /api/v1/auth/login
│   │   │   ├── auth/logout/            # POST /api/v1/auth/logout
│   │   │   ├── products/[id]/          # GET  /api/v1/products/:id
│   │   │   └── users/                  # GET  /api/v1/users
│   │   ├── layout.tsx                  # Root layout (fonts, metadata)
│   │   ├── page.tsx                    # Home page
│   │   ├── not-found.tsx               # 404 page
│   │   ├── error.tsx                   # Error boundary
│   │   ├── manifest.ts                 # Web app manifest
│   │   └── robots.ts                   # Robots.txt
│   ├── components/                     # Reusable UI components
│   │   ├── Action/                     # Button/action wrapper component
│   │   ├── CounterWidget/              # Counter with context demo
│   │   ├── Link/                       # Anchor/Next.js link component
│   │   ├── LoginForm/                  # Login form component
│   │   ├── LogoutButton/               # Logout action component
│   │   └── UserCard/                   # User profile card component
│   ├── contexts/                       # React context definitions and providers
│   │   └── CounterContext/             # Counter state context + provider
│   ├── hooks/                          # Custom React hooks
│   │   └── useCounterContext.tsx       # Hook to consume CounterContext
│   ├── server/                         # Server-only code (never imported by Client Components)
│   │   ├── configs/                    # Server configuration
│   │   │   ├── env.config.ts           # Lazy env variable loader with memoization
│   │   │   └── mongo.config.ts         # MongoDB connection with global cache
│   │   ├── constants/                  # Response codes, messages, and shared values
│   │   ├── controllers/                # Request handling — validates input, calls service
│   │   │   ├── auth.controller.ts
│   │   │   ├── product.controller.ts
│   │   │   └── user.controller.ts
│   │   ├── daos/                       # Data access objects — typed Mongoose queries
│   │   │   ├── product.dao.ts
│   │   │   └── user.dao.ts
│   │   ├── helpers/                    # Stateless server utility functions
│   │   │   ├── get_exception_message.helper.ts
│   │   │   ├── get_session.helper.ts
│   │   │   ├── require_env.helper.ts
│   │   │   └── serialize.helper.ts
│   │   ├── models/                     # Mongoose schema and model definitions
│   │   │   ├── product.model.ts
│   │   │   └── user.model.ts
│   │   ├── services/                   # Business logic layer — one service per domain
│   │   │   ├── auth.service.ts
│   │   │   ├── product.service.ts
│   │   │   └── user.service.ts
│   │   └── startup/                    # Tasks run on first database connection
│   │       └── seed.startup.ts         # Seeds the database if empty
│   ├── services/                       # Client-side fetch wrappers (used in Client Components)
│   │   ├── authService.ts
│   │   ├── productService.ts
│   │   └── userService.ts
│   └── types/                          # TypeScript type definitions split by concern
│       ├── api.ts                      # API document types and response shapes
│       ├── app.ts                      # Domain model types (IUser, IProduct)
│       ├── constants.ts                # Constant key types (codes, messages)
│       ├── contexts.ts                 # Context value types
│       ├── cross.ts                    # Shared primitive types (Env, etc.)
│       ├── env.ts                      # Env variable types
│       ├── helpers.ts                  # Helper function return types
│       ├── hooks.ts                    # Hook return types
│       ├── models.ts                   # Mongoose model types
│       ├── payloads.ts                 # Request payload types
│       ├── props.ts                    # Component prop types
│       ├── responses.ts                # API response types
│       └── states.ts                   # Component state types
├── .env.example                        # Reference template for environment variables
├── dev.docker-compose.yml              # Docker Compose for development
├── prod.docker-compose.yml             # Docker Compose for production
├── Dockerfile.development              # Development image
├── Dockerfile.production               # Multi-stage production image (standalone)
├── Dockerfile.nginx                    # Non-root nginx image
├── nginx.conf                          # nginx reverse proxy configuration
├── eslint.config.js                    # ESLint flat config
├── jest.config.js                      # Jest configuration
├── next.config.js                      # Next.js configuration
└── tsconfig.app.json                   # TypeScript compiler config
```

| Folder / File             | Description                                                                |
| ------------------------- | -------------------------------------------------------------------------- |
| `__tests__/`              | All test files and shared mocks                                            |
| `__tests__/__mocks__/`    | Reusable mock data for tests                                               |
| `src/app/`                | Next.js App Router — pages, layouts, and API routes                        |
| `src/app/(pages)/`        | Route group containing all UI pages                                        |
| `src/app/api/v1/`         | REST API routes — each file only delegates to a controller                 |
| `src/components/`         | Presentational components reused across pages                              |
| `src/contexts/`           | React Context definitions and their Provider components                    |
| `src/hooks/`              | Custom hooks that encapsulate context consumption or reusable logic        |
| `src/server/`             | Server-only code — never imported by Client Components                     |
| `src/server/configs/`     | Database connection and lazy env variable loader                           |
| `src/server/controllers/` | Validates request input, calls the service, and returns the HTTP response  |
| `src/server/daos/`        | Typed Mongoose queries — no business logic, only data access               |
| `src/server/models/`      | Mongoose schema and model definitions                                      |
| `src/server/services/`    | Business logic layer — one service per domain                              |
| `src/server/helpers/`     | Stateless server utility functions (serialization, session, error mapping) |
| `src/server/startup/`     | Tasks executed on first database connection (e.g. database seeding)        |
| `src/services/`           | Client-side `fetch` wrappers — one module per API resource                 |
| `src/types/`              | TypeScript interfaces and types, split by concern                          |
| `dev.docker-compose.yml`  | Development stack with hot reload (webpack polling)                        |
| `prod.docker-compose.yml` | Production stack — app, nginx reverse proxy, and MongoDB                   |
| `Dockerfile.production`   | Three-stage build: install → build → minimal runner                        |
| `Dockerfile.nginx`        | Non-root nginx image with gzip and security headers                        |
| `nginx.conf`              | Reverse proxy config with static asset caching and WebSocket support       |

## Architecture & Design Patterns

### Layered Server Architecture

The server side is organized into four explicit layers. Each layer has a single responsibility and only communicates with the layer directly below it:

```
API Route (route.ts)
    └── Controller          ← validates input, handles HTTP
        └── Service         ← business logic
            └── DAO         ← database queries
                └── Model   ← Mongoose schema
```

- **API Route** — the Next.js `route.ts` file is a thin delegator. It calls the controller and returns the result. No logic lives here.
- **Controller** — reads and validates the request, calls the appropriate service method, and returns a structured HTTP response. Error handling via a centralized `getExceptionMessage` helper.
- **Service** — contains all business logic (hashing passwords, signing tokens, domain rules). It calls DAOs to access data and never touches the HTTP layer.
- **DAO (Data Access Object)** — typed wrappers around Mongoose queries. No business logic — only reads and writes to the database.
- **Model** — Mongoose schema and model definition. The single source of truth for the document shape and validation rules.

---

### Server / Client Separation

Next.js distinguishes between Server Components (run on the server, can access the database directly) and Client Components (run in the browser, must communicate via API). This project enforces a strict boundary:

- **Server Components** call `src/server/services/` directly — no fetch, no network round-trip.
- **Client Components** call `src/services/` — plain `fetch` wrappers that hit the API routes.
- Everything under `src/server/` is server-only and is never imported by any Client Component.

---

### Design Patterns

**DAO (Data Access Object)**
Each domain has a dedicated DAO (`user.dao.ts`, `product.dao.ts`) that encapsulates all Mongoose queries. Business logic in services never calls `Model.find()` directly — it goes through the DAO. This makes queries easy to swap, mock in tests, and read in isolation.

**Service Layer**
Business logic is fully isolated in service modules. Controllers do not make decisions — they delegate to services. This means the same service method can be called from an API route, a Server Component, or a startup script without any changes.

**Context + Provider + Custom Hook**
Client-side shared state follows a three-piece pattern: a Context that defines the shape, a Provider that owns the state and wraps the subtree, and a custom hook (`useCounterContext`) that enforces the provider is present and exposes a clean API. Components never consume context directly.

**Lazy Initialization (Memoization)**
`getEnvs()` in `env.config.ts` uses a module-level `_envs` variable to cache the result after the first call. This prevents `requireEnv()` from being evaluated at module load time — which would cause Next.js builds to fail because server modules are analyzed without runtime environment variables available.

**Singleton (Global Cache)**
The MongoDB connection uses a `global._mongooseCache` object to persist the connection across Next.js hot-reloads in development. Without this, each file change would open a new connection and exhaust the pool.

**Centralized Error Mapping**
`getExceptionMessage()` maps any thrown value — Mongoose `CastError`, `ValidationError`, or unknown — to a consistent `{ status, code, message }` shape. Controllers call this helper in their catch blocks, so error response formatting is never duplicated across routes.

## Code Quality Tools

### ESLint

Configured with TypeScript strict rules (`typescript-eslint` recommended + strictTypeChecked + stylisticTypeChecked) and Next.js core web vitals rules:

- Explicit return types required on all functions
- No `any` type allowed (relaxed inside `__tests__/`)
- Consistent type imports enforced (`import type`)
- No unused variables (leading `_` exempted)
- `interface` preferred over `type` for object shapes
- `===` required, no `var`, `prefer-const`
- `no-console` warned, `no-debugger` blocked
- React hooks rules enforced
- Prettier formatting applied as an ESLint error

### Prettier

Automatic code formatting on save and on commit:

- 2 spaces indentation
- Semicolons required
- Double quotes
- Trailing commas (ES5)
- Print width: 100 characters
- Arrow function parentheses always included
- LF line endings

### Husky + lint-staged

Pre-commit hooks that automatically:

- Run ESLint with auto-fix on staged `.ts` and `.tsx` files
- Format `.ts`, `.tsx`, `.css`, `.json`, and `.md` files with Prettier
- Block commits with remaining linting errors

## Security

### npm audit

Check for known vulnerabilities in dependencies:

```bash
npm audit
```

Fix automatically where possible:

```bash
npm audit fix
```

### Authentication

- Passwords are hashed with `bcryptjs` before being stored — plain text passwords never reach the database.
- JWT tokens are signed with `jose` using a secret defined in `JWT_SECRET`. Tokens are stored in `HttpOnly` cookies, making them inaccessible to JavaScript in the browser.
- The `getSession()` helper verifies the token on every request. An invalid or expired token returns `null` — no exceptions propagate to the caller.
- The `auth-token` cookie is set with `Secure` in production and `SameSite=Lax` to mitigate CSRF attacks.

## Known Issues

None at the moment.
