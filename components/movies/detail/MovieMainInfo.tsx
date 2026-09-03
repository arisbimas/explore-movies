import MovieDirector from "@/components/movies/detail/MovieDirector";
import { getReleaseYear } from "@/lib/utils";
import { MovieCrew, MovieDetail } from "@/types/movie";
import { Dot, Star } from "lucide-react";
import Image from "next/image";

interface MovieMainInfoProps {
    movie: MovieDetail;
    posterUrl: string | null;
    director: MovieCrew | undefined;
}

const DotIcon = () => <Dot size={16} className="text-muted" />

export default function MovieMainInfo({ movie, posterUrl, director }: MovieMainInfoProps) {
    return (
        <div className="grid gap-8 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr]">
            <div className="relative -mt-24 aspect-2/3 w-45 overflow-hidden rounded-xl bg-surface shadow-2xl shadow-black/50 ring-1 ring-border md:sticky md:top-8 md:-mt-32 md:w-full">
                {posterUrl ? (
                    <Image
                        src={posterUrl}
                        alt={movie.title}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-muted">
                        No poster
                    </div>
                )}
            </div>

            <div className="pt-4 md:pt-8">
                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                    {movie.title}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted">
                    <span>{getReleaseYear(movie.release_date)}</span>
                    <span aria-hidden="true"><DotIcon /></span>
                    <span className="flex items-center gap-1 text-primary">
                        <Star size={16} className="fill-primary" />
                        {movie.vote_average.toFixed(1)}
                    </span>
                    {movie.runtime && (
                        <>
                            <span aria-hidden="true"><DotIcon /></span>
                            <span>{movie.runtime} min</span>
                        </>
                    )}
                </div>

                {movie.genres.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                        {movie.genres.map((genre) => (
                            <span
                                key={genre.id}
                                className="rounded-full border border-border px-3 py-1 text-xs text-muted leading-4"
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>
                )}

                <section className="mt-6">
                    <h2 className="text-lg font-semibold">Synopsis</h2>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
                        {movie.overview || "No synopsis available."}
                    </p>
                </section>

                <MovieDirector director={director} />
            </div>
        </div>);
}