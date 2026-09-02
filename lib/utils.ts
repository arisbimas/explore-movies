const IMAGE_BASE = "https://image.tmdb.org/t/p";

export function getPosterUrl(
    path: string | null,
    size: "w200" | "w342" | "w500" = "w342"
): string | null {
    if (!path) return null;
    return `${IMAGE_BASE}/${size}${path}`;
}

export function getReleaseYear(releaseDate: string): string {
    if (!releaseDate) return "—";
    return releaseDate.split("-")[0];
}