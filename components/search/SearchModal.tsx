"use client";

import { useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { useDebounce } from "@/hooks/useDebounce";
import { Movie } from "@/types/movie";
import { useMovieSearch } from "@/hooks/useMovieSearch";
import MovieCard from "@/components/movies/MovieCard";

interface SearchModalProps {
    open: boolean;
    onClose: () => void;
}

export default function SearchModal({
    open,
    onClose,
}: SearchModalProps) {
    const router = useRouter();
    const [keyword, setKeyword] = useState("");
    const debouncedKeyword = useDebounce(keyword, 300);

    const {
        data,
        isLoading,
        isError,
    } = useMovieSearch({
        query: debouncedKeyword,
    });

    const movies = data?.results.slice(0, 5) ?? [];

    if (!open) return null;

    const handleViewAll = () => {
        const query = keyword.trim();
        if (!query) return;
        onClose();
        router.push(
            `/search?query=${encodeURIComponent(query)}`,
        );
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-24 backdrop-blur-sm"
            onMouseDown={onClose}
        >
            <div
                className="w-full max-w-xl overflow-hidden rounded-lg border border-border bg-background shadow-xl"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >
                <div className="flex items-center border-b border-border px-4">
                    <Search
                        size={20}
                        className="shrink-0 text-muted"
                    />

                    <input
                        autoFocus
                        type="input"
                        value={keyword}
                        onChange={(event) =>
                            setKeyword(event.target.value)
                        }
                        placeholder="Search movies by title..."
                        className="h-14 flex-1 bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-muted"
                    />

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close search"
                        className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="max-h-125 overflow-y-auto">
                    {isLoading && (
                        <div className="px-4 py-6 text-center text-sm text-muted">
                            Searching...
                        </div>
                    )}

                    {isError && (
                        <div className="px-4 py-6 text-center text-sm text-muted">
                            Failed to search movies.
                        </div>
                    )}

                    {!isLoading && !isError && debouncedKeyword && movies.length === 0 && (
                        <div className="px-4 py-6 text-center text-sm text-muted">
                            No movies found.
                        </div>
                    )}

                    {!isLoading && !isError && movies.length > 0 && (
                        <div className="divide-y divide-border">
                            {movies.map((movie: Movie) => (
                                <button
                                    key={movie.id}
                                    type="button"
                                    className="flex w-full gap-3 px-4 text-left transition-colors hover:bg-surface-hover"
                                >
                                    <MovieCard
                                        key={movie.id}
                                        {...movie}
                                        variant="search"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {keyword.trim() && (
                    <div className="border-t border-border">
                        <button
                            type="button"
                            onClick={handleViewAll}
                            className="flex w-full items-center justify-between px-4 py-4 text-left text-sm font-medium text-primary cursor-pointer transition-colors hover:bg-surface-hover"
                        >
                            <span>
                                {`View all results for "${keyword.trim()}"`}
                            </span>

                            <span aria-hidden="true"><ArrowRight /></span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}