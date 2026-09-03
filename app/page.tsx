import MovieList from "@/components/movies/MovieList";

interface HomePageProps {
  searchParams: Promise<{
    category?: string;
    page?: string;
  }>;
}

export default async function Home({
  searchParams,
}: HomePageProps) {
  const params = await searchParams;

  const category = params.category?.trim() ?? "";
  const page = Number(params.page) || 1;

  return <MovieList category={category} page={page} />;
}
