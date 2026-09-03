"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { useMovieSearch } from "@/hooks/useMovieSearch";
import { getPosterUrl, getReleaseYear } from "@/lib/utils";
import MovieCard from "@/components/movies/MovieCard";
import MovieSkeleton from "@/components/movies/MovieSkeleton";
import Pagination from "@/components/ui/Pagination";
import ErrorState from "@/components/ui/ErrorState";
import InputSearch from "@/components/ui/InputSearch";
import ResultCount from "@/components/movies/ResultCount";

interface SearchMovieListProps {
    query: string;
    page: number;
}

export default function SearchMovieList({
    query,
    page,
}: SearchMovieListProps) {
    const router = useRouter();

    const [keyword, setKeyword] = useState(query);
    const debouncedKeyword = useDebounce(keyword);

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useMovieSearch({
        query: debouncedKeyword,
        page,
    });

    const movies = data?.results ?? [];

    useEffect(() => {
        const nextQuery = debouncedKeyword.trim();

        if (nextQuery === query) return;

        if (!nextQuery) {
            router.replace("/search");
            return;
        }

        router.replace(
            `/search?query=${encodeURIComponent(nextQuery)}&page=1`,
        );
    }, [debouncedKeyword, query, router]);

    const handlePageChange = (nextPage: number) => {
        router.push(
            `/search?query=${encodeURIComponent(
                debouncedKeyword,
            )}&page=${nextPage}`,
        );
    };

    return (
        <div className="py-4 px-4 sm:px-3 lg:px-8">
            <div className="mb-8">
                <InputSearch
                    value={keyword}
                    onChange={(event) => {
                        setKeyword(event.target.value);
                    }}
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
                    title="Failed to search movies"
                    description="Something went wrong while searching movies."
                    onRetry={refetch}
                />
            )}

            {data && !isLoading && !isError && movies.length === 0 && (
                <div className="py-16 text-center">
                    <p className="text-sm text-muted">
                        No movies found for <span className="text-primary">{`"${debouncedKeyword}"`}</span>.
                    </p>
                </div>
            )}

            {data && !isLoading && !isError && movies.length > 0 && (
                <>
                    <div className="mb-5">
                        <h1 className="text-xl font-semibold">
                            Search results for <span className="text-primary">{`"${debouncedKeyword}"`}</span>
                        </h1>
                        <ResultCount count={data.total_results} label="movies found" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-5 lg:grid-cols-5">
                        {movies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                id={movie.id}
                                title={movie.title}
                                poster_path={getPosterUrl(
                                    movie.poster_path,
                                )}
                                release_date={getReleaseYear(
                                    movie.release_date,
                                )}
                                vote_average={movie.vote_average}
                            />
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