'use client';
import { useState } from "react";

import { getLocalStorageLocations } from "@/lib/locationStorage";
import { Location } from "@/lib/weather";

export default function Home() {
  // Load locations from local storage
  const [locations] = useState<Location[]>(getLocalStorageLocations());

  return (
    <>
      {locations.map((location) => (
        <div key={location.placeId}>{location.address}</div>
      ))}
    </>
  );
}
