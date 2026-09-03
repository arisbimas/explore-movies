"use client";

import { useMovies } from "@/hooks/useMovies";
import { MovieCategory } from "@/types/movie";
import MovieCard from "./MovieCard";
import SegmentedControl from "@/components/ui/SegmentedControl";
import MovieSkeleton from "@/components/movies/MovieSkeleton";
import ErrorState from "@/components/ui/ErrorState";
import Pagination from "@/components/ui/Pagination";
import ResultCount from "@/components/movies/ResultCount";
import { useRouter } from "next/navigation";

const categoryOptions: {
    label: string;
    value: MovieCategory;
}[] = [
        { label: "Now Playing", value: "now_playing" },
        { label: "Popular", value: "popular" },
        { label: "Top Rated", value: "top_rated" },
        { label: "Upcoming", value: "upcoming" },
    ];

interface MovieListProps {
    category: string;
    page: number;
}

export default function MovieList({
    category: initialCategory,
    page,
}: MovieListProps) {
    const router = useRouter();

    const validCategories: MovieCategory[] = [
        "now_playing",
        "popular",
        "top_rated",
        "upcoming",
    ];

    const category = validCategories.includes(initialCategory as MovieCategory) ? (initialCategory as MovieCategory) : "now_playing";

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

    const currentCategory = categoryOptions.find((option) => option.value === category)?.label ?? "Now Playing";

    const updateUrl = (nextCategory: string, nextPage: number) => {
        router.push(
            `?category=${encodeURIComponent(nextCategory)}&page=${nextPage}`,
        );
    };

    const handleCategoryChange = (label: string) => {
        const found = categoryOptions.find(
            (option) => option.label === label,
        );

        if (!found) return;

        updateUrl(found.value, 1);
    };

    return (
        <div className="py-4 px-4 sm:px-3 lg:px-8">
            <div className="mb-8 flex flex-col items-center gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Discover Movies
                    </h1>

                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-foreground/70">
                        Explore movies currently playing, popular titles,
                        top-rated films, and upcoming releases.
                    </p>
                </div>
                <SegmentedControl
                    options={categoryOptions.map(
                        (option) => option.label,
                    )}
                    value={currentCategory}
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
                    <div className="mb-5 flex items-end justify-between">
                        <div>
                            <h2 className="text-lg font-semibold">
                                {currentCategory}
                            </h2>
                            <ResultCount count={data.total_results} label="movies found" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-5 lg:grid-cols-5">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} {...movie} />
                        ))}
                    </div>

                    {data.total_pages > 1 && (
                        <Pagination
                            page={page}
                            totalPages={data.total_pages}
                            onPageChange={(page) => updateUrl(category, page)}
                        />
                    )}
                </>
            )}
        </div>
    );
}