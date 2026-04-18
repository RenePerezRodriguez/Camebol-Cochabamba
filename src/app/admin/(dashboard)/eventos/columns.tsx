"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Event } from "@/lib/schemas/event";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventsRowActions } from "@/components/admin/events-row-actions";

export const columns: ColumnDef<Event>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Título
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "date",
        header: "Fecha",
        cell: ({ row }) => {
            const date = new Date(row.original.start);
            return <div className="font-medium">{date.toLocaleDateString()}</div>
        },
    },
    {
        accessorKey: "category",
        header: "Categoría",
    },
    {
        id: "actions",
        cell: ({ row }) => <EventsRowActions event={row.original} />,
    },
];
