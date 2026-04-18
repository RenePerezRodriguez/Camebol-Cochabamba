
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { TEAM_MEMBERS, type TeamMember } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { List, GitBranch, Linkedin, ExternalLink } from 'lucide-react';
import { SectionHeader } from '../layout/section-header';
import { MagneticButton } from '@/components/ui/magnetic-button';

const roleDescriptions: { [key: string]: string } = {
    'Presidenta': 'Lidera la dirección estratégica y representa a la organización a nivel nacional e internacional.',
    'Vicepresidenta': 'Apoya a la presidencia y asume sus funciones en su ausencia, co-liderando iniciativas clave.',
    'Secretaria General': 'Gestiona la documentación, actas y comunicaciones oficiales de la cámara.',
    'Tesorera': 'Supervisa la gestión financiera, presupuestos y recursos económicos de la organización.'
};

const MemberModalContent = ({ member }: { member: TeamMember }) => (
    <DialogContent className="sm:max-w-[425px] bg-white/90 backdrop-blur-xl border-primary/20">
        <DialogHeader>
            <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-primary/20 rotate-45 rounded-xl blur-md"></div>
                    <div className="w-24 h-24 mx-auto border-4 border-primary bg-white rotate-45 overflow-hidden shadow-lg rounded-xl relative z-10">
                        <Avatar className="h-full w-full rounded-none">
                            <AvatarImage src={member.image.imageUrl} alt={member.name} className="-rotate-45 scale-150 object-cover w-full h-full" />
                            <AvatarFallback className="-rotate-45">{member.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
                <DialogTitle className="text-2xl font-bold !font-headline mt-4">{member.name}</DialogTitle>
                <p className="text-lg text-primary font-medium">{member.role}</p>
            </div>
        </DialogHeader>
        <div className="py-4 text-center">
            <p className="text-muted-foreground">{member.bio}</p>
        </div>
        <div className="flex justify-center">
            <Button asChild className="rounded-full">
                <Link href={member.linkedinUrl} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" /> Ver en LinkedIn
                </Link>
            </Button>
        </div>
    </DialogContent>
);


const OrgNode = ({ member }: { member: TeamMember | undefined }) => {
    if (!member) return null;
    return (
        <Dialog>
            <TooltipProvider delayDuration={200}>
                <div className="relative flex flex-col items-center text-center group">
                    <DialogTrigger asChild>
                        <div className="cursor-pointer relative py-4">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rotate-45 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="w-24 h-24 mx-auto border-4 border-white shadow-lg bg-white rotate-45 overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:border-primary/50 rounded-2xl relative z-10">
                                <Avatar className="h-full w-full rounded-none">
                                    <AvatarImage src={member.image.imageUrl} alt={member.name} className="-rotate-45 scale-150 object-cover w-full h-full" />
                                    <AvatarFallback className="-rotate-45">{member.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>
                    </DialogTrigger>
                    <div className="text-center mt-6">
                        <DialogTrigger asChild>
                            <h3 className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors">{member.name}</h3>
                        </DialogTrigger>
                        <Tooltip>
                            <TooltipTrigger>
                                <p className="text-primary cursor-help underline-offset-4 hover:underline text-sm font-medium">{member.role}</p>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="max-w-xs">{roleDescriptions[member.role]}</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <Link href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="absolute top-0 right-0 p-2 bg-white shadow-md rounded-full translate-x-4 -translate-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:text-primary z-20" aria-label={`LinkedIn de ${member.name}`}>
                        <Linkedin className="w-4 h-4" />
                    </Link>
                </div>
            </TooltipProvider>
            <MemberModalContent member={member} />
        </Dialog>
    );
};

const OrgChartToggle = ({ view, setView }: { view: 'chart' | 'list', setView: (view: 'chart' | 'list') => void }) => (
    <div className="flex justify-center gap-2 mb-8">
        <Button variant={view === 'chart' ? 'default' : 'outline'} size="sm" onClick={() => setView('chart')}>
            <GitBranch className="mr-2 h-4 w-4" />
            Organigrama
        </Button>
        <Button variant={view === 'list' ? 'default' : 'outline'} size="sm" onClick={() => setView('list')}>
            <List className="mr-2 h-4 w-4" />
            Lista
        </Button>
    </div>
);

export function TeamSection() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [view, setView] = useState<'chart' | 'list'>('chart');

    const presidenta = TEAM_MEMBERS.find(m => m.role === 'Presidenta');
    const vicepresidenta = TEAM_MEMBERS.find(m => m.role === 'Vicepresidenta');
    const otrosMiembros = TEAM_MEMBERS.filter(m => m.role !== 'Presidenta' && m.role !== 'Vicepresidenta');

    return (
        <section id="directorio" className="py-16 md:py-24 bg-muted/30 relative overflow-hidden" ref={ref}>
            {/* Background Elements */}
            {/* Background Elements - Subtle */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/2 rotate-45 rounded-3xl blur-3xl"></div>
                <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-secondary/2 rotate-12 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/5 rotate-45 rounded-full opacity-20"></div>
            </div>

            <div className="container relative z-10">
                {/* ... (SectionHeader) */}

                {/* ... (OrgChartToggle) */}

                {inView && (
                    <>
                        {view === 'chart' && (
                            <div className="group flex flex-col items-center">
                                {/* ... (Chart structure remains, but lines might need styling) */}
                                {/* Presidenta */}
                                <div className="transition-opacity duration-300 group-hover:opacity-50 hover:!opacity-100 animate-fade-in opacity-0" style={{ animationDelay: '200ms' }}>
                                    <OrgNode member={presidenta} />
                                </div>

                                {/* Línea hacia abajo */}
                                <div className="w-[2px] h-16 bg-gradient-to-b from-primary/20 to-primary/50 mt-2 animate-draw-line-y" style={{ animationDelay: '400ms' }}></div>

                                {/* Vicepresidenta */}
                                <div className="transition-opacity duration-300 group-hover:opacity-50 hover:!opacity-100 animate-fade-in opacity-0" style={{ animationDelay: '600ms' }}>
                                    <OrgNode member={vicepresidenta} />
                                </div>

                                {/* Línea hacia abajo */}
                                <div className="w-[2px] h-16 bg-gradient-to-b from-primary/50 to-primary/20 mt-2 animate-draw-line-y" style={{ animationDelay: '800ms' }}></div>

                                {/* Línea horizontal */}
                                <div className="w-1/2 md:w-1/3 h-[2px] bg-primary/20 animate-draw-line-x" style={{ animationDelay: '1000ms' }}></div>

                                {/* Contenedor para otros miembros */}
                                <div className="flex justify-around w-full max-w-lg mt-[-1px]">
                                    {otrosMiembros.map((_, index) => (
                                        <div key={index} className="w-[2px] h-12 bg-primary/20 animate-draw-line-y" style={{ animationDelay: `${1100 + index * 100}ms` }}></div>
                                    ))}
                                </div>

                                <div className="flex justify-around w-full max-w-lg mt-2">
                                    {otrosMiembros.map((member, index) => (
                                        <div key={member.name} className="flex flex-col items-center w-1/2 md:w-1/3 px-2 transition-opacity duration-300 group-hover:opacity-50 hover:!opacity-100 animate-fade-in opacity-0" style={{ animationDelay: `${1300 + index * 150}ms` }}>
                                            <OrgNode member={member} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {view === 'list' && (
                            <div className="max-w-md mx-auto space-y-4">
                                {TEAM_MEMBERS.map((member, index) => (
                                    <Dialog key={member.name}>
                                        <DialogTrigger asChild>
                                            <div className="flex items-center gap-5 p-4 bg-white/60 backdrop-blur-sm border border-white/20 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:bg-white/80 animate-fade-in-down opacity-0 cursor-pointer group" style={{ animationDelay: `${index * 100}ms` }}>
                                                <div className="w-16 h-16 border-2 border-primary/20 bg-white rotate-45 overflow-hidden shadow-sm rounded-lg group-hover:border-primary/50 transition-colors">
                                                    <Avatar className="h-full w-full rounded-none">
                                                        <AvatarImage src={member.image.imageUrl} alt={member.name} className="-rotate-45 scale-150 object-cover w-full h-full" />
                                                        <AvatarFallback className="-rotate-45">{member.name.substring(0, 2)}</AvatarFallback>
                                                    </Avatar>
                                                </div>
                                                <div className="pl-4">
                                                    <h3 className="font-bold text-lg !font-headline group-hover:text-primary transition-colors">{member.name}</h3>
                                                    <p className="text-primary/80 text-sm font-medium">{member.role}</p>
                                                </div>
                                                <ExternalLink className="ml-auto h-5 w-5 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                                            </div>
                                        </DialogTrigger>
                                        <MemberModalContent member={member} />
                                    </Dialog>
                                ))}
                            </div>
                        )}
                    </>
                )}


                <div className="text-center mt-16">
                    <MagneticButton strength={0.1}>
                        <Button variant="secondary" asChild>
                            <Link href="/quienes-somos#directorio">Ver Directorio Completo</Link>
                        </Button>
                    </MagneticButton>
                </div>
            </div>
        </section>
    );
}
