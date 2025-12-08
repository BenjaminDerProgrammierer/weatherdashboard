import { getLocationByCoordinates, getLocationByName, Location } from '@/lib/weather';
import { NextResponse } from 'next/server';

export async function GET(request: Request): Promise<NextResponse<{success: boolean, locations?: Location[], error?: string}>> {
    const { searchParams } = new URL(request.url);

    if (!searchParams.get("geocode") && !searchParams.get("name")) {
        return NextResponse.json({ success: false, error: "Missing required parameters" }, { status: 400 });
    }

    let location;

    try {
        const geocode = searchParams.get("geocode")?.split(",").map(Number);

        if (geocode?.[0] && geocode?.[1]) {
            location = await getLocationByCoordinates(geocode[0], geocode[1]);
        }
        if (!location) {
            return NextResponse.json({ success: false, error: "Location not found" }, { status: 404 });
        }
    } catch {
        // Do not handle
    }

    try {
        const name = searchParams.get("name");
        if (name) {
            location = await getLocationByName(name);
        }
        if (!location) {
            return NextResponse.json({ success: false, error: "Location not found" }, { status: 404 });
        }
    } catch {
        // Do not handle
    }

    const locations: Location[] = [];

    for (let i = 0; i < location?.['address'].length; i++) {
        locations.push({
            address: location['address'][i],
            adminDistrict: location['adminDistrict'][i],
            adminDistrictCode: location['adminDistrictCode'][i],
            city: location['city'][i],
            country: location['country'][i],
            countryCode: location['countryCode'][i],
            dmaCd: location['dmaCd'][i],
            displayContext: location['displayContext'][i],
            ianaTimeZone: location['ianaTimeZone'][i],
            latitude: location['latitude'][i],
            locale: [location['locale'][i].locale1, location['locale'][i].locale2, location['locale'][i].locale3, location['locale'][i].locale4],
            longitude: location['longitude'][i],
            neighborhood: location['neighborhood'][i],
            placeId: location['placeId'][i],
            postalCode: location['postalCode'][i],
            postalKey: location['postalKey'][i],
            disputedArea: location['disputedArea'][i],
            disputedCountries: location['disputedCountries'][i],
            disputedCountryCodes: location['disputedCountryCodes'][i],
            disputedCustomers: location['disputedCustomers'][i],
            disputedShowCountry: location['disputedShowCountry'][i],
            iataCode: location['iataCode'][i],
            icaoCode: location['icaoCode'][i],
            locId: location['locId'][i],
            locationCategory: location['locationCategory'][i],
            pwsId: location['pwsId'][i],
            type: location['type'][i]
        })
    }

    return NextResponse.json({
        success: true,
        locations: locations
    });
}
