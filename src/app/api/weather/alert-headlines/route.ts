import { getAlertHeadlines } from '@/lib/weather';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const countryCode = searchParams.get("countryCode");

    if (!countryCode) {
        return NextResponse.json({
            success: false,
            error: "Missing countryCode parameter"
        });
    }

    return NextResponse.json({
        success: true,
        headlines: await getAlertHeadlines(countryCode)
    });
}
