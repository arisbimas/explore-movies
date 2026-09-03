import { NextRequest, NextResponse } from "next/server";
import { tmdbClient } from "@/lib/api/tmdbClient";

interface RouteContext {
    params: Promise<{
        id: string;
    }>;
}

export async function GET(
    request: NextRequest,
    { params }: RouteContext,
) {
    const { id } = await params;

    if (!id || Number.isNaN(Number(id))) {
        return NextResponse.json(
            { message: "Invalid movie ID" },
            { status: 400 },
        );
    }

    try {
        const { data } = await tmdbClient.get(`/movie/${id}`, {
            params: {
                append_to_response: "credits",
            },
        });

        return NextResponse.json(data);
    } catch {
        return NextResponse.json(
            { message: "Failed to fetch movie details" },
            { status: 500 },
        );
    }
}