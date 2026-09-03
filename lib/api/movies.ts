import { apiClient } from "@/lib/api/apiClient";
import type { MovieCategory, MovieResponse } from "@/types/movie";

interface GetMoviesByCategoryParams {
    category: MovieCategory;
    page?: number;
}

export async function getMoviesByCategory({
    category,
    page = 1,
}: GetMoviesByCategoryParams): Promise<MovieResponse> {
    const response = await apiClient.get("/movies", {
        params: { category, page },
    });
    return response.data;
}