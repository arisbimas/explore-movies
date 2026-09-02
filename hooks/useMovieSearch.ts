import { useQuery } from "@tanstack/react-query";

import { searchMovies } from "@/lib/api/search";

interface UseMovieSearchParams {
    query: string;
}

export function useMovieSearch({
    query,
}: UseMovieSearchParams) {
    return useQuery({
        queryKey: ["movie-search", query],
        queryFn: () => searchMovies({ query }),
        enabled: query.trim().length > 0,
    });
}