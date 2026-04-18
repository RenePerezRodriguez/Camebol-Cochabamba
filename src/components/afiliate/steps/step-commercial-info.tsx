import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/date-picker';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useFormContext } from 'react-hook-form';
import { AfiliateFormValues } from '@/lib/schemas/afiliate-schema';
import { FormSectionTitle } from './form-section-title';

export function StepCommercialInfo() {
    const form = useFormContext<AfiliateFormValues>();

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <FormSectionTitle title="Información Comercial" />
            <div className="grid md:grid-cols-2 gap-6">
                <FormField control={form.control} name="fechaInicioActividades" render={({ field }) => (<FormItem><FormLabel>Fecha de Inicio de Actividades</FormLabel><FormControl><DatePicker value={field.value} onChange={field.onChange} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="actividadPrincipal" render={({ field }) => (<FormItem><FormLabel>Actividad Principal</FormLabel><FormControl><Input placeholder="Actividad principal de la empresa" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
            <FormField control={form.control} name="tipoEmpresa" render={({ field }) => (
                <FormItem className="space-y-3 mt-6"><FormLabel>Tipo de Empresa</FormLabel>
                    <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                            <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="comercial" /></FormControl><FormLabel className="font-normal">Comercial</FormLabel></FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="industrial" /></FormControl><FormLabel className="font-normal">Industrial</FormLabel></FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="servicios" /></FormControl><FormLabel className="font-normal">Servicios</FormLabel></FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="otros" /></FormControl><FormLabel className="font-normal">Otros</FormLabel></FormItem>
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <div className="flex items-center space-x-6 mt-6">
                <FormField control={form.control} name="importa" render={({ field }) => (<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><div className="space-y-1 leading-none"><FormLabel>¿Importa?</FormLabel></div></FormItem>)} />
                <FormField control={form.control} name="exporta" render={({ field }) => (<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><div className="space-y-1 leading-none"><FormLabel>¿Exporta?</FormLabel></div></FormItem>)} />
            </div>
            <FormField control={form.control} name="detalleActividades" render={({ field }) => (<FormItem className="mt-6"><FormLabel>Detalle las Actividades que realiza</FormLabel><FormControl><Textarea placeholder="Describe brevemente las actividades comerciales..." {...field} /></FormControl><FormMessage /></FormItem>)} />
        </div>
    );
}
