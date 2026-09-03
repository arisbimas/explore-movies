interface ResultCountProps {
    count: number;
    label: string;
}

export default function ResultCount({
    count,
    label,
}: ResultCountProps) {
    return (
        <p className="mt-1 text-sm text-muted">
            <span className="font-medium  text-primary">
                {count}
            </span>{" "}
            {label}
        </p>
    );
}