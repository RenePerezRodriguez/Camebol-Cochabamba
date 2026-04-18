"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Associate } from "@/lib/schemas/associate";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AssociateRowActions } from "@/components/admin/associates/associate-row-actions";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Associate>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nombre
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "sectorName",
        header: "Sector",
        cell: ({ row }) => {
            return (
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    {row.original.sectorName}
                </Badge>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.original.sectorId);
        },
    },
    {
        accessorKey: "discount",
        header: "Descuento",
        cell: ({ row }) => {
            if (!row.original.discount) return <span className="text-gray-400">-</span>;
            return (
                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    Con Descuento
                </Badge>
            );
        }
    },
    {
        accessorKey: "isActive",
        header: "Estado",
        cell: ({ row }) => (
            <span className={row.original.isActive ? "text-green-600 dark:text-green-400 font-medium" : "text-gray-400"}>
                {row.original.isActive ? "Activo" : "Inactivo"}
            </span>
        )
    },
    {
        id: "actions",
        cell: ({ row }) => <AssociateRowActions associate={row.original} />,
    },
];
