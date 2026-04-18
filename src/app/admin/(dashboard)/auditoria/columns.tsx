"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AuditAction, AuditResource } from "@/lib/logger";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type AuditLog = {
    id: string;
    action: AuditAction;
    resource: AuditResource;
    details: string;
    userEmail: string;
    createdAt: string;
};

export const columns: ColumnDef<AuditLog>[] = [
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Fecha
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "action",
        header: "Acción",
        cell: ({ row }) => {
            const action = row.getValue("action") as string;
            return (
                <Badge variant={
                    action === 'create' ? 'default' :
                        action === 'delete' ? 'destructive' :
                            action === 'update' ? 'secondary' : 'outline'
                }>
                    {action.toUpperCase()}
                </Badge>
            )
        }
    },
    {
        accessorKey: "resource",
        header: "Recurso",
        cell: ({ row }) => <Badge variant="outline">{row.getValue("resource")}</Badge>
    },
    {
        accessorKey: "details",
        header: "Detalles",
    },
    {
        accessorKey: "userEmail",
        header: "Usuario",
        cell: ({ row }) => <span className="text-muted-foreground">{row.getValue("userEmail")}</span>
    },
];
