'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Associate } from '@/lib/schemas/associate';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import Link from 'next/link';

// Fix for default marker icon in Leaflet with Next.js
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface AssociatesMapProps {
    companies: Associate[];
    center?: [number, number];
    zoom?: number;
    className?: string;
}

export default function AssociatesMap({ companies, center = [-17.3938, -66.1571], zoom = 14, className }: AssociatesMapProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div className={`w-full h-full bg-muted/20 flex items-center justify-center animate-pulse ${className}`}>
                <p className="text-muted-foreground">Cargando mapa...</p>
            </div>
        );
    }

    const validCompanies = companies.filter(c => c.latitude && c.longitude);
    const hasLocations = validCompanies.length > 0;

    // Determine center: if only one company (detail page), use its location
    const mapCenter = (companies.length === 1 && validCompanies[0])
        ? [parseFloat(validCompanies[0].latitude!), parseFloat(validCompanies[0].longitude!)] as [number, number]
        : center;

    return (
        <MapContainer
            center={mapCenter}
            zoom={hasLocations && companies.length === 1 ? 16 : zoom}
            scrollWheelZoom={false}
            className={`w-full h-full z-0 ${className}`}
            style={{ minHeight: '400px', width: '100%', borderRadius: 'inherit' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {validCompanies.map((company) => (
                <Marker
                    key={company.id}
                    position={[parseFloat(company.latitude!), parseFloat(company.longitude!)]}
                >
                    <Popup>
                        <div className="p-2 min-w-[200px]">
                            <h3 className="font-bold text-sm mb-1">{company.name}</h3>
                            <p className="text-xs text-muted-foreground mb-2">{company.address}</p>
                            <Link href={`/asociadas/${company.slug}`} className="text-xs text-primary hover:underline">
                                Ver perfil completo
                            </Link>
                            <div className="mt-2 pt-2 border-t flex justify-end">
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${company.latitude},${company.longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] bg-primary text-primary-foreground px-2 py-1 rounded hover:bg-primary/90"
                                >
                                    Cómo llegar
                                </a>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
