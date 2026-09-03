import { NextRequest, NextResponse } from "next/server";
import { tmdbClient } from "@/lib/api/tmdbClient";
import type { MovieCategory } from "@/types/movie";

const CATEGORY_ENDPOINTS: Record<MovieCategory, string> = {
    now_playing: "/movie/now_playing",
    popular: "/movie/popular",
    top_rated: "/movie/top_rated",
    upcoming: "/movie/upcoming",
};

export async function GET(request: NextRequest) {
    const category = request.nextUrl.searchParams.get("category");
    const page = request.nextUrl.searchParams.get("page") ?? "1";

    if (!category || !(category in CATEGORY_ENDPOINTS)) {
        return NextResponse.json(
            { message: "Invalid category" },
            { status: 400 },
        );
    }

    const endpoint = CATEGORY_ENDPOINTS[category as MovieCategory];

    try {
        const { data } = await tmdbClient.get(endpoint, { params: { page } });
        return NextResponse.json(data);
    } catch (error) {
        console.error("[GET /api/movies]", error);
        return NextResponse.json(
            { message: "Failed to fetch movies" },
            { status: 500 },
        );
    }
}