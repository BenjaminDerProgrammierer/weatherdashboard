const BASE_URL = "https://api.weather.com/v3";
const API_KEY = process.env.API_KEY;
const LANGUAGE = "en-US";
const UNITS = "m";

// https://developer.weather.com/utility-aggregation/docs/location-service-point-v-3-0
export async function getLocationByName(name: string) {
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
export async function getCurrentObservations(placeId: string) {
    return fetch(`https://api.weather.com/v3/wx/observations/current?placeid=${encodeURIComponent(placeId)}&language=${LANGUAGE}&units=${UNITS}&format=json&apiKey=${API_KEY}`)
        .then(response => response.json())
        .then(data => data.location)
}

// https://developer.weather.com/forecastsandinsights/docs/hourly-forecasts-v-3-0
export async function getHourlyWeatherForecast(placeId: string) {
    return fetch(`https://api.weather.com/v3/wx/forecast/hourly/1day?placeid=${encodeURIComponent(placeId)}&language=${LANGUAGE}&units=${UNITS}&format=json&apiKey=${API_KEY}`)
        .then(response => response.json())
        .then(data => data.location)
}


// LOCKED
// https://api.weather.com/v2/fcstdaily7s?insightType=all&geocode=48.265%2C14.257&language=en-us&units=m&par=samsung_widget&format=json&apiKey=e1f10a1e78da46f5b10a1e78da96f525
// https://api.weather.com/v3/insights?insightType=all&geocode=48.265%2C14.257&language=en-us&units=m&par=samsung_widget&format=json&apiKey=e1f10a1e78da46f5b10a1e78da96f525
// https://api.weather.com/v3/links?insightType=all&geocode=48.265%2C14.257&language=en-us&units=m&par=samsung_widget&format=json&apiKey=e1f10a1e78da46f5b10a1e78da96f525

// Location search
// https://api.weather.com/v3/location/search?locationType=city,locality,neighborhood,postal&query=Linz&language=en-us&format=json&apiKey=e1f10a1e78da46f5b10a1e78da96f525

// Placeid-based
// https://api.weather.com/v3/location/point?insightType=all&placeid=5179e1e6bcdb563e9fb74874449402ef0d93448f967476e0d880f1966cbc4a90&language=en-us&units=m&par=samsung_widget&format=json&apiKey=e1f10a1e78da46f5b10a1e78da96f525
// https://api.weather.com/v3/alerts/headlines?insightType=all&placeid=5179e1e6bcdb563e9fb74874449402ef0d93448f967476e0d880f1966cbc4a90&language=en-us&units=m&par=samsung_widget&format=json&apiKey=e1f10a1e78da46f5b10a1e78da96f525
// https://api.weather.com/v3/wx/observations/current?insightType=all&placeid=5179e1e6bcdb563e9fb74874449402ef0d93448f967476e0d880f1966cbc4a90&language=en-us&units=m&par=samsung_widget&format=json&apiKey=e1f10a1e78da46f5b10a1e78da96f525
// https://api.weather.com/v2/fcstdaily7s?insightType=all&placeid=5179e1e6bcdb563e9fb74874449402ef0d93448f967476e0d880f1966cbc4a90&language=en-us&units=m&par=samsung_widget&format=json&apiKey=e1f10a1e78da46f5b10a1e78da96f525
// https://api.weather.com/v3/wx/forecast/hourly/1day?insightType=all&placeid=5179e1e6bcdb563e9fb74874449402ef0d93448f967476e0d880f1966cbc4a90&language=en-us&units=m&par=samsung_widget&format=json&apiKey=e1f10a1e78da46f5b10a1e78da96f525
// https://api.weather.com/v3/insights?insightType=all&placeid=5179e1e6bcdb563e9fb74874449402ef0d93448f967476e0d880f1966cbc4a90&language=en-us&units=m&par=samsung_widget&format=json&apiKey=e1f10a1e78da46f5b10a1e78da96f525
// https://api.weather.com/v3/links?insightType=all&placeid=5179e1e6bcdb563e9fb74874449402ef0d93448f967476e0d880f1966cbc4a90&language=en-us&units=m&par=samsung_widget&format=json&apiKey=e1f10a1e78da46f5b10a1e78da96f525

/*
export async function getQueryOne(locationId: string = "48.099%2C14.446") {
    const url = `https://api.weather.com/v2/aggcommon/v3-location-point;v3-wx-observations-current;v2fcstdaily7s;v3-links?geocode=${locationId}&language=en-us&units=m&format=json&apiKey=${API_KEY}`;

    return fetch(url)
        .then(response => response.json())
        .then((data) => {
            return data;
        });
}

export async function getV2FcstDaily7s(lat: number, lon: number, units: 'm' | 'e' = 'm'): Promise<any> {
    //     const geocode = encodeURIComponent(`${lat},${lon}`);
    //     const url = `https://api.weather.com/v2/fcstdaily7s?geocode=${geocode}&language=${LANGUAGE}&units=${units}&format=json&apiKey=${API_KEY}`;

    //     return fetch(url).then(response => response.json());
    return Promise<0>;
}

export async function getV3Links(lat: number, lon: number): Promise<any> {
    const geocode = encodeURIComponent(`${lat},${lon}`);
    const url = `${BASE_URL}/links?geocode=${geocode}&language=${LANGUAGE}&format=json&apiKey=${API_KEY}`;

    return fetch(url).then(response => response.json()).catch(() => null);
}
*/