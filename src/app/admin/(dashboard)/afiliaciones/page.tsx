import { adminDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AffiliationActions } from "@/components/admin/affiliation-actions";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";

interface Affiliation {
    id: string;
    empresa: string;
    representante: string;
    rubro: string;
    emailEmpresarial: string;
    celularEmpresarial: string;
    status: string;
    createdAt?: string;
}

function safeDate(value: any): string | null {
    if (!value) return null;
    if (typeof value === 'string') return value;
    if (value instanceof Date) return value.toLocaleDateString('es-BO');
    if (typeof value.toDate === 'function') return value.toDate().toLocaleDateString('es-BO');
    if (value._seconds !== undefined) return new Date(value._seconds * 1000).toLocaleDateString('es-BO');
    return null;
}

async function getAffiliations(): Promise<Affiliation[]> {
    try {
        const snapshot = await adminDb.collection("forms_affiliate").orderBy("createdAt", "desc").limit(50).get();
        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                empresa: data.empresa || "",
                representante: data.representante || "",
                rubro: data.rubro || "",
                emailEmpresarial: data.emailEmpresarial || "",
                celularEmpresarial: data.celularEmpresarial || "",
                status: data.status || "pending",
                createdAt: safeDate(data.createdAt) || "N/A",
            };
        });
    } catch (error) {
        console.error("Error fetching affiliations:", error);
        return [];
    }
}

export default async function AffiliationsPage() {
    const affiliations = await getAffiliations();

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Solicitudes de Afiliación</h2>
            </div>

            <div className="rounded-md border bg-white dark:bg-gray-900">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Empresa</TableHead>
                            <TableHead>Representante</TableHead>
                            <TableHead>Rubro</TableHead>
                            <TableHead>Contacto</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {affiliations.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center h-24">No hay solicitudes recientes.</TableCell>
                            </TableRow>
                        ) : (
                            affiliations.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="text-sm text-muted-foreground">{item.createdAt}</TableCell>
                                    <TableCell className="font-medium">{item.empresa}</TableCell>
                                    <TableCell>{item.representante}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400">
                                            {item.rubro}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm">
                                            <div>{item.emailEmpresarial}</div>
                                            <div className="text-muted-foreground">{item.celularEmpresarial}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className={
                                                item.status === 'approved' ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400" :
                                                    item.status === 'rejected' ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400" :
                                                        "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400"
                                            }
                                        >
                                            {item.status === 'approved' ? 'Aprobado' :
                                                item.status === 'rejected' ? 'Rechazado' : 'Pendiente'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/admin/afiliaciones/${item.id}`}>
                                                    <Eye className="h-4 w-4 mr-1" /> Ver
                                                </Link>
                                            </Button>
                                            <AffiliationActions
                                                id={item.id}
                                                status={item.status}
                                                empresa={item.empresa}
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
