"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Member, memberTypeLabels, MemberType } from "@/lib/schemas/member";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DirectoryRowActions } from "@/components/admin/directory-row-actions";
import { Badge } from "@/components/ui/badge";
import { MemberOrderInput } from "@/components/admin/member-order-input";

const typeBadgeColors: Record<MemberType, string> = {
    directorio: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    directiva: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    equipo: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
};

export const columns: ColumnDef<Member>[] = [
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
        accessorKey: "type",
        header: "Tipo",
        cell: ({ row }) => {
            const type = (row.original.type || "directorio") as MemberType;
            return (
                <Badge variant="outline" className={typeBadgeColors[type]}>
                    {memberTypeLabels[type]}
                </Badge>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "company",
        header: "Empresa",
    },
    {
        accessorKey: "role",
        header: "Cargo",
    },
    {
        accessorKey: "isActive",
        header: "Estado",
        cell: ({ row }) => (
            <span className={row.original.isActive ? "text-green-600 dark:text-green-400" : "text-gray-400"}>
                {row.original.isActive ? "Activo" : "Inactivo"}
            </span>
        )
    },
    {
        accessorKey: "order",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Orden
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <MemberOrderInput id={row.original.id} initialOrder={row.original.order || 0} />
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => <DirectoryRowActions member={row.original} />,
    },
];
