# Movie Explorer

A modern movie discovery web application built with Next.js and the TMDB API. Users can explore movies by category, search for movies, view search results with pagination, and explore detailed movie information including cast and director.

## Features

* Browse movies by category:

  * Now Playing
  * Popular
  * Top Rated
  * Upcoming
* Responsive movie catalog with reusable movie cards
* Movie search with debounced input (500ms)
* Quick search modal from the header + dedicated search page
* URL-based category filter and pagination (`?category=&page=` on `/`) + search results (`?query=&page=` on `/search`)
* Movie detail page (`/movies/[id]`)
* Movie poster, backdrop, synopsis, rating, release year, runtime, and genres
* Main cast (top 6) and director information with profile images
* Loading, empty, and error states
* Responsive design for desktop, tablet, and mobile
* Optimized images via `next/image` with TMDB remote pattern

## Tech Stack

* **Next.js 16.3.4** — App Router
* **React 19.2.8**
* **TypeScript 5**
* **Tailwind CSS 4**
* **Axios** — `tmdbClient` (server) + `apiClient` (client)
* **TanStack Query 5** — 5 min `staleTime`, no refetch on window focus
* **Lucide React**
* **TMDB API v3**

## Project Structure

```text
./
├── app/
│   ├── api/
│   │   ├── movies/
│   │   │   ├── route.ts              # GET /api/movies?category=&page=
│   │   │   └── [id]/route.ts         # GET /api/movies/:id (append_to_response=credits)
│   │   └── search/
│   │       └── route.ts              # GET /api/search?query=&page=
│   ├── movies/
│   │   └── [id]/
│   │       └── page.tsx              # Movie detail page
│   ├── search/
│   │   └── page.tsx                  # ?query=&page=
│   ├── layout.tsx
│   ├── page.tsx                  # ?category=&page= → MovieList (controlled)
│   ├── globals.css
│   └── favicon.ico
│
├── components/
│   ├── Header.tsx
│   ├── movies/
│   │   ├── MovieCard.tsx
│   │   ├── MovieList.tsx
│   │   ├── MovieSkeleton.tsx
│   │   ├── ResultCount.tsx
│   │   └── detail/
│   │       ├── MovieBackdrop.tsx
│   │       ├── MovieCast.tsx
│   │       ├── MovieDirector.tsx
│   │       └── MovieMainInfo.tsx
│   ├── search/
│   │   ├── SearchButton.tsx
│   │   ├── SearchModal.tsx
│   │   └── SearchMovieList.tsx
│   └── ui/
│       ├── ErrorState.tsx
│       ├── InputSearch.tsx
│       ├── Pagination.tsx
│       └── SegmentedControl.tsx
│
├── hooks/
│   ├── useDebounce.ts                # default 500ms
│   ├── useMovieDetail.ts
│   ├── useMovies.ts
│   └── useMovieSearch.ts
│
├── lib/
│   ├── api/
│   │   ├── apiClient.ts              # baseURL: /api
│   │   ├── tmdbClient.ts             # baseURL: https://api.themoviedb.org/3, Bearer token
│   │   ├── movies.ts
│   │   └── search.ts
│   ├── query/
│   │   └── queryClient.ts
│   └── utils.ts                      # getPosterUrl, getBackdropUrl, getReleaseYear
│
├── providers/
│   └── QueryProvider.tsx
│
└── types/
    └── movie.ts                      # Movie, MovieResponse, MovieDetail, MovieCast, MovieCrew
```

> Path alias `@/*` maps to `./*` (`tsconfig.json`).

## API Architecture

The application uses Next.js API routes as a server-side proxy between the client and TMDB.

```text
Client (apiClient → /api)
  │
  ├── GET /api/movies?category=now_playing|popular|top_rated|upcoming&page=1
  ├── GET /api/movies/:id
  └── GET /api/search?query=&page=1
        │
        ▼
  Next.js API Routes (tmdbClient)
        │
        ▼
     TMDB API (https://api.themoviedb.org/3)
```

This approach keeps the TMDB access token on the server and prevents exposing it to the browser (`Authorization: Bearer TMDB_ACCESS_TOKEN` in `lib/api/tmdbClient.ts`).

Movie detail uses TMDB's `append_to_response=credits` to fetch movie info, cast, and crew in a single request (`app/api/movies/[id]/route.ts`).

Images are served from `https://image.tmdb.org/t/p/**` and whitelisted in `next.config.ts` via `images.remotePatterns`.

## Environment Variables

Create a `.env.local` file in the project root (see `.env.sample`):

```env
TMDB_ACCESS_TOKEN=your_tmdb_v4_read_access_token
```

The token is intentionally kept server-side and is **not** exposed via a `NEXT_PUBLIC_` variable.

## Getting Started

Prerequisites: **Node.js 18+**

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.sample .env.local
```

Then add your TMDB Read Access Token to `.env.local`.

### 3. Run the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Available scripts (`package.json`): `dev`, `build`, `start`, `lint`.

## Production Build

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Design Approach

The UI uses a dark, minimal visual style with a focus on movie posters and content hierarchy.

Key principles:

* Reusable components for repeated UI patterns (`MovieCard`, `ResultCount`, `Pagination`)
* Responsive grid-based movie catalog
* Clear visual hierarchy between headings, metadata, and secondary information
* Consistent loading (skeleton), empty, and error states
* URL-based category filter and search + pagination state for shareable links (`?category=` / `?query=` + `&page=`)
* Debounced search (500ms) to avoid unnecessary API requests
* Server-side API layer for TMDB authentication and image optimization

## Deployment

The application is deployed and available at:

**Live Demo:** https://explore-movies-abn.vercel.app/

**GitHub Repository:** https://github.com/arisbimas/explore-movies

## TMDB

Movie data and images are provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).

This project uses the TMDB API for movie information, search, cast, crew, and images.
