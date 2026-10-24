# Taskly Frontend (React)

A task manager frontend: sign up, manage your profile and avatar, and create, filter, sort and paginate to-do tasks. It is a single-page React application organised by feature and served by nginx in production.

The browser talks to a separate Taskly REST API configured through environment variables.

**Stack:** React 19 · TypeScript · Vite · Chakra UI v3 · TanStack Query · React Router · React Hook Form · Vitest + Testing Library + MSW · Playwright · Docker · GitHub Actions

## Contents

- [Quick start](#quick-start)
- [Features](#features)
- [Configuration](#configuration)
- [Architecture](#architecture)
- [Routes](#routes)
- [Testing](#testing)
- [CI](#ci)
- [Limits](#limits)
- [References](#references)

## Quick start

Requires Node.js 22.22+ and a running Taskly API.

```sh
cd taskly-frontend
cp .env.example .env
npm ci
npm run dev
```

The app runs at http://localhost:3000.

| Goal                     | Command                                      |
| ------------------------ | -------------------------------------------- |
| Run in development       | `npm run dev`                                |
| Run the production build | `npm run build && npm run preview`           |
| Run with Docker          | `make docker/up` (from `taskly-docker`)      |
| Stop Docker              | `make docker/down` (from `taskly-docker`)    |

`PORT` overrides the host port in the Docker setup. The container always listens on port 3000. `VITE_*` values are baked in at build time, so changing them requires `make docker/up` again.

## Features

- **Authentication**: sign up, sign in and sign out, with private routes for signed-in pages.
- **Profile**: update profile details, upload an avatar and delete the account.
- **Tasks**: create, edit, view and delete tasks.
- **Listing**: filter, sort and paginate tasks.
- **Platform**: loading skeletons, error states, toast notifications, `/ping` health check in the Docker image.

## Configuration

| Variable               | Default                        | Purpose                       |
| ---------------------- | ------------------------------ | ----------------------------- |
| `VITE_API_BASE_URL`    | `http://localhost:8080/api/v1` | REST API base URL             |
| `VITE_SERVER_BASE_URL` | `http://localhost:8080`        | Host serving uploaded avatars |
| `PORT`                 | `3000`                         | Host port used by Docker      |

## Architecture

### Project layout

```
taskly-frontend/
  src/
    app/        providers, router, layouts
    features/   auth, users, tasks, home
    shared/     api client, config, components, storage helpers
    test/       MSW setup, fake backend, factories, render helpers
  e2e/          Playwright suites
taskly-docker/
  taskly-frontend/Dockerfile
  docker-compose.local.yml
  Makefile
.github/workflows/ci.yml
```

### Feature layout

```
features/<name>/
  api/          HTTP calls
  components/   React components
  hooks/        TanStack Query hooks
  pages/        route pages
  utils/        pure helpers
  types.ts      feature types
  index.ts      public API
```

### Dependency rules

- A feature is imported only through its `index.ts`. ESLint `no-restricted-imports` rejects deep imports such as `@/features/tasks/hooks/useTasks`.
- `shared` never imports a feature.
- Type-only imports use `import type`.

## Routes

| Route                | Purpose                 |
| -------------------- | ----------------------- |
| `/`                  | Home                    |
| `/signup`, `/signin` | Authentication          |
| `/profile`           | Profile and avatar      |
| `/tasks`             | Task list               |
| `/create-task`       | Create a task           |
| `/tasks/:taskId`     | Task detail             |
| `/update-task/:id`   | Edit a task             |

## Testing

| Layer         | Command                    | What it proves                                        |
| ------------- | -------------------------- | ----------------------------------------------------- |
| Unit          | `npm run test:unit`        | Pure helpers, stores, API client and small components |
| Integration   | `npm run test:integration` | Pages and flows in jsdom against a mocked API (MSW)   |
| Coverage      | `npm run test:coverage`    | All Vitest tests with V8 coverage                     |
| E2E (browser) | `npm run test:e2e`         | Playwright journeys in Chromium against a mocked API  |

Install Playwright's browser once with `npm run test:e2e:install` before running the browser suite. Other checks: `npm run lint`, `npm run typecheck`.

## CI

`.github/workflows/ci.yml` runs these jobs:

1. **Quality**: lint, typecheck, unit and integration tests with coverage.
2. **Build**: production build.
3. **E2E**: the Playwright suite in Chromium.
4. **Docker**: image build plus a smoke test that checks `/ping` and requests every page on port 3000.
5. **Commitlint**: commit message linting on pull requests, configured in `.commitlintrc.json`.

## Limits

- The app needs a running Taskly API; it does not ship a backend.
- Uploaded avatars are loaded from `VITE_SERVER_BASE_URL`.
- The Docker image serves static files, so API URLs are fixed at build time.

## References

- [React documentation](https://react.dev)
- [Vite](https://vite.dev)
- [Chakra UI](https://chakra-ui.com)
- [TanStack Query](https://tanstack.com/query/latest)
- [React Router](https://reactrouter.com)
- [React Hook Form](https://react-hook-form.com)
- [Vitest](https://vitest.dev) · [Testing Library for React](https://testing-library.com/docs/react-testing-library/intro/) · [MSW](https://mswjs.io) · [Playwright](https://playwright.dev)
- [Docker multi-stage builds](https://docs.docker.com/build/building/multi-stage/)
- [nginx-unprivileged](https://hub.docker.com/r/nginxinc/nginx-unprivileged)
