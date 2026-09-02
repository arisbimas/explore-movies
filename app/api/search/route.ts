import { NextRequest, NextResponse } from "next/server";

import { tmdbClient } from "@/lib/api/tmdbClient";

export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.get("query");
    const page = request.nextUrl.searchParams.get("page") ?? "1";

    if (!query?.trim()) {
        return NextResponse.json(
            { message: "Search query is required" },
            { status: 400 },
        );
    }

    try {
        const { data } = await tmdbClient.get("/search/movie", {
            params: {
                query: query.trim(),
                page,
            },
        });

        return NextResponse.json(data);
    } catch {
        return NextResponse.json(
            { message: "Failed to search movies" },
            { status: 500 },
        );
    }
}