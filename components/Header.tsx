import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-surface">
            <div className="w-full mx-auto max-w-360 py-4 px-4 sm:px-3 lg:px-8">
                <Link href="/" className="font-display text-xl font-bold text-primary">
                    Movie Explorer
                </Link>
            </div>
        </header>
    )
}
