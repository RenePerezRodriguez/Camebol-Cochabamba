"use client";

import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { setUserRole, type UserRole } from "@/actions/users"; // Import correctly
import { Loader2 } from "lucide-react";

interface UserRoleSelectProps {
    uid: string;
    currentRole: UserRole;
    disabled?: boolean;
}

export function UserRoleSelect({ uid, currentRole, disabled }: UserRoleSelectProps) {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    // Local state for optimistic update feeling
    const [role, setRole] = useState<UserRole>(currentRole);

    const handleValueChange = async (newRole: string) => {
        const roleValue = newRole as UserRole;
        setLoading(true);
        try {
            const result = await setUserRole(uid, roleValue);
            if (result.success) {
                setRole(roleValue);
                toast({
                    title: "Rol actualizado",
                    description: `El usuario ahora es ${roleValue === "admin"
                            ? "Administrador"
                            : roleValue === "editor"
                                ? "Editor"
                                : "Usuario"
                        }.`,
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: result.error || "No se pudo actualizar el rol.",
                });
                // Revert on error if needed, but for now we just show error
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Ocurrió un error inesperado.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <Select
                disabled={disabled || loading}
                onValueChange={handleValueChange}
                value={role}
            >
                <SelectTrigger className="w-[140px] h-8">
                    {loading && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
                    <SelectValue placeholder="Rol" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="user">Usuario</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
