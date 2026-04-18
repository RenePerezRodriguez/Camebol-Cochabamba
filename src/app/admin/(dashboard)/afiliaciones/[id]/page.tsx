import { adminDb } from "@/lib/firebase-admin";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Building2, User, Briefcase, Phone, Mail, MapPin, Calendar, FileText } from "lucide-react";
import Image from "next/image";

import { AffiliationActions } from "@/components/admin/affiliation-actions";

export const dynamic = "force-dynamic";

interface PageProps {
    params: Promise<{ id: string }>;
}

function safeDate(value: any): string | null {
    if (!value) return null;
    if (typeof value === 'string') return value;
    if (value instanceof Date) return value.toLocaleDateString('es-BO', { dateStyle: 'long' });
    if (typeof value.toDate === 'function') return value.toDate().toLocaleDateString('es-BO', { dateStyle: 'long' });
    if (value._seconds !== undefined) return new Date(value._seconds * 1000).toLocaleDateString('es-BO', { dateStyle: 'long' });
    return null;
}

async function getAffiliation(id: string): Promise<Record<string, any> | null> {
    const doc = await adminDb.collection("forms_affiliate").doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as Record<string, any>;
}

const InfoRow = ({ icon: Icon, label, value }: { icon: any, label: string, value: string | null }) => {
    if (!value) return null;
    return (
        <div className="flex items-start gap-3 py-2">
            <Icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="font-medium">{value}</p>
            </div>
        </div>
    );
};

export default async function AffiliationDetailPage({ params }: PageProps) {
    const { id } = await params;
    const data = await getAffiliation(id);

    if (!data) notFound();

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/admin/afiliaciones">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">{data.empresa}</h2>
                    <p className="text-muted-foreground">Solicitud de afiliación</p>
                </div>
                <Badge
                    variant="outline"
                    className={
                        data.status === 'approved' ? "bg-green-50 text-green-700 border-green-200 ml-auto" :
                            data.status === 'rejected' ? "bg-red-50 text-red-700 border-red-200 ml-auto" :
                                "bg-yellow-50 text-yellow-700 border-yellow-200 ml-auto"
                    }
                >
                    {data.status === 'approved' ? 'Aprobado' :
                        data.status === 'rejected' ? 'Rechazado' : 'Pendiente'}
                </Badge>
                <AffiliationActions id={data.id} status={data.status || 'pending'} empresa={data.empresa} />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building2 className="h-5 w-5 text-primary" />
                            Datos Empresariales
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        <InfoRow icon={Building2} label="Empresa" value={data.empresa} />
                        <InfoRow icon={User} label="Representante" value={data.representante} />
                        <InfoRow icon={Briefcase} label="Cargo" value={data.cargo} />
                        <InfoRow icon={FileText} label="Rubro" value={data.rubro} />
                        <InfoRow icon={FileText} label="NIT" value={data.nit} />
                        <InfoRow icon={FileText} label="Matrícula" value={data.matricula} />
                        <InfoRow icon={MapPin} label="Dirección" value={data.direccionEmpresarial} />
                        <InfoRow icon={Phone} label="Teléfono Fijo" value={data.telefonoFijoEmpresarial} />
                        <InfoRow icon={Phone} label="Celular" value={data.celularEmpresarial} />
                        <InfoRow icon={Mail} label="Email" value={data.emailEmpresarial} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Briefcase className="h-5 w-5 text-primary" />
                            Información Comercial
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        <InfoRow icon={Calendar} label="Inicio de Actividades" value={data.fechaInicioActividades} />
                        <InfoRow icon={FileText} label="Actividad Principal" value={data.actividadPrincipal} />
                        <InfoRow icon={FileText} label="Tipo de Empresa" value={data.tipoEmpresa} />
                        <div className="flex gap-4 py-2">
                            <Badge variant={data.importa ? "default" : "outline"}>
                                {data.importa ? "✓ Importa" : "No Importa"}
                            </Badge>
                            <Badge variant={data.exporta ? "default" : "outline"}>
                                {data.exporta ? "✓ Exporta" : "No Exporta"}
                            </Badge>
                        </div>
                        {data.detalleActividades && (
                            <div className="pt-2">
                                <p className="text-sm text-muted-foreground">Detalle de Actividades</p>
                                <p className="text-sm mt-1">{data.detalleActividades}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5 text-primary" />
                            Datos Personales
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        <InfoRow icon={User} label="Nombre" value={data.nombreRepresentante} />
                        <InfoRow icon={MapPin} label="Lugar de Nacimiento" value={data.lugarNacimiento} />
                        <InfoRow icon={Calendar} label="Fecha de Nacimiento" value={data.fechaNacimiento} />
                        <InfoRow icon={FileText} label="C.I." value={data.ci} />
                        <InfoRow icon={FileText} label="Estado Civil" value={data.estadoCivil} />
                        <InfoRow icon={Briefcase} label="Profesión" value={data.profesion} />
                        <InfoRow icon={Phone} label="Teléfono Personal" value={data.telefonoFijoPersonal} />
                        <InfoRow icon={Phone} label="Celular Personal" value={data.celularPersonal} />
                        <InfoRow icon={Mail} label="Email Personal" value={data.emailPersonal} />
                        <InfoRow icon={MapPin} label="Domicilio" value={data.domicilio} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Phone className="h-5 w-5 text-primary" />
                            Contacto Comercial
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        {data.nombreContactoComercial ? (
                            <>
                                <InfoRow icon={User} label="Nombre" value={data.nombreContactoComercial} />
                                <InfoRow icon={Briefcase} label="Cargo" value={data.cargoContactoComercial} />
                                <InfoRow icon={Phone} label="Teléfono" value={data.telefonoContactoComercial} />
                                <InfoRow icon={Phone} label="Celular" value={data.celularContactoComercial} />
                                <InfoRow icon={Mail} label="Email" value={data.emailContactoComercial} />
                            </>
                        ) : (
                            <p className="text-muted-foreground text-sm">No se proporcionó información de contacto comercial.</p>
                        )}
                    </CardContent>
                </Card>
            </div>

            {data.signature && (
                <Card>
                    <CardHeader>
                        <CardTitle>Firma Digital</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="border rounded-lg p-4 bg-white max-w-md">
                            <img src={data.signature} alt="Firma" className="max-h-32" />
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="text-sm text-muted-foreground">
                Fecha de registro: {safeDate(data.createdAt) || "N/A"}
            </div>
        </div>
    );
}
