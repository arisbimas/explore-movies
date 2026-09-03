import { useQuery } from "@tanstack/react-query";

import { searchMovies } from "@/lib/api/search";

interface UseMovieSearchParams {
    query: string;
    page?: number;
}

export function useMovieSearch({
    query,
    page = 1
}: UseMovieSearchParams) {
    return useQuery({
        queryKey: ["movie-search", query, page],
        queryFn: () => searchMovies({ query, page }),
        enabled: query.trim().length > 0,
    });
}