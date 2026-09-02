import { useQuery } from "@tanstack/react-query";
import { getMovies } from "@/lib/api/movies";
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
        queryFn: () => getMovies({ category, page }),
    });
}