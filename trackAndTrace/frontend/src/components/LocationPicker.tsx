import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { MapPinned } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents, Popup } from 'react-leaflet';
import { Tooltip } from '@/components/Tooltip';
import { useEffect, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';

interface NominatimResult {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    lat: string;
    lon: string;
    class: string;
    type: string;
    place_rank: number;
    importance: number;
    addresstype?: string;
    name?: string;
    display_name: string;
    address?: {
        state?: string;
        'ISO3166-2-lvl4'?: string;
        country?: string;
        country_code?: string;
    };
    boundingbox: [string, string, string, string];
}

/**
 * Performs a search using the Nominatim API.
 *
 * @param query The search term (parameter `q`).
 * @param limit The maximum number of results to retrieve.
 * @returns A promise that resolves with the results in JSON format.
 */
async function searchNominatim(query: string, limit = 5): Promise<NominatimResult[]> {
    const baseUrl = 'https://nominatim.openstreetmap.org/search';
    const params = new URLSearchParams({
        addressdetails: '1',
        q: query,
        format: 'json',
        limit: limit.toString(),
    });

    const url = `${baseUrl}?${params.toString()}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Request error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error while performing the search:', error);
        throw error;
    }
}

interface SuggestedLocation {
    name?: string;
    coordinates: {
        latitude: string;
        longitude: string;
    };
}

function SetViewOnSelectResult({ location }: { location: SuggestedLocation }) {
    const map = useMap();
    useEffect(() => {
        map.setView([Number(location.coordinates.latitude), Number(location.coordinates.longitude)]);
    }, [map, location]);

    return null;
}

function LocationMarker({
    location,
    setLocation,
}: {
    location: SuggestedLocation;
    setLocation: (location: SuggestedLocation) => void;
}) {
    const map = useMapEvents({
        click(e) {
            map.locate();
            setLocation({ coordinates: { latitude: e.latlng.lat.toString(), longitude: e.latlng.lng.toString() } });
        },
    });

    return (
        <Marker position={[Number(location.coordinates.latitude), Number(location.coordinates.longitude)]}>
            <Popup>
                {location.name ? location.name : `${location.coordinates.latitude},${location.coordinates.longitude}`}
            </Popup>
        </Marker>
    );
}

interface Props {
    onSaveLocation: (location: string) => void;
}
export function LocationPicker({ onSaveLocation }: Props) {
    const [suggestedLocations, setSuggestedLocations] = useState<SuggestedLocation[]>([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    const [selectedLocation, setSelectedLocation] = useState<SuggestedLocation>({
        name: 'London',
        coordinates: { latitude: '51.505', longitude: '-0.09' },
    });

    function handleChange(v: string) {
        setSearchTerm(v);
    }
    function handleSelectLocation(location: SuggestedLocation) {
        setSuggestedLocations([]);
        setHasSearched(false);
        setSelectedLocation(location);
    }

    function handleSaveLocation() {
        onSaveLocation(`${selectedLocation.coordinates.latitude},${selectedLocation.coordinates.longitude}`);
        setHasSearched(false);
        setSearchTerm('');
    }

    useEffect(() => {
        const searchSuggestedLocations = async () => {
            setHasSearched(true);
            if (debouncedSearchTerm) {
                const results = await searchNominatim(debouncedSearchTerm);
                setSuggestedLocations(
                    results.map((result) => ({
                        name: result.display_name,
                        coordinates: { latitude: result.lat, longitude: result.lon },
                    })),
                );
            }
        };
        searchSuggestedLocations();
    }, [debouncedSearchTerm]);

    return (
        <Dialog>
            <Tooltip content="Pick a location from map">
                <DialogTrigger asChild>
                    <Button type="button">
                        <MapPinned />
                    </Button>
                </DialogTrigger>
            </Tooltip>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Pick a location</DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                    <Command
                        className="rounded-lg border shadow-md max-h-fit relative overflow-visible"
                        shouldFilter={false}
                    >
                        <CommandInput
                            placeholder="Type a command or search..."
                            value={searchTerm}
                            onValueChange={handleChange}
                        />
                        <CommandList className="rounded-lg border absolute top-10 z-[2000] bg-white w-full">
                            {hasSearched && suggestedLocations.length > 0 && (
                                <CommandEmpty>No results found.</CommandEmpty>
                            )}
                            <CommandGroup>
                                {suggestedLocations.map((suggestedLocation, i) => (
                                    <CommandItem key={i}>
                                        <Button variant="ghost" onClick={() => handleSelectLocation(suggestedLocation)}>
                                            {suggestedLocation.name}
                                        </Button>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                    <MapContainer
                        center={[
                            Number(selectedLocation.coordinates.latitude),
                            Number(selectedLocation.coordinates.longitude),
                        ]}
                        zoom={8}
                        scrollWheelZoom={true}
                        className="h-[460px]"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker location={selectedLocation} setLocation={setSelectedLocation} />
                        <SetViewOnSelectResult location={selectedLocation} />
                    </MapContainer>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" onClick={handleSaveLocation}>
                            Done
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
