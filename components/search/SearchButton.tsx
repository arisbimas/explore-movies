"use client";

import { Search } from "lucide-react";

interface SearchButtonProps {
    onClick: () => void;
}

export default function SearchButton({
    onClick,
}: SearchButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label="Search movies"
            className="flex h-10 w-10 items-center justify-center rounded-3xl text-muted cursor-pointer transition-colors hover:bg-surface-hover hover:text-foreground"
        >
            <Search size={20} />
        </button>
    );
}