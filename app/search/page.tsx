import SearchMovieList from "@/components/search/SearchMovieList";

interface SearchPageProps {
    searchParams: Promise<{
        query?: string;
        page?: string;
    }>;
}

export default async function SearchPage({
    searchParams,
}: SearchPageProps) {
    const params = await searchParams;

    const query = params.query?.trim() ?? "";
    const page = Number(params.page) || 1;

    return <SearchMovieList query={query} page={page} />;
}