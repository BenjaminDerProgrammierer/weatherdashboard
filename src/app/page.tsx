'use client';

import { useState } from "react";

import { Location } from "@/app/api/location/route";
import { getLocalStorageLocations } from "@/lib/locationStorage";

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
