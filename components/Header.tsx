"use client";

import SearchButton from "@/components/search/SearchButton";
import SearchModal from "@/components/search/SearchModal";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <>
            <header className="bg-surface">
                <div className="w-full flex items-center justify-between py-4 px-4 sm:px-3 lg:px-8">
                    <Link href="/" className="font-display text-xl font-bold text-primary">
                        Movie Explorer
                    </Link>
                    <SearchButton onClick={() => setIsSearchOpen(true)} />
                </div>
            </header>

            <SearchModal
                open={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />

        </>
    )
}
