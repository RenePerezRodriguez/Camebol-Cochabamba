"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { updateMemberOrder } from "@/actions/members";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface MemberOrderInputProps {
    id: string;
    initialOrder: number;
}

export function MemberOrderInput({ id, initialOrder }: MemberOrderInputProps) {
    const [order, setOrder] = useState(initialOrder);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleUpdate = () => {
        if (order === initialOrder) return;

        startTransition(async () => {
            const result = await updateMemberOrder(id, order);
            if (result?.error) {
                toast({
                    title: "Error",
                    description: "No se pudo actualizar el orden.",
                    variant: "destructive",
                });
                setOrder(initialOrder); // Revert on error
            } else {
                toast({
                    title: "Orden actualizado",
                    description: "El orden se ha guardado correctamente.",
                });
            }
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.currentTarget.blur(); // Trigger onBlur
        }
    };

    return (
        <div className="relative w-20">
            <Input
                type="number"
                value={order}
                onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
                onBlur={handleUpdate}
                onKeyDown={handleKeyDown}
                disabled={isPending}
                className="h-8 w-20 text-center pr-6" // Space for spinner
            />
            {isPending && (
                <div className="absolute right-1 top-1/2 -translate-y-1/2">
                    <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                </div>
            )}
        </div>
    );
}
