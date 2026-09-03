interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    page,
    totalPages,
    onPageChange,
}: PaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <div className="my-8 flex items-center justify-center gap-4">
            <button
                type="button"
                disabled={page <= 1}
                onClick={() => onPageChange(page - 1)}
                className="rounded-md border border-primary bg-primary px-2.5 py-1.5 text-sm font-medium text-background transition-colors hover:bg-primary/90 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
            >
                Prev
            </button>

            <span className="text-sm text-muted">
                Page{" "}
                <span className="font-medium text-primary">{page}</span>{" "}
                of <span>{totalPages}</span>
            </span>

            <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => onPageChange(page + 1)}
                className="rounded-md border border-primary bg-primary px-2.5 py-1.5 text-sm font-medium text-background transition-colors hover:bg-primary/90 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
            >
                Next
            </button>
        </div>
    );
}