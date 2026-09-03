import { Search } from 'lucide-react'

interface Props {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string
}

export default function InputSearch({
    onChange,
    value
}: Props) {
    return (
        <div className="relative w-full">
            <Search
                size={18}
                className="text-muted absolute left-4 top-1/2 -translate-y-1/2"
            />

            <input
                type="search"
                placeholder="Search movies by title..."
                className="h-12 w-full rounded-3xl border border-border bg-surface pl-12 pr-4 text-sm text-foreground outline-none placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary"
                onChange={onChange}
                value={value}
            />
        </div>
    )
}
