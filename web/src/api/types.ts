// TypeScript domain models for the RealWorld "Conduit" API.
// Derived from the AngularJS service layer (src/js/services/*) and the
// RealWorld API spec: https://github.com/gothinkster/realworld/tree/main/api

/** The authenticated user, including the JWT token. Returned by /users, /user. */
export interface User {
  email: string;
  token: string;
  username: string;
  bio: string | null;
  image: string | null;
}

/** A public profile of a user, including the viewer's follow relationship. */
export interface Profile {
  username: string;
  bio: string | null;
  image: string | null;
  following: boolean;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}

export interface Comment {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Profile;
}

/** A tag is represented as a plain string by the API. */
export type Tag = string;

// ---------------------------------------------------------------------------
// Request payloads
// ---------------------------------------------------------------------------

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

/** Fields accepted by PUT /user (settings page). */
export interface UpdateUserFields {
  email?: string;
  username?: string;
  bio?: string;
  image?: string;
  password?: string;
}

/** Payload for creating/updating an article. `slug` present => update. */
export interface ArticleFormData {
  slug?: string;
  title: string;
  description: string;
  body: string;
  tagList?: string[];
}

// ---------------------------------------------------------------------------
// Article listing / query
// ---------------------------------------------------------------------------

/** Mirrors the config object accepted by Articles.query() in the AngularJS app. */
export interface ArticleListConfig {
  /** "all" hits /articles, "feed" hits /articles/feed. */
  type: 'all' | 'feed';
  /** Key/value pairs serialized as URL query params (tag, author, favorited, limit, offset). */
  filters?: ArticleListFilters;
}

export interface ArticleListFilters {
  tag?: string;
  author?: string;
  favorited?: string;
  limit?: number;
  offset?: number;
  // Index signature keeps this compatible with the client's generic params type.
  [key: string]: string | number | undefined;
}

export interface ArticleListResponse {
  articles: Article[];
  articlesCount: number;
}

// ---------------------------------------------------------------------------
// Errors
// ---------------------------------------------------------------------------

/** RealWorld 422 validation errors: { errors: { field: string[] } }. */
export type ApiErrors = Record<string, string[]>;
