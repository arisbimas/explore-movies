"use client";

interface SegmentedControlProps {
    options: readonly string[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export default function SegmentedControl(props: SegmentedControlProps) {
    const { className, options, onChange, value } = props;

    return (
        <div className={`inline-flex items-center gap-1 p-1.5 rounded-4xl bg-surface border border-neutral-800 max-w-full overflow-x-auto ${className}`}>
            {options.map((option) => {
                const isActive = value === option;
                return (
                    <button
                        key={option}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => onChange(option)}
                        className={`cursor-pointer px-1.5 lg:px-3.5 py-1.5 text-sm font-medium rounded-3xl whitespace-nowrap transition-colors duration-150 ${isActive ? "bg-primary text-background" : "text-muted hover:text-foreground hover:bg-surface-hover"}`}
                    >
                        {option}
                    </button>
                );
            })}
        </div>
    );
}