import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';
import { AfiliateFormValues } from '@/lib/schemas/afiliate-schema';
import { FormSectionTitle } from './form-section-title';

export function StepBusinessData() {
    const form = useFormContext<AfiliateFormValues>();

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <FormSectionTitle title="Datos Empresariales" />
            <div className="grid md:grid-cols-2 gap-6">
                <FormField control={form.control} name="empresa" render={({ field }) => (<FormItem><FormLabel>Empresa</FormLabel><FormControl><Input placeholder="Nombre de la empresa" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="representante" render={({ field }) => (<FormItem><FormLabel>Representante</FormLabel><FormControl><Input placeholder="Nombre del representante legal" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="cargo" render={({ field }) => (<FormItem><FormLabel>Cargo</FormLabel><FormControl><Input placeholder="Tu cargo en la empresa" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="rubro" render={({ field }) => (<FormItem><FormLabel>Rubro de la Empresa</FormLabel><FormControl><Input placeholder="Ej: Tecnología, Gastronomía..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="nit" render={({ field }) => (<FormItem><FormLabel>NIT</FormLabel><FormControl><Input placeholder="Número de NIT" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="matricula" render={({ field }) => (<FormItem><FormLabel>Matrícula de Comercio</FormLabel><FormControl><Input placeholder="Número de matrícula" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
            <FormField control={form.control} name="direccionEmpresarial" render={({ field }) => (<FormItem className="mt-6"><FormLabel>Dirección</FormLabel><FormControl><Input placeholder="Dirección de la empresa" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <div className="grid md:grid-cols-3 gap-6 mt-6">
                <FormField control={form.control} name="telefonoFijoEmpresarial" render={({ field }) => (<FormItem><FormLabel>Teléfono Fijo</FormLabel><FormControl><Input placeholder="(Opcional)" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="celularEmpresarial" render={({ field }) => (<FormItem><FormLabel>Celular</FormLabel><FormControl><Input placeholder="Celular de la empresa" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="emailEmpresarial" render={({ field }) => (<FormItem><FormLabel>Correo Electrónico</FormLabel><FormControl><Input type="email" placeholder="Email de la empresa" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
        </div>
    );
}
