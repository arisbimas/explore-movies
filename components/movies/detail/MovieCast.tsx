import { getPosterUrl } from "@/lib/utils";
import { MovieCast as MovieCastProps } from "@/types/movie";
import Image from "next/image";

export default function MovieCast({ cast }: { cast: MovieCastProps[] }) {
    return (
        <section className="mt-12 pb-12">
            <h2 className="text-lg font-semibold">Main Cast</h2>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {cast.map((person) => {
                    const profileUrl = getPosterUrl(person.profile_path);
                    return (
                        <div key={person.id}>
                            <div className="relative aspect-2/3 overflow-hidden rounded-lg bg-surface">
                                {profileUrl ? (
                                    <Image
                                        src={profileUrl}
                                        alt={person.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-xs text-muted">
                                        No photo
                                    </div>
                                )}
                            </div>
                            <p className="mt-2 truncate text-sm font-medium">
                                {person.name}
                            </p>
                            <p className="truncate text-xs text-muted">
                                {person.character}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    )
}
