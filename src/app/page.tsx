'use client';
import { useState, useEffect } from "react";

import { getLocalStorageLocations } from "@/lib/locationStorage";
import { Location, Weather } from "@/lib/weather";
import LocationWidget from "@/components/LocationWidget";

export default function Home() {
  // Load locations from local storage
  const [locations] = useState<Location[]>(getLocalStorageLocations());
  const [weatherData, setWeatherData] = useState<Record<string, Weather>>({});

  useEffect(() => {
    // Fetch weather for each location on mount
    (async () => {
      const weatherMap: Record<string, (Weather)> = {};

      for (const location of locations) {
        try {
          const result = await fetch(`/api/weather/current?locationId=${location.placeId}`)
            .then(response => response.json())
            .then((result) => {
              if (result.success) {
                return result.data as Weather;
              }
            })

          if (result) {
            weatherMap[location.placeId] = result;
          }
        } catch (error) {
          console.error(`Failed to fetch weather for ${location.address}:`, error);
        }
      }

      setWeatherData(weatherMap);
    })();
  }, [locations]);

  return (
    <>
      {locations.map((location) => (
        <LocationWidget
          key={location.placeId}
          weather={weatherData[location.placeId]}
          city={location.city || ''}
          address={location.address}
        />
      ))}
    </>
  );
}
