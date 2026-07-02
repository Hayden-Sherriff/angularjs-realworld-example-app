# ![RealWorld Example App](project-logo.png)

> React 18 + Vite codebase for [Conduit](https://demo.realworld.io), adhering to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.

## Getting started

```bash
npm install
npm run dev      # start dev server on http://localhost:4100
npm run build    # production build → dist/
npm run preview  # preview production build
npm run lint     # ESLint
```

### Changing the API URL

Set the `VITE_API_URL` environment variable or edit `src/config.js`. Default: `https://conduit.productionready.io/api`.

## Project structure

```
src/
├── config.js                  # appName, api URL, jwtKey
├── main.jsx                   # ReactDOM entry
├── App.jsx                    # Router + layout shell
│
├── context/
│   └── AuthContext.jsx        # Auth provider (currentUser, login, logout, updateUser)
│
├── components/
│   ├── Header.jsx             # Nav bar (auth-conditional)
│   ├── Footer.jsx
│   └── ProtectedRoute.jsx     # Route guard (requireAuth / requireGuest)
│
├── services/
│   ├── api.js                 # Axios instance + interceptors (JWT attach, 401 handling)
│   ├── jwt.js                 # localStorage helper (save / get / destroy)
│   ├── articles.js            # query, get, destroy, save, favorite, unfavorite
│   ├── auth.js                # attemptAuth, update, verifyAuth
│   ├── comments.js            # getAll, add, destroy
│   ├── profile.js             # get, follow, unfollow
│   ├── tags.js                # getAll
│   └── index.js               # barrel re-exports
│
└── features/
    ├── home/Home.jsx           # placeholder — global & personal feed + tags
    ├── auth/Login.jsx          # placeholder — sign-in form
    ├── auth/Register.jsx       # placeholder — sign-up form
    ├── settings/Settings.jsx   # placeholder — user settings
    ├── editor/Editor.jsx       # placeholder — article editor (new + edit)
    ├── article/Article.jsx     # placeholder — article view + comments
    └── profile/
        ├── Profile.jsx         # placeholder — profile layout + Outlet
        ├── ProfileArticles.jsx # placeholder — author articles tab
        └── ProfileFavorites.jsx# placeholder — favorited articles tab
```

## Conventions for feature sessions

Each feature is developed inside its own `src/features/<name>/` folder.

### Shared contracts — do NOT modify

| File | Exports | Notes |
|---|---|---|
| `src/services/api.js` | default axios instance | JWT attach & 401 interceptors |
| `src/services/jwt.js` | `{ save, get, destroy }` | localStorage helper |
| `src/services/articles.js` | `{ query, get, destroy, save, favorite, unfavorite }` | Response shapes match original API |
| `src/services/auth.js` | `{ attemptAuth, update, verifyAuth }` | Used by AuthContext |
| `src/services/comments.js` | `{ getAll, add, destroy }` | |
| `src/services/profile.js` | `{ get, follow, unfollow }` | |
| `src/services/tags.js` | `{ getAll }` | |
| `src/context/AuthContext.jsx` | `AuthProvider`, `useAuth()` | Provides `currentUser`, `login(type, creds)`, `logout()`, `updateUser(fields)` |
| `src/components/ProtectedRoute.jsx` | `ProtectedRoute` | `requireAuth` prop (default `true`); `false` = guest-only |
| `src/components/Header.jsx` | `Header` | Auth-conditional nav |
| `src/components/Footer.jsx` | `Footer` | |
| `src/config.js` | `{ api, jwtKey, appName }` | |

### Routes

| Path | Component | Guard |
|---|---|---|
| `/` | `Home` | none |
| `/login` | `Login` | guest-only |
| `/register` | `Register` | guest-only |
| `/settings` | `Settings` | auth required |
| `/editor` | `Editor` | auth required |
| `/editor/:slug` | `Editor` | auth required |
| `/article/:slug` | `Article` | none |
| `/@:username` | `Profile > ProfileArticles` | none |
| `/@:username/favorites` | `Profile > ProfileFavorites` | none |

### Styling

The existing Bootstrap/Conduit CSS is loaded from `//demo.productionready.io/main.css` plus Ionicons. Keep the same classNames as the original templates.

---

[![Brought to you by Thinkster](https://raw.githubusercontent.com/gothinkster/realworld/master/media/end.png)](https://thinkster.io)
