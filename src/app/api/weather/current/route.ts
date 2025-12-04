import { getCurrentObservations } from '@/lib/weather';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const locationId = searchParams.get("locationId");

    if (!locationId) {
        return NextResponse.json({
            success: false,
            error: "Missing locationId parameter"
        });
    }

    return NextResponse.json({
        success: true,
        headlines: await getCurrentObservations(locationId)
    });
}
