import Image from "next/image";

import { Movie } from "@/types/movie";
import { getPosterUrl, getReleaseYear } from "@/lib/utils";
import { LucideProps, Star } from "lucide-react";

type MovieCardVariant = "default" | "search";

interface MovieCardProps extends Movie {
    variant?: MovieCardVariant;
}

const RatingIcon = (props: LucideProps) => (
    <Star
        {...props}
        className={`fill-primary ${props.className ?? ""}`}
    />
);

export default function MovieCard({
    poster_path,
    title,
    release_date,
    vote_average,
    variant = "default",
}: MovieCardProps) {
    const posterUrl = getPosterUrl(poster_path);

    if (variant === "search") {
        return (
            <div className="flex gap-3 p-3">
                <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded bg-neutral-800">
                    {posterUrl ? (
                        <Image
                            src={posterUrl}
                            alt={title}
                            fill
                            className="object-cover"
                            sizes="40px"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-[8px] text-neutral-600">
                            No poster
                        </div>
                    )}
                </div>

                <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                        {title}
                    </p>
                    <p className="mt-1 text-xs text-neutral-400">
                        {getReleaseYear(release_date)}
                    </p>
                    <p className="flex items-center gap-1 mt-1 text-xs text-neutral-400">
                        <RatingIcon size={16} /> {vote_average.toFixed(1)}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="group cursor-pointer">
            <div className="relative aspect-2/3 overflow-hidden rounded-lg bg-neutral-800 transition-transform group-hover:scale-[1.03]">
                {posterUrl ? (
                    <Image
                        src={posterUrl}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 200px"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-neutral-600">
                        No poster
                    </div>
                )}

                <span className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-black/70 px-2 py-0.5 text-xs font-semibold text-amber-400 backdrop-blur-sm">
                    <RatingIcon size={16} /> {vote_average.toFixed(1)}
                </span>
            </div>

            <p className="mt-2 truncate text-sm font-medium">
                {title}
            </p>

            <p className="text-xs text-neutral-400">
                {getReleaseYear(release_date)}
            </p>
        </div>
    );
}