export type Location = {
    address: string;
    adminDistrict: string | null;
    adminDistrictCode: string | null;
    city: string | null;
    country: string;
    countryCode: string;
    dmaCd: string | null;
    displayContext: string | null;
    ianaTimeZone: string | null;
    latitude: number | null;
    locale: [string | null, string | null, string | null, string | null];
    longitude: number | null;
    neighborhood: string | null;
    placeId: string;
    postalCode: string | null;
    postalKey: string | null;
    disputedArea: boolean;
    disputedCountries: string[] | null;
    disputedCountryCodes: string[] | null;
    disputedCustomers: string[] | null;
    disputedShowCountry: boolean[];
    iataCode: string | null;
    icaoCode: string | null;
    locId: string | null;
    locationCategory: string | null;
    pwsId: string | null;
    type: string | null;
};

export type Weather = {
    cloudCeiling: null,
    cloudCover: number,
    cloudCoverPhrase: string,
    dayOfWeek: string,
    dayOrNight: string,
    expirationTimeUtc: number,
    iconCode: number,
    iconCodeExtend: number,
    obsQualifierCode: null,
    obsQualifierSeverity: null,
    precip1Hour: number,
    precip6Hour: number,
    precip24Hour: number,
    pressureAltimeter: number,
    pressureChange: number,
    pressureMeanSeaLevel: number,
    pressureTendencyCode: number,
    pressureTendencyTrend: string,
    relativeHumidity: number,
    snow1Hour: number,
    snow6Hour: number,
    snow24Hour: number,
    sunriseTimeLocal: string,
    sunriseTimeUtc: number,
    sunsetTimeLocal: string,
    sunsetTimeUtc: number,
    temperature: number,
    temperatureChange24Hour: number,
    temperatureDewPoint: number,
    temperatureFeelsLike: number,
    temperatureHeatIndex: number,
    temperatureMax24Hour: number,
    temperatureMaxSince7Am: number,
    temperatureMin24Hour: number,
    temperatureWetBulbGlobe: number,
    temperatureWindChill: number,
    uvDescription: string,
    uvIndex: number,
    validTimeLocal: string,
    validTimeUtc: number,
    visibility: number,
    windDirection: number,
    windDirectionCardinal: string,
    windGust: number,
    windSpeed: number,
    wxPhraseLong: string,
    wxPhraseMedium: string,
    wxPhraseShort: string
}

const BASE_URL = "https://api.weather.com/v3";
const API_KEY = process.env.API_KEY;
const LANGUAGE = "en-US";
const UNITS = "m";

// https://developer.weather.com/utility-aggregation/docs/location-service-search-v-3-0
export async function getLocationByName(name: string): Promise<Location> {
    return fetch(`${BASE_URL}/location/search?apiKey=${API_KEY}&query=${encodeURIComponent(name)}&language=${LANGUAGE}&format=json&locationType=city`)
        .then(response => response.json())
        .then((data) => data.location);
}

// https://developer.weather.com/utility-aggregation/docs/location-service-point-v-3-0
export async function getLocationByCoordinates(latitude: number, longitude: number) {
    return fetch(`${BASE_URL}/location/point?geocode=${encodeURIComponent(latitude + "," + longitude)}&language=${LANGUAGE}&format=json&apiKey=${API_KEY}`)
        .then(response => response.json())
        .then(data => data.location)
}

// https://developer.weather.com/utility-aggregation/docs/location-service-point-v-3-0

export async function getLocationByPlaceId(placeId: string): Promise<Location> {
    return fetch(`${BASE_URL}/location/point?placeid=${encodeURIComponent(placeId)}&language=${LANGUAGE}&format=json&apiKey=${API_KEY}`)
        .then(response => response.json())
        .then(data => data.location);
}

// https://developer.weather.com/alertsandnotifications/docs/weather-alerts-headlines-v-3-0
export async function getAlertHeadlines(countryCode: string) {
    const url = `${BASE_URL}/alerts/headlines?countryCode=${encodeURIComponent(countryCode)}&language=${LANGUAGE}&format=json&apiKey=${API_KEY}`;

    return fetch(url)
        .then(async response => {
            // If 200, continue
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 204)
                return {}
            else {
                console.debug(`Failed to fetch alert headlines: ${response.status} ${response.statusText} ${JSON.stringify(await response.json())}`);
                return {
                    message: "Failed to fetch alert headlines",
                    status: `${response.status} ${response.statusText}`
                }
            }
        })
}

// https://developer.weather.com/forecastsandinsights/docs/currents-on-demand-v-3-0
export async function getCurrentObservations(placeId: string): Promise<Weather> {
    return fetch(`https://api.weather.com/v3/wx/observations/current?placeid=${encodeURIComponent(placeId)}&language=${LANGUAGE}&units=${UNITS}&format=json&apiKey=${API_KEY}`)
        .then(response => response.json())
}

// https://developer.weather.com/forecastsandinsights/docs/hourly-forecasts-v-3-0
export async function getHourlyWeatherForecast(placeId: string) {
    return fetch(`https://api.weather.com/v3/wx/forecast/hourly/1day?placeid=${encodeURIComponent(placeId)}&language=${LANGUAGE}&units=${UNITS}&format=json&apiKey=${API_KEY}`)
        .then(response => response.json())
}


// LOCKED with curent API key.
// https://api.weather.com/v2/fcstdaily7s?insightType=all&geocode=48.265%2C14.257&language=en-us&units=m&par=samsung_widget&format=json&apiKey=e1f10a1e78da46f5b10a1e78da96f525
// https://api.weather.com/v3/insights?insightType=all&geocode=48.265%2C14.257&language=en-us&units=m&par=samsung_widget&format=json&apiKey=e1f10a1e78da46f5b10a1e78da96f525
// https://api.weather.com/v3/links?insightType=all&geocode=48.265%2C14.257&language=en-us&units=m&par=samsung_widget&format=json&apiKey=e1f10a1e78da46f5b10a1e78da96f525
// https://api.weather.com/v3/links?insightType=all&placeid=5179e1e6bcdb563e9fb74874449402ef0d93448f967476e0d880f1966cbc4a90&language=en-us&units=m&par=samsung_widget&format=json&apiKey=e1f10a1e78da46f5b10a1e78da96f525
// https://api.weather.com/v3/insights?insightType=all&placeid=5179e1e6bcdb563e9fb74874449402ef0d93448f967476e0d880f1966cbc4a90&language=en-us&units=m&par=samsung_widget&format=json&apiKey=e1f10a1e78da46f5b10a1e78da96f525
// https://api.weather.com/v2/fcstdaily7s?insightType=all&placeid=5179e1e6bcdb563e9fb74874449402ef0d93448f967476e0d880f1966cbc4a90&language=en-us&units=m&par=samsung_widget&format=json&apiKey=e1f10a1e78da46f5b10a1e78da96f525
