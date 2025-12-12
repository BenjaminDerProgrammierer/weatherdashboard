'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Minus, Plus, Search, Undo2 } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

import styles from './page.module.css';
import { Location } from '@/lib/weather';
import { addLocalStorageLocation, getLocalStorageLocations, removeLocalStorageLocation } from '@/lib/localStorage';
import Link from 'next/link';

export default function AddLocationPage() {
    const [query, setQuery] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSending, setIsSending] = useState(false);
    const [locations, setLocations] = useState<Location[]>(getLocalStorageLocations());
    const [localStorageLocations, setLocalStorageLocations] = useState<Location[]>(getLocalStorageLocations());

    const inputRef = useRef<HTMLInputElement>(null);

    // Focus the input element when the component mounts
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    function searchLocations(e: ChangeEvent<HTMLInputElement>) {
        const newQuery = e.target.value;
        setQuery(newQuery);

        if (!newQuery.trim()) {
            setError(null);
            setLocations([]);
            return;
        }

        if (newQuery.trim().length < 3) {
            setError("Please enter at least 3 characters.");
            setLocations([]);
            return;
        }

        if (isSending) return;

        setIsSending(true);

        fetch(`/api/location?name=${encodeURIComponent(newQuery.trim())}`)
            .then((async response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status} ${response.statusText} (${await response.text()})`);
                }
                return response.json();
            }))
            .then((data) => {
                if (data.success) {
                    if (data.locations.length === 0) {
                        setError("No locations found.");
                        setLocations([]);
                    } else {
                        setError(null);
                        setLocations(data.locations);
                    }
                } else {
                    setError(`Failed to fetch locations: ${data.error}`);
                }
            }).catch((error) => {
                setError("An error occurred.");
                setLocations([]);
                console.error(error.message);
            }).finally(() => {
                setIsSending(false);
            });
    }

    function addLocation(location: Location) {
        addLocalStorageLocation(location);
        setLocalStorageLocations(getLocalStorageLocations());
    }

    function removeLocation(location: Location) {
        removeLocalStorageLocation(location);
        setLocalStorageLocations(getLocalStorageLocations());
    }

    return (
        <>
            <Toaster></Toaster>
            <header className="page-header">
                <h2>Add Location</h2>
                <Link href="/"><Undo2 /></Link>
            </header>
            <div className={styles.inputContainer}>
                <Search
                    size={24}
                />
                <input ref={inputRef} className={styles.locationInput} type="text" onChange={searchLocations} value={query} />
            </div>
            {error && <p className={styles.errorText}>{error}</p>}
            {locations.length > 0 && (
                <div className={styles.locationsList}>
                    {locations.map((location) => (
                        <div className={styles.locationItem} key={location.placeId}>
                            <div>
                                <h3 className={styles.locationItemAddress}>{location.address}</h3>
                                <p className={styles.locationItemCoordinates}>{location.latitude}, {location.longitude}</p>
                            </div>
                            {localStorageLocations?.some(loc => loc.placeId === location.placeId) ? (
                                <button
                                    className={styles.addLocation}
                                    onClick={() => removeLocation(location)}
                                >
                                    <Minus
                                        size={32}
                                    />
                                </button>
                            ) : (
                                <button
                                    className={styles.addLocation}
                                    onClick={() => addLocation(location)}
                                >
                                    <Plus
                                        size={32}
                                    />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
