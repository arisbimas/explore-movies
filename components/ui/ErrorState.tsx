interface ErrorStateProps {
    title?: string;
    description?: string;
    onRetry?: () => void;
}

export default function ErrorState({
    title = "Something went wrong",
    description = "We couldn't load the data. Please try again.",
    onRetry,
}: ErrorStateProps) {
    return (
        <div className="flex min-h-60 flex-col items-center justify-center rounded-lg border border-border bg-surface px-6 text-center">
            <h2 className="text-lg font-semibold text-foreground">
                {title}
            </h2>

            <p className="mt-2 max-w-md text-sm text-muted">
                {description}
            </p>

            {onRetry && (
                <button
                    type="button"
                    onClick={onRetry}
                    className="mt-5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-black cursor-pointer transition-colors hover:bg-primary-hover"
                >
                    Try again
                </button>
            )}
        </div>
    );
}