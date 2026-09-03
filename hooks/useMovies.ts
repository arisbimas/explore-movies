import { useQuery } from "@tanstack/react-query";
import { getMoviesByCategory } from "@/lib/api/movies";
import type { MovieCategory } from "@/types/movie";

interface UseMoviesParams {
    category: MovieCategory;
    page?: number;
}

export function useMovies({
    category,
    page = 1,
}: UseMoviesParams) {
    return useQuery({
        queryKey: ["movies", category, page],
        queryFn: () => getMoviesByCategory({ category, page }),
    });
}