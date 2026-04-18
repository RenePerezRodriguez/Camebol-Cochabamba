"use client";

import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TourHelpButtonProps {
    onClick: () => void;
    label?: string;
}

export function TourHelpButton({ onClick, label = "Ver Guía de Uso" }: TourHelpButtonProps) {
    return (
        <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClick}
            className="gap-2 text-brand-pink hover:text-brand-pink hover:bg-brand-pink/10 border-brand-pink/20"
        >
            <HelpCircle className="h-4 w-4" />
            {label}
        </Button>
    );
}
