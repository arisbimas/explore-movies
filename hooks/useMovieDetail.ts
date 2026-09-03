import { useQuery } from "@tanstack/react-query";
import { getMovieDetail } from "@/lib/api/movies";

export function useMovieDetail(id: number) {
    return useQuery({
        queryKey: ["movie", id],
        queryFn: () => getMovieDetail(id),
        enabled: Number.isFinite(id),
    });
}