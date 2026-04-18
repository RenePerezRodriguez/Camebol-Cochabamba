"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { BannerRowActions } from "@/components/admin/banner-row-actions";

export type Banner = {
    id: string;
    title: string;
    content: string;
    type: "info" | "warning" | "success" | "promo";
    isActive: boolean;
    link?: string | null;
    createdAt?: string | null;
    startDate?: string | null;
    endDate?: string | null;
};

export const columns: ColumnDef<Banner>[] = [
    {
        accessorKey: "title",
        header: "Título",
    },

    {
        accessorKey: "isActive",
        header: "Estado",
        cell: ({ row }) => {
            const isActive = row.getValue("isActive") as boolean;
            return (
                <Badge variant={isActive ? "default" : "secondary"}>
                    {isActive ? "ACTIVO" : "INACTIVO"}
                </Badge>
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => <BannerRowActions banner={row.original} />,
    },
];
