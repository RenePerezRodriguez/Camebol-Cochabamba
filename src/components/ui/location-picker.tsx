"use client";

import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icon in Leaflet with webpack/next.js
const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

interface LocationPickerProps {
    latitude?: number;
    longitude?: number;
    onLocationChange: (lat: number, lng: number) => void;
}

function LocationMarker({
    position,
    onPositionChange,
}: {
    position: [number, number] | null;
    onPositionChange: (lat: number, lng: number) => void;
}) {
    useMapEvents({
        click(e) {
            onPositionChange(e.latlng.lat, e.latlng.lng);
        },
    });

    return position ? <Marker position={position} icon={icon} /> : null;
}

export function LocationPicker({
    latitude,
    longitude,
    onLocationChange,
}: LocationPickerProps) {
    // Default to Cochabamba, Bolivia
    const defaultLat = -17.3935;
    const defaultLng = -66.1570;

    const [position, setPosition] = useState<[number, number] | null>(
        latitude && longitude ? [latitude, longitude] : null
    );

    const handlePositionChange = (lat: number, lng: number) => {
        setPosition([lat, lng]);
        onLocationChange(lat, lng);
    };

    return (
        <div className="space-y-2">
            <div className="h-[300px] w-full rounded-md border overflow-hidden relative z-0">
                <MapContainer
                    center={position || [defaultLat, defaultLng]}
                    zoom={13}
                    scrollWheelZoom={false}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker
                        position={position}
                        onPositionChange={handlePositionChange}
                    />
                </MapContainer>
            </div>
            {position && (
                <p className="text-xs text-muted-foreground">
                    📍 Lat: {position[0].toFixed(6)}, Lng: {position[1].toFixed(6)}
                </p>
            )}
            <p className="text-xs text-muted-foreground">
                Haz clic en el mapa para seleccionar la ubicación del evento.
            </p>
        </div>
    );
}
