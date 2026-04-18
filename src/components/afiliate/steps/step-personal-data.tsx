import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/date-picker';
import { useFormContext } from 'react-hook-form';
import { AfiliateFormValues } from '@/lib/schemas/afiliate-schema';
import { FormSectionTitle } from './form-section-title';

export function StepPersonalData() {
    const form = useFormContext<AfiliateFormValues>();

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <FormSectionTitle title="Datos Personales de la Representante" />
            <FormField control={form.control} name="nombreRepresentante" render={({ field }) => (<FormItem><FormLabel>Nombre Completo</FormLabel><FormControl><Input placeholder="Nombre completo de la representante" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <div className="grid md:grid-cols-2 gap-6 mt-6">
                <FormField control={form.control} name="lugarNacimiento" render={({ field }) => (<FormItem><FormLabel>Lugar de Nacimiento</FormLabel><FormControl><Input placeholder="Ciudad y país" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="fechaNacimiento" render={({ field }) => (<FormItem><FormLabel>Fecha de Nacimiento</FormLabel><FormControl><DatePicker value={field.value} onChange={field.onChange} toYear={new Date().getFullYear() - 18} /></FormControl><FormMessage /></FormItem>)} />
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
                <FormField control={form.control} name="ci" render={({ field }) => (<FormItem><FormLabel>Carnet de Identidad</FormLabel><FormControl><Input placeholder="Número de C.I." {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="estadoCivil" render={({ field }) => (<FormItem><FormLabel>Estado Civil</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="profesion" render={({ field }) => (<FormItem><FormLabel>Profesión</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
                <FormField control={form.control} name="telefonoFijoPersonal" render={({ field }) => (<FormItem><FormLabel>Teléfono Fijo</FormLabel><FormControl><Input placeholder="(Opcional)" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="celularPersonal" render={({ field }) => (<FormItem><FormLabel>Celular</FormLabel><FormControl><Input placeholder="Celular personal" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="emailPersonal" render={({ field }) => (<FormItem><FormLabel>Correo Electrónico</FormLabel><FormControl><Input type="email" placeholder="Email personal" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
            <FormField control={form.control} name="domicilio" render={({ field }) => (<FormItem className="mt-6"><FormLabel>Domicilio</FormLabel><FormControl><Input placeholder="Dirección de domicilio" {...field} /></FormControl><FormMessage /></FormItem>)} />

            <FormSectionTitle title="Datos de Contacto (Área Comercial o Marketing)" />
            <div className="grid md:grid-cols-2 gap-6">
                <FormField control={form.control} name="nombreContactoComercial" render={({ field }) => (<FormItem><FormLabel>Nombre Completo (Opcional)</FormLabel><FormControl><Input placeholder="Nombre del contacto" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="cargoContactoComercial" render={({ field }) => (<FormItem><FormLabel>Cargo (Opcional)</FormLabel><FormControl><Input placeholder="Cargo del contacto" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
                <FormField control={form.control} name="telefonoContactoComercial" render={({ field }) => (<FormItem><FormLabel>Teléfono (Opcional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="celularContactoComercial" render={({ field }) => (<FormItem><FormLabel>Celular (Opcional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="emailContactoComercial" render={({ field }) => (<FormItem><FormLabel>Email (Opcional)</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
        </div>
    );
}
