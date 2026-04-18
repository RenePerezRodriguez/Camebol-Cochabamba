import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Edit } from 'lucide-react';
import SignaturePad from '@/components/afiliate/SignaturePad';
import { PhotoUpload } from '@/components/afiliate/PhotoUpload';
import { useFormContext, useWatch } from 'react-hook-form';
import { AfiliateFormValues } from '@/lib/schemas/afiliate-schema';
import { FormSectionTitle } from './form-section-title';

const SummaryItem = ({ label, value }: { label: string, value: any }) => {
    const displayValue = typeof value === 'boolean' ? (value ? 'Sí' : 'No') : (value || '-');
    return (
        <div className="break-words">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="font-semibold">{displayValue}</p>
        </div>
    );
};

export function StepSummary({ onEdit }: { onEdit: (step: number) => void }) {
    const form = useFormContext<AfiliateFormValues>();
    const formData = useWatch({ control: form.control });

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <FormSectionTitle title="Resumen y Firma" />

            <Card className="mb-8 bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-xl !font-headline flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2">
                        Revisa tu Información
                        <Button type="button" variant="ghost" size="sm" onClick={() => onEdit(1)}><Edit className="mr-2 h-4 w-4" /> Editar Todo</Button>
                    </CardTitle>
                    <CardDescription>Asegúrate que todos los datos sean correctos antes de firmar y enviar.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold text-primary">Datos Empresariales</h4>
                            <Button type="button" variant="link" size="sm" onClick={() => onEdit(1)}>Editar</Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm p-4 border rounded-lg bg-background">
                            <SummaryItem label="Empresa" value={formData.empresa} />
                            <SummaryItem label="Representante" value={formData.representante} />
                            <SummaryItem label="Cargo" value={formData.cargo} />
                            <SummaryItem label="Rubro" value={formData.rubro} />
                            <SummaryItem label="NIT" value={formData.nit} />
                            <SummaryItem label="Matrícula" value={formData.matricula} />
                            <SummaryItem label="Email" value={formData.emailEmpresarial} />
                            <SummaryItem label="Celular" value={formData.celularEmpresarial} />
                            <SummaryItem label="Dirección" value={formData.direccionEmpresarial} />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold text-primary">Información Comercial</h4>
                            <Button type="button" variant="link" size="sm" onClick={() => onEdit(2)}>Editar</Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm p-4 border rounded-lg bg-background">
                            <SummaryItem label="Inicio de Actividades" value={formData.fechaInicioActividades} />
                            <SummaryItem label="Actividad Principal" value={formData.actividadPrincipal} />
                            <SummaryItem label="Tipo de Empresa" value={formData.tipoEmpresa} />
                            <SummaryItem label="Importa" value={formData.importa} />
                            <SummaryItem label="Exporta" value={formData.exporta} />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold text-primary">Datos Personales</h4>
                            <Button type="button" variant="link" size="sm" onClick={() => onEdit(3)}>Editar</Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm p-4 border rounded-lg bg-background">
                            <SummaryItem label="Nombre Representante" value={formData.nombreRepresentante} />
                            <SummaryItem label="Fecha de Nacimiento" value={formData.fechaNacimiento} />
                            <SummaryItem label="C.I." value={formData.ci} />
                            <SummaryItem label="Profesión" value={formData.profesion} />
                            <SummaryItem label="Email Personal" value={formData.emailPersonal} />
                            <SummaryItem label="Celular Personal" value={formData.celularPersonal} />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid sm:grid-cols-2 gap-8 items-start">
                <FormField control={form.control} name="fotoUrl" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Fotografía Tipo Carnet</FormLabel>
                        <FormControl>
                            <PhotoUpload value={field.value} onChange={(url) => form.setValue('fotoUrl', url)} />
                        </FormControl>
                        <FormDescription>Sube una foto tipo carnet (opcional).</FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="signature" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Firma Digital</FormLabel>
                        <FormControl>
                            <SignaturePad
                                onSave={(dataUrl) => form.setValue('signature', dataUrl)}
                                hasSignature={!!field.value}
                            />
                        </FormControl>
                        <FormDescription>Dibuja tu firma en el recuadro.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
        </div>
    );
}
