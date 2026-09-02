import { Movie } from "@/types/movie";
import { getPosterUrl, getReleaseYear } from "@/lib/utils";
import Image from "next/image";

export default function MovieCard(props: Movie) {
    const { poster_path, title, release_date, vote_average } = props;
    const posterUrl = getPosterUrl(poster_path);

    return (
        <div className="cursor-pointer group">
            <div className="relative aspect-2/3 rounded-lg overflow-hidden bg-neutral-800 transition-transform group-hover:scale-[1.03]">
                {posterUrl ? (
                    <Image
                        src={posterUrl}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 200px"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-neutral-600 text-sm">
                        No poster
                    </div>
                )}
                <span className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-amber-400 text-xs font-semibold px-2 py-0.5 rounded-md">
                    ⭐ {vote_average.toFixed(1)}
                </span>
            </div>
            <p className="mt-2 text-sm font-medium truncate">{title}</p>
            <p className="text-xs text-neutral-400">{getReleaseYear(release_date)}</p>
        </div>
    )
}
