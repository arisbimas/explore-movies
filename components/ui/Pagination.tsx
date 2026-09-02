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
                className="rounded-md border border-border px-4 py-2 text-sm transition-colors cursor-pointer hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-40"
            >
                Previous
            </button>

            <span className="text-sm text-muted">
                Page {page} of {totalPages}
            </span>

            <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => onPageChange(page + 1)}
                className="rounded-md border border-border px-4 py-2 text-sm transition-colors cursor-pointer hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-40"
            >
                Next
            </button>
        </div>
    );
}