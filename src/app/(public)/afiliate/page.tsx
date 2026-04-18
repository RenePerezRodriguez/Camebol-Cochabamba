'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Building2, User, FileText, Briefcase, Download, Check, ArrowLeft, ArrowRight, Send, Clock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { SectionHeader } from '@/components/layout/section-header';
import { cn } from '@/lib/utils';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { SectionDivider } from '@/components/ui/section-divider';
import { TextReveal } from '@/components/ui/text-reveal';

import { afiliateFormSchema, type AfiliateFormValues } from '@/lib/schemas/afiliate-schema';
import { handleFormSubmission } from './actions';

import { StepBusinessData } from '@/components/afiliate/steps/step-business-data';
import { StepCommercialInfo } from '@/components/afiliate/steps/step-commercial-info';
import { StepPersonalData } from '@/components/afiliate/steps/step-personal-data';
import { StepSummary } from '@/components/afiliate/steps/step-summary';

const steps = [
    { id: 1, title: 'Datos Empresariales', fields: ['empresa', 'representante', 'cargo', 'rubro', 'nit', 'matricula', 'direccionEmpresarial', 'telefonoFijoEmpresarial', 'emailEmpresarial', 'celularEmpresarial'] },
    { id: 2, title: 'Información Comercial', fields: ['fechaInicioActividades', 'actividadPrincipal', 'tipoEmpresa', 'importa', 'exporta', 'detalleActividades'] },
    { id: 3, title: 'Datos Personales', fields: ['nombreRepresentante', 'lugarNacimiento', 'fechaNacimiento', 'ci', 'estadoCivil', 'profesion', 'telefonoFijoPersonal', 'celularPersonal', 'emailPersonal', 'domicilio', 'nombreContactoComercial', 'cargoContactoComercial', 'telefonoContactoComercial', 'celularContactoComercial', 'emailContactoComercial'] },
    { id: 4, title: 'Firma y Resumen', fields: ['fotoUrl', 'signature'] }
];

const RequisitoItem = ({ text, icon: Icon }: { text: string, icon: React.ElementType }) => (
    <li className="flex items-start group">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center mr-3 mt-1 rotate-45 group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
            <Icon className="w-4 h-4 -rotate-45" />
        </div>
        <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">{text}</span>
    </li>
);

const SubRequisitoItem = ({ text }: { text: string }) => (
    <li className="flex items-start ml-6 group">
        <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-3 mt-1 rotate-45 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
            <Check className="w-3 h-3 -rotate-45" />
        </div>
        <span className="text-muted-foreground text-sm group-hover:text-foreground transition-colors duration-300">{text}</span>
    </li>
);

