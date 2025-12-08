import { toast } from "react-hot-toast";

import { Location } from "@/lib/weather";

export function getLocalStorageLocations(): Location[] {
    if (globalThis.window === undefined) {
        return [];
    }
    return JSON.parse(localStorage.getItem("locations") || "[]");
}

function setLocalStorageLocations(locations: Location[]) {
    if (globalThis.window === undefined) {
        return;
    }
    localStorage.setItem("locations", JSON.stringify(locations));
}

export function addLocalStorageLocation(location: Location) {
    if (globalThis.window === undefined) {
        return;
    }
    const locations = getLocalStorageLocations();
    locations.push(location);
    setLocalStorageLocations(locations);

    toast.success("Location added successfully", {
        style: {
            background: "var(--toast-background)",
            color: "var(--foreground)"
        }
    });
}

export function removeLocalStorageLocation(location: Location) {
    if (globalThis.window === undefined) {
        return;
    }
    const locations = getLocalStorageLocations();
    const newLocations = locations.filter((loc) => loc.placeId !== location.placeId);
    setLocalStorageLocations(newLocations);

    toast.success("Location removed successfully", {
        style: {
            background: "var(--toast-background)",
            color: "var(--foreground)"
        }
    });
}