"use client";

import { useParams } from "next/navigation";

import { useMovieDetail } from "@/hooks/useMovieDetail";
import { getPosterUrl, getBackdropUrl } from "@/lib/utils";

import MovieSkeleton from "@/components/movies/MovieSkeleton";
import ErrorState from "@/components/ui/ErrorState";
import type { MovieCrew } from "@/types/movie";
import MovieBackdrop from "@/components/movies/detail/MovieBackdrop";
import MovieMainInfo from "@/components/movies/detail/MovieMainInfo";
import MovieCast from "@/components/movies/detail/MovieCast";

export default function MovieDetailPage() {
    const params = useParams();
    const id = Number(params.id);

    const { data: movie, isLoading, isError, refetch } = useMovieDetail(id);

    if (isLoading) {
        return (
            <div>
                <div className="h-70 w-full animate-pulse bg-surface md:h-95" />
                <div className="grid gap-8 px-6 pt-8 md:grid-cols-[280px_1fr]">
                    <MovieSkeleton />
                    <div className="space-y-4">
                        <div className="h-8 w-2/3 animate-pulse rounded bg-surface" />
                        <div className="h-4 w-1/3 animate-pulse rounded bg-surface" />
                        <div className="h-24 w-full animate-pulse rounded bg-surface" />
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !movie) {
        return (
            <ErrorState
                title="Failed to load movie"
                description="Something went wrong while loading movie details."
                onRetry={refetch}
            />
        );
    }

    const backdropUrl = getBackdropUrl(movie.backdrop_path);
    const posterUrl = getPosterUrl(movie.poster_path);
    const director: MovieCrew | undefined = movie.credits.crew.find((person) => person.job === "Director");
    const cast = movie.credits.cast.sort((a, b) => a.order - b.order).slice(0, 6);

    return (
        <div>
            <MovieBackdrop url={backdropUrl} />
            <div className="px-6">
                <MovieMainInfo movie={movie} posterUrl={posterUrl} director={director} />
                {cast.length > 0 && (
                    <MovieCast cast={cast} />
                )}
            </div>
        </div>
    );
}