export default function AfiliatePage() {
    const { toast } = useToast();
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoaded, setIsLoaded] = useState(false);
    const formCardRef = useRef<HTMLDivElement>(null);

    const form = useForm<AfiliateFormValues>({
        resolver: zodResolver(afiliateFormSchema),
        defaultValues: {
            empresa: "",
            representante: "",
            cargo: "",
            rubro: "",
            nit: "",
            matricula: "",
            direccionEmpresarial: "",
            telefonoFijoEmpresarial: "",
            emailEmpresarial: "",
            celularEmpresarial: "",
            fechaInicioActividades: "",
            actividadPrincipal: "",
            detalleActividades: "",
            nombreRepresentante: "",
            lugarNacimiento: "",
            fechaNacimiento: "",
            ci: "",
            estadoCivil: "",
            profesion: "",
            telefonoFijoPersonal: "",
            celularPersonal: "",
            emailPersonal: "",
            domicilio: "",
            nombreContactoComercial: "",
            cargoContactoComercial: "",
            telefonoContactoComercial: "",
            celularContactoComercial: "",
            emailContactoComercial: "",
            fotoUrl: "",
            signature: "",
            importa: false,
            exporta: false,
        },
    });

    // Load from localStorage
    useEffect(() => {
        const savedData = localStorage.getItem('afiliateFormData');
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                form.reset(parsed);
            } catch (error) {
                console.error('Error loading form data:', error);
            }
        }
        setIsLoaded(true);
    }, [form]);

    // Save to localStorage
    useEffect(() => {
        if (!isLoaded) return;
        const subscription = form.watch((value) => {
            localStorage.setItem('afiliateFormData', JSON.stringify(value));
        });
        return () => subscription.unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.watch, isLoaded]);


    const progress = useMemo(() => {
        return (currentStep / steps.length) * 100;
    }, [currentStep]);

    async function processSubmit(values: AfiliateFormValues) {
        const result = await handleFormSubmission(values);

        if (result.success) {
            toast({
                title: '¡Solicitud Enviada!',
                description: 'Gracias por tu interés. Nos pondremos en contacto contigo pronto.',
            });
            form.reset();
            localStorage.removeItem('afiliateFormData');
            setCurrentStep(1);
        } else {
            toast({
                variant: 'destructive',
                title: 'Error al enviar',
                description: result.message || 'Hubo un problema al enviar tu solicitud. Por favor, intenta de nuevo.',
            });
        }
    }

    const goToNextStep = async () => {
        const currentFields = steps[currentStep - 1].fields as (keyof AfiliateFormValues)[];
        const isValid = await form.trigger(currentFields);

        if (isValid) {
            if (currentStep < steps.length) {
                setCurrentStep(step => step + 1);
                formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            toast({
                variant: 'destructive',
                title: 'Campos incompletos',
                description: 'Por favor, completa todos los campos requeridos antes de continuar.',
            });
        }
    };

    const goToPrevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(step => step - 1);
            formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    if (!isLoaded) return null; // Prevent hydration mismatch

    return (
        <div className="relative overflow-hidden min-h-screen">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background -z-20" />
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

            {/* Floating Diamonds Background Pattern */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[10%] right-[5%] w-24 h-24 border border-primary/10 rotate-45 opacity-20 animate-float" />
                <div className="absolute top-[40%] left-[10%] w-32 h-32 border border-secondary/10 rotate-45 opacity-20 animate-float-delayed" />
                <div className="absolute bottom-[20%] right-[15%] w-16 h-16 bg-primary/5 rotate-45 opacity-20 animate-float" />
            </div>

            <div className="container py-12 md:py-24 relative">
                <div className="text-center mb-12 space-y-4">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        Únete a la Red
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold !font-headline leading-tight">
                        <TextReveal text="Forma Parte de CAMEBOL" />
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Conoce los requisitos y completa el formulario para iniciar tu proceso de afiliación.
                    </p>
                </div>

                <div className="flex justify-center -mt-4 mb-12">
                    <div className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-border/50 px-6 py-2 rounded-full text-sm font-medium shadow-sm animate-fade-in-up">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>Tiempo estimado: 5 minutos</span>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto mb-16">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold !font-headline text-center sm:text-left mb-4 sm:mb-0">Requisitos de Afiliación</h2>
                        <MagneticButton>
                            <Button asChild size="sm" variant="outline" className="rounded-full border-primary/20 hover:bg-primary/5">
                                <Link href="/docs/formulario-afiliacion.pdf" target="_blank">
                                    <Download className="mr-2 h-4 w-4" />
                                    Descargar Formulario PDF
                                </Link>
                            </Button>
                        </MagneticButton>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        <Card className="bg-background/60 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors duration-300">
                            <CardHeader className="flex-row items-center gap-6">
                                <div className="relative w-14 h-14 shrink-0">
                                    <div className="absolute inset-0 bg-primary/10 rotate-45 rounded-xl" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Building2 className="h-7 w-7 text-primary" />
                                    </div>
                                </div>
                                <CardTitle className="text-xl md:text-2xl !font-headline">Para Empresas</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4">
                                    <RequisitoItem text="Formulario de afiliación." icon={FileText} />
                                    <RequisitoItem text="Fotocopia de NIT y Matrícula de comercio." icon={FileText} />
                                    <RequisitoItem text="Para alta ejecutiva de una Empresa o Asociación, adjuntar una carta de Representatividad que la acredite como tal." icon={Briefcase} />
                                    <RequisitoItem text="Para Sociedades Empresariales (además de los requisitos 1 y 2):" icon={FileText} />
                                    <ul className="space-y-3 pl-5">
                                        <SubRequisitoItem text="Testimonio de la consolidación de la sociedad." />
                                        <SubRequisitoItem text="Si es Representante Legal, una fotocopia del Poder que la acredite como tal." />
                                    </ul>
                                </ul>
                            </CardContent>
                        </Card>
                        <Card className="bg-background/60 backdrop-blur-sm border-secondary/10 hover:border-secondary/30 transition-colors duration-300">
                            <CardHeader className="flex-row items-center gap-6">
                                <div className="relative w-14 h-14 shrink-0">
                                    <div className="absolute inset-0 bg-secondary/10 rotate-45 rounded-xl" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <User className="h-7 w-7 text-secondary" />
                                    </div>
                                </div>
                                <CardTitle className="text-xl md:text-2xl !font-headline">Para Emprendedoras</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4">
                                    <RequisitoItem text="Formulario de Inscripción." icon={FileText} />
                                    <RequisitoItem text="Fotocopia de C.I." icon={FileText} />
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <Card ref={formCardRef} className="max-w-4xl mx-auto border-none shadow-2xl bg-background/80 backdrop-blur-md overflow-hidden relative scroll-mt-24">
                    {/* Decorative top border */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" />

                    <CardHeader className="text-center pt-10 pb-2">
                        <CardTitle className="text-2xl md:text-3xl !font-headline">Formulario de Registro</CardTitle>
                        <CardDescription className="text-base mt-2">
                            Sigue los pasos para completar tu registro. ¡Esperamos darte la bienvenida!
                        </CardDescription>

                        {/* Custom Diamond Stepper */}
                        <div className="py-8 px-4">
                            <div className="relative flex justify-between items-center max-w-2xl mx-auto">
                                {/* Connecting Line */}
                                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -z-10" />
                                <div
                                    className="absolute top-1/2 left-0 h-0.5 bg-primary -z-10 transition-all duration-500 ease-in-out"
                                    style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                                />

                                {steps.map((step) => {
                                    const isActive = step.id === currentStep;
                                    const isCompleted = step.id < currentStep;

                                    return (
                                        <div key={step.id} className="flex flex-col items-center gap-2 relative group">
                                            <div
                                                className={cn(
                                                    "w-10 h-10 rotate-45 flex items-center justify-center border-2 transition-all duration-300 z-10",
                                                    isActive ? "bg-primary border-primary scale-110 shadow-lg" :
                                                        isCompleted ? "bg-primary border-primary" : "bg-background border-muted"
                                                )}
                                            >
                                                <div className="-rotate-45 font-bold text-sm">
                                                    {isCompleted ? <Check className="w-5 h-5 text-white" /> :
                                                        <span className={cn(isActive || isCompleted ? "text-white" : "text-muted-foreground")}>{step.id}</span>}
                                                </div>
                                            </div>
                                            <span className={cn(
                                                "absolute -bottom-8 text-xs font-medium whitespace-nowrap transition-colors duration-300 hidden sm:block",
                                                isActive ? "text-primary" : "text-muted-foreground"
                                            )}>
                                                {step.title}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 md:p-10">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(processSubmit)} className="space-y-8">

                                <div className={cn("transition-all duration-300 animate-in fade-in slide-in-from-right-4", currentStep !== 1 && "hidden")}>
                                    <StepBusinessData />
                                </div>

                                <div className={cn("transition-all duration-300 animate-in fade-in slide-in-from-right-4", currentStep !== 2 && "hidden")}>
                                    <StepCommercialInfo />
                                </div>

                                <div className={cn("transition-all duration-300 animate-in fade-in slide-in-from-right-4", currentStep !== 3 && "hidden")}>
                                    <StepPersonalData />
                                </div>

                                <div className={cn("transition-all duration-300 animate-in fade-in slide-in-from-right-4", currentStep !== 4 && "hidden")}>
                                    <StepSummary onEdit={setCurrentStep} />
                                </div>

                                <div className="mt-12 flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-border/50">
                                    {currentStep > 1 ? (
                                        <Button type="button" variant="ghost" onClick={goToPrevStep} className="w-full sm:w-auto hover:bg-primary/5">
                                            <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
                                        </Button>
                                    ) : <div></div>}

                                    {currentStep < steps.length && (
                                        <MagneticButton>
                                            <Button type="button" onClick={goToNextStep} className="w-full sm:w-auto rounded-full px-8">
                                                Siguiente <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </MagneticButton>
                                    )}

                                    {currentStep === steps.length && (
                                        <MagneticButton>
                                            <Button type="submit" size="lg" disabled={form.formState.isSubmitting || !form.watch('signature')} className="w-full sm:w-auto rounded-full px-8 shadow-lg hover:shadow-xl">
                                                {form.formState.isSubmitting ? 'Enviando...' : (<> <Send className="mr-2 h-4 w-4" /> Enviar Solicitud Oficial</>)}
                                            </Button>
                                        </MagneticButton>
                                    )}
                                </div>

                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
            <SectionDivider />
        </div>
    );
}