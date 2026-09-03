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
            className="flex h-10 items-center gap-2 rounded-3xl px-4 text-muted cursor-pointer transition-colors hover:bg-surface-hover hover:text-foreground"
        >
            <Search size={18} />
            <span>Search</span>
        </button>
    );
}