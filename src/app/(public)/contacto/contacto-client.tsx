'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram } from 'lucide-react';
import { FOOTER_DATA } from '@/lib/data';
import { TextReveal } from '@/components/ui/text-reveal';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { SectionDivider } from '@/components/ui/section-divider';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm } from '@/actions/contact';

const contactSchema = z.object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    subject: z.string().min(5, 'El asunto debe tener al menos 5 caracteres'),
    message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactoClient() {
    const { toast } = useToast();
    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: '',
            email: '',
            subject: '',
            message: '',
        },
    });

    const onSubmit = async (data: ContactFormValues) => {
        try {
            const result = await submitContactForm(data);

            if (result.success) {
                toast({
                    title: '¡Mensaje enviado!',
                    description: 'Hemos recibido tu mensaje. Te responderemos a la brevedad.',
                });
                form.reset();
            } else {
                toast({
                    title: 'Error al enviar',
                    description: 'No pudimos enviar tu mensaje. Intenta de nuevo o contáctanos por WhatsApp.',
                    variant: 'destructive',
                });
            }
        } catch {
            toast({
                title: 'Error al enviar',
                description: 'No pudimos enviar tu mensaje. Intenta de nuevo o contáctanos por WhatsApp.',
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="relative overflow-hidden min-h-screen">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background -z-20" />
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

            {/* Floating Diamonds Background Pattern */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[10%] right-[5%] w-24 h-24 border border-primary/10 rotate-45 opacity-20 animate-float" />
                <div className="absolute top-[40%] left-[10%] w-32 h-32 border border-secondary/10 rotate-45 opacity-20 animate-float-delayed" />
                <div className="absolute bottom-[20%] right-[15%] w-16 h-16 bg-primary/5 rotate-45 opacity-20 animate-float" />
            </div>

            <div className="container py-16 md:py-24 relative">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        Estamos para Ayudarte
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold !font-headline leading-tight">
                        <TextReveal text="Contáctanos" />
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        ¿Tienes preguntas o quieres saber más sobre CAMEBOL? Escríbenos y te responderemos a la brevedad.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        {/* Bento Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* WhatsApp Card (Featured) */}
                            <Card className="sm:col-span-2 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-background border-green-200/50 dark:border-green-900/50 shadow-lg overflow-hidden group">
                                <CardContent className="p-6 md:p-8 flex items-center justify-between relative z-10">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3 text-green-700 dark:text-green-500 mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                                                <Phone className="w-6 h-6" />
                                            </div>
                                            <h3 className="text-xl font-semibold !font-headline">Chat Directo</h3>
                                        </div>
                                        <p className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                                            {FOOTER_DATA.whatsapp}
                                        </p>
                                        <p className="text-muted-foreground">O envíanos un mensaje por WhatsApp</p>
                                    </div>
                                    <Button size="lg" className="rounded-full shadow-md bg-green-600 hover:bg-green-700 text-white shrink-0 hidden sm:flex" asChild>
                                        <a href={`https://wa.me/${FOOTER_DATA.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                                            Iniciar Chat
                                        </a>
                                    </Button>
                                    <div className="absolute -right-12 -top-12 w-48 h-48 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-colors duration-500" />
                                </CardContent>
                            </Card>

                            {/* Email Card */}
                            <Card className="bg-background/60 backdrop-blur-sm border-0 ring-1 ring-white/10 shadow-md group">
                                <CardContent className="p-6 space-y-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary rotate-45 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                        <Mail className="w-5 h-5 -rotate-45" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Email</h4>
                                        <a href={`mailto:${FOOTER_DATA.email}`} className="text-muted-foreground hover:text-primary transition-colors block truncate">
                                            {FOOTER_DATA.email}
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Hours Card */}
                            <Card className="bg-background/60 backdrop-blur-sm border-0 ring-1 ring-white/10 shadow-md group">
                                <CardContent className="p-6 space-y-4">
                                    <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary rotate-45 group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                                        <Clock className="w-5 h-5 -rotate-45" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Horario</h4>
                                        <p className="text-muted-foreground text-sm">Lun - Vie: 8:30 a 18:30</p>
                                        <p className="text-muted-foreground text-sm">Sábados: 9:00 a 12:00</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Location / Map Card */}
                        <Card className="bg-background/60 backdrop-blur-sm border-0 ring-1 ring-white/10 shadow-xl overflow-hidden p-0">
                            <div className="p-6 border-b border-border/50 flex items-start justify-between">
                                <div>
                                    <h4 className="font-semibold flex items-center gap-2 mb-1">
                                        <MapPin className="w-4 h-4 text-primary" /> Dirección
                                    </h4>
                                    <p className="text-muted-foreground">{FOOTER_DATA.address}, Cochabamba</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 text-blue-600 hover:bg-blue-50" asChild>
                                        <a href="https://www.facebook.com/profile.php?id=100065638682964" target="_blank" rel="noopener noreferrer">
                                            <Facebook className="w-4 h-4" />
                                        </a>
                                    </Button>
                                    <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 text-[#E1306C] hover:bg-pink-50" asChild>
                                        <a href="https://www.instagram.com/camebol_cochabamba/" target="_blank" rel="noopener noreferrer">
                                            <Instagram className="w-4 h-4" />
                                        </a>
                                    </Button>
                                </div>
                            </div>
                            <div className="w-full h-[300px] bg-muted relative">
                                <iframe
                                    src="https://maps.google.com/maps?q=-17.368190,-66.180701&hl=es&z=17&output=embed"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={false}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Mapa de Ubicación: Calle Rigoberto Sainz N° 464, Cochabamba"
                                    className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-500"
                                ></iframe>
                            </div>
                        </Card>
                    </div>

                    {/* Contact Form */}
                    <Card className="bg-background/80 backdrop-blur-md border-0 shadow-2xl ring-1 ring-white/20 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
                        <CardHeader>
                            <CardTitle className="text-2xl !font-headline">Envíanos un Mensaje</CardTitle>
                            <CardDescription>Completa el formulario y nos pondremos en contacto contigo.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nombre Completo</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Tu nombre" {...field} className="bg-background/50 border-primary/20 focus:border-primary rounded-xl" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Correo Electrónico</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="tu@email.com" {...field} className="bg-background/50 border-primary/20 focus:border-primary rounded-xl" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="subject"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Asunto</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Motivo de tu mensaje" {...field} className="bg-background/50 border-primary/20 focus:border-primary rounded-xl" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Mensaje</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Escribe tu mensaje aquí..." {...field} className="bg-background/50 border-primary/20 focus:border-primary rounded-xl min-h-[120px]" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <MagneticButton>
                                        <Button type="submit" className="w-full rounded-full h-12 text-lg shadow-lg hover:shadow-xl transition-all" disabled={form.formState.isSubmitting}>
                                            {form.formState.isSubmitting ? 'Enviando...' : (
                                                <>
                                                    Enviar Mensaje <Send className="ml-2 w-4 h-4" />
                                                </>
                                            )}
                                        </Button>
                                    </MagneticButton>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <SectionDivider />
        </div>
    );
}
