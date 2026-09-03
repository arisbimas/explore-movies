import { ArrowLeft } from 'lucide-react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';

export default function MovieBackdrop({ url }: { url: string | null }) {
    const router = useRouter();

    return (
        <div className="relative h-70 w-full overflow-hidden md:h-95">
            {url ? (
                <Image
                    src={url}
                    alt=""
                    fill
                    priority
                    className="object-cover"
                />
            ) : (
                <div className="h-full w-full bg-surface" />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-r from-background/80 via-transparent to-transparent" />

            <button
                type="button"
                onClick={() => router.back()}
                className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-background/60 px-4 py-2 text-sm text-foreground backdrop-blur-sm transition-colors hover:bg-background/80 cursor-pointer"
            >
                <ArrowLeft size={18} />
                Back
            </button>
        </div>
    )
}
