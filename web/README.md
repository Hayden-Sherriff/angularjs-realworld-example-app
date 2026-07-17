# Conduit — React + Vite + TypeScript

A ground-up rewrite of the AngularJS 1.5 "Conduit" ([RealWorld](https://github.com/gothinkster/realworld) spec) app that lives at the repo root in `src/`. This `web/` project contains the **Wave 1 foundation**: the shared infrastructure (API client, auth, routing, layout, shared components) that later per-feature sessions build on. Feature pages are currently stubs.

The original AngularJS app is left untouched under `../src/` for reference.

## Getting started

```bash
cd web
npm install
npm run dev        # start the Vite dev server
```

| Script                 | Purpose                                        |
| ---------------------- | ---------------------------------------------- |
| `npm run dev`          | Start the Vite dev server                      |
| `npm run build`        | Type-check (`tsc -b`) then produce a prod build |
| `npm run preview`      | Preview the production build                    |
| `npm run lint`         | Run ESLint                                      |
| `npm run format`       | Format with Prettier                           |
| `npm run format:check` | Verify formatting                              |
| `npm test`             | Run the Vitest suite once                       |
| `npm run test:watch`   | Run Vitest in watch mode                        |

### API base URL

Defaults to `https://conduit.productionready.io/api` (from the original
`src/js/config/app.constants.js`). Override it with an env var:

```bash
echo "VITE_API_URL=http://localhost:3000/api" > .env.local
```

See `.env.example`.

## Folder conventions

> **Wave 2 sessions: read this before adding a feature.** Keep this structure so
> parallel work stays consistent and merges cleanly.

```
web/
  index.html            App shell. Preserves the CDN <link> tags (ionicons,
                        Google Fonts, demo.productionready.io main.css) from
                        the original src/index.html so styling matches.
  src/
    main.tsx            React entrypoint (mounts <App/> on #root).
    App.tsx             Composition root: AuthProvider > BrowserRouter > routes.
    config/
      constants.ts      AppConstants (API URL, jwtKey, appName).
    api/                Typed API layer (ported from src/js/services/*).
      types.ts          Domain models: User, Profile, Article, Comment, Tag,
                        request payloads, list config, ApiErrors.
      client.ts         fetch wrapper + JWT request interceptor + 401 handling.
                        Throws ApiError (status + errors body) on failure.
      jwt.ts            Token persistence in localStorage.
      auth.ts           /users, /users/login, /user  (login/register/update/me).
      articles.ts       /articles*  (query/get/save/destroy/favorite).
      comments.ts       /articles/:slug/comments*.
      profiles.ts       /profiles/:username*  (get/follow/unfollow).
      tags.ts           /tags.
      index.ts          Barrel. Import as namespaces: `import { articlesApi } from '@/api'`.
    auth/               Auth context + guards (ported from user.service.js).
      AuthContext.tsx   Context type + createContext.
      AuthProvider.tsx  Provider: verifyAuth() on mount, authenticate/logout/update.
      useAuth.ts        useAuth() hook.
      RequireAuth.tsx   Route guard (ensureAuthIs equivalent). requireAuth={false}
                        makes a route guest-only.
    components/         Shared, cross-feature UI (ported from src/js/components).
      ListErrors.tsx    Renders RealWorld validation errors.
      ShowAuthed.tsx    Conditional render by auth state (show-authed directive).
    layout/             App shell (ported from src/js/layout).
      AppLayout.tsx     Header + <Outlet/> + Footer (the abstract `app` state).
      Header.tsx        Nav bar.
      Footer.tsx        Footer.
    pages/              One file per route. Wave 1 ships stubs; Wave 2 replaces
                        each with the real page. Feature-local components live
                        next to their page (e.g. src/pages/article/CommentList.tsx).
    router/
      AppRoutes.tsx     Route table mapping paths to pages and guards.
    test/
      setup.ts          Vitest/RTL setup (jest-dom, cleanup).
```

### Where things go (Wave 2)

- **A new page** → replace the stub in `src/pages/<Feature>Page.tsx`.
- **Components used by one page** → colocate under `src/pages/<feature>/`.
- **Components used across features** → `src/components/`.
- **New API calls** → extend the matching module in `src/api/` (or add a new one
  + export it from `src/api/index.ts`). Never call `fetch` directly from a
  component; go through `apiClient`.
- **New route** → add it in `src/router/AppRoutes.tsx`; wrap protected routes in
  `<RequireAuth>`, guest-only routes in `<RequireAuth requireAuth={false} />`.
- **Reading the current user / auth state** → `useAuth()`, never touch `JWT`
  directly in components.

### Path alias

`@/` maps to `src/` (configured in `vite.config.ts` and `tsconfig.app.json`),
e.g. `import { useAuth } from '@/auth'`.

## Route ↔ original ui-router state map

| Route                    | Page          | Original state       | Guard              |
| ------------------------ | ------------- | -------------------- | ------------------ |
| `/`                      | HomePage      | `app.home`           | —                  |
| `/login`                 | LoginPage     | `app.login`          | guest-only         |
| `/register`              | RegisterPage  | `app.register`       | guest-only         |
| `/article/:slug`         | ArticlePage   | `app.article`        | —                  |
| `/editor`, `/editor/:slug` | EditorPage  | `app.editor`         | auth required      |
| `/settings`              | SettingsPage  | `app.settings`       | auth required      |
| `/@:username`            | ProfilePage   | `app.profile.main`   | —                  |
| `/@:username/favorites`  | ProfilePage   | `app.profile.favorites` | —               |
