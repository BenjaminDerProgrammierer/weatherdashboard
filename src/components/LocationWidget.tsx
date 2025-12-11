'use client';
import { Droplet, Droplets, Eye, MoveUp, Sun, Sunrise, Sunset, Thermometer, Wind, WindArrowDown } from "lucide-react";

import { Weather } from "@/lib/weather";
import styles from './LocationWidget.module.css'

interface LocationWidgetProps {
    weather?: Weather;
    city: string;
    address: string;
}

export default function LocationWidget({ weather, city, address }: Readonly<LocationWidgetProps>) {
    return (
        <div className={styles.locationWidget}>
            <h3>{city}</h3>
            <p>{address}</p>
            <p><Thermometer /> {weather?.temperature}° (feels like {weather?.temperatureFeelsLike}°)</p>
            <p><Sunrise /> {weather && new Date(weather.sunriseTimeLocal).toLocaleTimeString('de-AT')}</p>
            <p><Sunset /> {weather && new Date(weather.sunsetTimeLocal).toLocaleTimeString('de-AT')}</p>
            <p><Thermometer /> Max/Min {weather?.temperatureMax24Hour}° / {weather?.temperatureMin24Hour}°</p>
            <p><Wind /> <span>Wind: <MoveUp style={{ transform: `rotate(${weather?.windDirection}deg)` }} /> {weather?.windSpeed} km/h</span></p>
            <p><Droplet />Humidity: {weather?.relativeHumidity}%</p>
            <p><Droplets /> Dew Point: {weather?.temperatureDewPoint}°</p>
            <p><WindArrowDown /> Pressure: {weather?.pressureAltimeter} mb</p>
            <p><Sun /> UV Index: {weather?.uvIndex}/11</p>
            <p><Eye />Visibility: {weather?.visibility} km</p>

            <pre>{JSON.stringify(weather, null, 2)}</pre>
        </div>
    )
}
