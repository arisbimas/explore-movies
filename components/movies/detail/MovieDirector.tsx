import { getPosterUrl } from '@/lib/utils'
import { MovieCrew } from '@/types/movie'
import Image from 'next/image'

export default function MovieDirector({ director }: { director: MovieCrew | undefined }) {
    return (
        <section className="mt-6">
            <h2 className="text-lg font-semibold">Director</h2>
            {director ? (
                <div className="mt-3 flex items-center gap-4">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-surface-hover">
                        {director.profile_path ? (
                            <Image
                                src={getPosterUrl(director.profile_path) ?? ""}
                                alt={director.name}
                                fill
                                className="object-cover"
                                sizes="96px"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center text-xs text-muted">
                                N/A
                            </div>
                        )}
                    </div>
                    <p className="text-sm font-medium">{director.name}</p>
                </div>
            ) : (
                <p className="mt-3 text-sm text-muted">
                    Director information not available.
                </p>
            )}
        </section>
    )
}
