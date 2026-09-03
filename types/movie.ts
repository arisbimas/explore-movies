export type MovieCategory =
    | "now_playing"
    | "popular"
    | "top_rated"
    | "upcoming";

export interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
}

export interface MovieResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface MovieCast {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
    order: number;
}

export interface MovieCrew {
    id: number;
    name: string;
    job: string;
    department: string;
    profile_path: string | null;
}

export interface MovieDetail extends Movie {
    overview: string;
    backdrop_path: string | null;
    runtime: number | null;
    genres: {
        id: number;
        name: string;
    }[];
    credits: {
        cast: MovieCast[];
        crew: MovieCrew[];
    };
}