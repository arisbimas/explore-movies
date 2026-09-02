"use client";

import { useState } from "react";

import { useMovies } from "@/hooks/useMovies";
import { MovieCategory } from "@/types/movie";

import MovieCard from "./MovieCard";
import SegmentedControl from "@/components/ui/SegmentedControl";
import MovieSkeleton from "@/components/movies/MovieSkeleton";
import ErrorState from "@/components/ui/ErrorState";
import Pagination from "@/components/ui/Pagination";
import { Search } from "lucide-react";

const categoryOptions = [
    { label: "Now Playing", value: "now_playing" },
    { label: "Popular", value: "popular" },
    { label: "Top Rated", value: "top_rated" },
    { label: "Upcoming", value: "upcoming" },
] as const;

export default function MovieList() {
    const [category, setCategory] =
        useState<MovieCategory>("now_playing");
    const [page, setPage] = useState(1);

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useMovies({
        category,
        page,
    });

    const movies = data?.results ?? [];

    const handleCategoryChange = (label: string) => {
        const found = categoryOptions.find(
            (option) => option.label === label,
        );

        if (!found) return;

        setCategory(found.value);
        setPage(1);
    };

    const handlePageChange = (nextPage: number) => {
        setPage(nextPage);
    };

    return (
        <div>
            <div className="mb-6 flex justify-between">
                <SegmentedControl
                    options={categoryOptions.map(
                        (option) => option.label,
                    )}
                    value={
                        categoryOptions.find(
                            (option) => option.value === category,
                        )?.label ?? ""
                    }
                    onChange={handleCategoryChange}
                />
            </div>

            {isLoading && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-5 lg:grid-cols-5">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <MovieSkeleton key={index} />
                    ))}
                </div>
            )}

            {isError && !data && (
                <ErrorState
                    title="Failed to load movies"
                    description="Something went wrong while loading movies."
                    onRetry={refetch}
                />
            )}

            {data && !isLoading && !isError && (
                <>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-5 lg:grid-cols-5">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} {...movie} />
                        ))}
                    </div>

                    {data.total_pages > 1 && (
                        <Pagination
                            page={page}
                            totalPages={data.total_pages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}
        </div>
    );
}