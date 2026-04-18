"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toggleMaintenanceMode } from "@/actions/settings";
import { useState, useTransition } from "react";
import { useToast } from "@/hooks/use-toast";

interface MaintenanceSwitchProps {
    initialState: boolean;
}

export function MaintenanceSwitch({ initialState }: MaintenanceSwitchProps) {
    const [isEnabled, setIsEnabled] = useState(initialState);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    function handleToggle(checked: boolean) {
        setIsEnabled(checked); // Optimistic UI
        startTransition(async () => {
            const result = await toggleMaintenanceMode(isEnabled);
            if (result.success) {
                toast({
                    title: checked ? "Mantenimiento ACTIVADO" : "Mantenimiento DESACTIVADO",
                    description: checked
                        ? "El sitio público ahora está bloqueado."
                        : "El sitio vuelve a estar visible para todos.",
                    variant: checked ? "destructive" : "default",
                });
            } else {
                setIsEnabled(!checked); // Revert on error
                toast({
                    title: "Error",
                    description: "No se pudo actualizar la configuración.",
                    variant: "destructive",
                });
            }
        });
    }

    return (
        <div className="flex items-center space-x-2">
            <Switch
                id="maintenance-mode"
                checked={isEnabled}
                onCheckedChange={handleToggle}
                disabled={isPending}
            />
            <Label htmlFor="maintenance-mode">
                {isEnabled ? "Sitio Cerrado (En Mantenimiento)" : "Sitio Activo (Público)"}
            </Label>
        </div>
    );
}
