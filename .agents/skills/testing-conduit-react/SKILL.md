---
name: testing-conduit-react
description: Test the Conduit React 18 + Vite scaffold end-to-end. Use when verifying scaffold UI, routing, auth guards, or build pipeline changes.
---

# Testing the Conduit React App

## Prerequisites

- Node.js 18+ installed
- `npm install` completed in the repo root

## Devin Secrets Needed

None required for scaffold testing. If testing authenticated features (login, settings, editor), you would need valid Conduit API credentials.

## Dev Server Setup

```bash
cd /path/to/repo
npm install
npx vite --port 4100
```

The dev server starts on `http://localhost:4100/`. If port 4100 is occupied, Vite auto-selects the next available port -- check the terminal output.

## Key Test Areas

### 1. Layout & Styling
- Navigate to `/` and verify the green "conduit" brand text, nav links (Home, Sign in, Sign up for logged-out), and footer are rendered with Conduit CSS.
- The CSS is bundled locally at `src/conduit.css` (the original external CDN `demo.productionready.io` might be down). If styling appears broken, check that `src/conduit.css` exists and is imported in `src/main.jsx`.

### 2. Route Navigation
- Click nav links and verify URL changes and placeholder content renders:
  - `/` -> "Home -- TODO: implement feed, tags sidebar"
  - `/login` -> "Login -- TODO: implement login form"
  - `/register` -> "Register -- TODO: implement registration form"

### 3. Protected Route Guards
- Navigate directly to `/settings` or `/editor` in the address bar.
- **Expected:** URL should redirect to `/login` (ProtectedRoute with `requireAuth=true`).
- Navigate to `/login` or `/register` while logged in.
- **Expected:** URL should redirect to `/` (ProtectedRoute with `requireAuth=false`).

### 4. Unguarded Routes
- Navigate to `/article/any-slug` and `/@anyuser`.
- **Expected:** Pages render without redirect, showing placeholder content.
- Note: The `/@:username` profile route placeholder text might not be visible due to `.profile-page` CSS class styling. This is cosmetic and expected until feature sessions implement the full profile markup.

### 5. Build & Lint
```bash
npm run lint   # eslint, should exit 0 with no errors
npm run build  # vite build, should produce dist/ directory
```

## Common Issues

- **Port conflicts:** Vite will auto-select next available port if 4100 is busy. Check terminal output.
- **CSS not loading:** If the app renders unstyled, verify `src/conduit.css` exists and is imported in `src/main.jsx`. The original external CDN (`//demo.productionready.io/main.css`) is dead.
- **Ionicons not loading:** These load from `code.ionicframework.com` CDN. If icons are missing, it might be a network/CDN issue.
- **Google Fonts not loading:** Titillium Web and Source Sans Pro load from Google Fonts CDN. Missing fonts fall back to system sans-serif.

## Project Structure

```
src/
  main.jsx          # Entry point, imports conduit.css
  App.jsx           # Routes + layout (Header/Footer)
  config.js         # API URL, JWT key, app name
  conduit.css       # Bundled Conduit/Bootstrap CSS
  context/
    AuthContext.jsx  # Auth provider + useAuth hook
  components/
    Header.jsx       # Nav with auth-conditional links
    Footer.jsx       # Footer with Thinkster attribution
    ProtectedRoute.jsx # Route guard component
  services/
    api.js           # Axios instance with JWT interceptor
    jwt.js           # localStorage JWT helper
    auth.js          # Login/register/verify API
    articles.js      # Articles CRUD API
    profile.js       # Profile follow/unfollow API
    comments.js      # Comments API
    tags.js          # Tags API
  features/          # Placeholder components for parallel sessions
    home/, auth/, settings/, editor/, article/, profile/
```
