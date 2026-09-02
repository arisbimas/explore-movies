import { apiClient } from "@/lib/api/apiClient";
import type {
    MovieCategory,
    MovieResponse,
} from "@/types/movie";

interface GetMoviesParams {
    category: MovieCategory;
    page?: number;
}

export async function getMovies({
    category,
    page = 1,
}: GetMoviesParams): Promise<MovieResponse> {
    const response = await apiClient.get("/movies", {
        params: {
            category,
            page,
        },
    });

    return response.data;
}