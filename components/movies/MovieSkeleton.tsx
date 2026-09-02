export default function MovieSkeleton() {
    return (
        <div className="overflow-hidden rounded-lg">
            <div className="aspect-2/3 animate-pulse rounded-lg bg-surface" />

            <div className="mt-3 space-y-2">
                <div className="h-4 w-3/4 animate-pulse rounded bg-surface" />
                <div className="h-3 w-1/3 animate-pulse rounded bg-surface" />
            </div>
        </div>
    );
}