"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserData } from "@/actions/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { UserRoleSelect } from "@/components/admin/users/user-role-select"; // Path adjustment

export const columns: ColumnDef<UserData>[] = [
    {
        accessorKey: "displayName",
        header: "Usuario",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
                        <AvatarFallback>{(user.displayName || user.email || "U").substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-medium text-sm">{user.displayName || "Sin nombre"}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "role",
        header: "Rol",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <UserRoleSelect
                    uid={user.uid}
                    currentRole={user.role}
                />
            );
        },
    },
    {
        accessorKey: "creationTime",
        header: "Registrado",
        cell: ({ row }) => {
            const dateStr = row.getValue("creationTime") as string;
            if (!dateStr) return <span className="text-xs text-muted-foreground">-</span>;

            try {
                return (
                    <span className="text-sm">
                        {format(new Date(dateStr), "dd MMM yyyy", { locale: es })}
                    </span>
                );
            } catch (e) {
                return <span className="text-xs text-muted-foreground">Fecha inválida</span>;
            }
        },
    },
    {
        accessorKey: "lastSignInTime",
        header: "Último Acceso",
        cell: ({ row }) => {
            const dateStr = row.getValue("lastSignInTime") as string;
            if (!dateStr) return <span className="text-xs text-muted-foreground">Nunca</span>;

            try {
                return (
                    <span className="text-xs text-muted-foreground">
                        {format(new Date(dateStr), "dd/MM/yyyy HH:mm", { locale: es })}
                    </span>
                );
            } catch (e) {
                return <span className="text-xs text-muted-foreground">-</span>;
            }
        },
    },
];
