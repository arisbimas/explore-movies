import { apiClient } from "@/lib/api/apiClient";

import type { MovieResponse } from "@/types/movie";

interface SearchMoviesParams {
    query: string;
    page?: number;
}

export async function searchMovies({
    query,
    page = 1,
}: SearchMoviesParams): Promise<MovieResponse> {
    const response = await apiClient.get("/search", {
        params: {
            query,
            page,
        },
    });

    return response.data;
}