
'use client';

import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { Associate } from '@/lib/schemas/associate';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface CompaniesMapProps {
    companies: Associate[];
}

// Simple hashing function to create coordinates based on company name
const getCoords = (name: string): [number, number] => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const lon = -66.15 + (hash % 1000) / 5000; // Spread around Cochabamba longitude
    const lat = -17.38 + ((hash >> 10) % 1000) / 5000; // Spread around Cochabamba latitude
    return [lon, lat];
}

export function CompaniesMap({ companies }: CompaniesMapProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsClient(true);
    }, []);

    return (
        <div style={{ width: '100%', height: '500px' }}>
            {!isClient ? <div className="flex items-center justify-center h-full"><p>Cargando mapa...</p></div> : (
                <ComposableMap
                    projection="geoMercator"
                    projectionConfig={{
                        rotate: [65, 17, 0],
                        scale: 6000
                    }}
                    width={800}
                    height={500}
                    style={{ width: "100%", height: "auto" }}
                >
                    <ZoomableGroup center={[-65, -17]} zoom={1}>
                        <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                                geographies
                                    .filter(d => d.properties.NAME === "Bolivia")
                                    .map(geo => (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill="#EAEAEC"
                                            stroke="#D6D6DA"
                                        />
                                    ))
                            }
                        </Geographies>
                        {companies.map(company => {
                            const coords = getCoords(company.name);
                            return (
                                <TooltipProvider key={company.slug}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Marker
                                                coordinates={coords}
                                                onClick={() => {
                                                    const query = encodeURIComponent(`${company.name} ${company.address || ''} Cochabamba`);
                                                    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
                                                }}
                                                className="cursor-pointer group"
                                            >
                                                <circle r={6} fill="hsl(var(--primary))" stroke="#fff" strokeWidth={2} className="transition-transform group-hover:scale-125 duration-300" />
                                                <circle r={12} fill="hsl(var(--primary))" className="opacity-0 group-hover:opacity-20 transition-opacity duration-300 animate-ping" />
                                            </Marker>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="font-bold">{company.name}</p>
                                            <p className="text-xs text-muted-foreground">Clic para ver en Google Maps</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            )
                        })}
                    </ZoomableGroup>
                </ComposableMap>
            )}
        </div>
    );
}
