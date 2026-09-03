const IMAGE_BASE = "https://image.tmdb.org/t/p";

type PosterSize = "w200" | "w342" | "w500";
type BackdropSize = "w780" | "w1280" | "original";

function buildImageUrl(path: string | null, size: string): string | null {
    if (!path) return null;
    return `${IMAGE_BASE}/${size}${path}`;
}

export function getPosterUrl(path: string | null, size: PosterSize = "w342"): string | null {
    return buildImageUrl(path, size);
}

export function getBackdropUrl(path: string | null, size: BackdropSize = "w1280"): string | null {
    return buildImageUrl(path, size);
}
export function getReleaseYear(releaseDate: string): string {
    if (!releaseDate) return "—";
    return releaseDate.split("-")[0];
}