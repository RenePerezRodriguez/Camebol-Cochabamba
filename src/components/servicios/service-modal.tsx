'use client';

import * as React from 'react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import * as Icons from 'lucide-react';
import type { Service } from '@/lib/data';

type IconName = keyof typeof Icons;

const getIcon = (name: string): React.ComponentType<{ className?: string }> => {
    const icon = Icons[name as IconName] as React.ComponentType<{ className?: string }>;
    return icon || Icons.AlertCircle;
};

interface ServiceModalProps {
    service: Service;
    children: React.ReactNode;
}

export const ServiceModal = ({ service, children }: ServiceModalProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-start gap-4">
                        <div className="relative w-14 h-14 shrink-0 mt-1">
                            <div className="absolute inset-0 bg-primary/10 rotate-45 rounded-lg" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                {React.createElement(getIcon(service.icon), { className: "w-7 h-7 text-primary" })}
                            </div>
                        </div>
                        <div>
                            <DialogTitle className="text-xl !font-headline leading-tight">{service.title}</DialogTitle>
                            <DialogDescription className="mt-2 text-sm">{service.description}</DialogDescription>
                        </div>
                    </div>
                </DialogHeader>
                {service.details && service.details.length > 0 && (
                    <div className="py-4">
                        <h4 className="font-semibold mb-3">Beneficios Incluidos:</h4>
                        <ul className="space-y-3">
                            {service.details.map((detail, detailIndex) => (
                                <li key={detailIndex} className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 mr-3 mt-0.5 text-secondary flex-shrink-0" />
                                    <span className="text-muted-foreground text-sm">{detail}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <DialogFooter className="sm:justify-start gap-2">
                    <Button asChild>
                        <Link href="/afiliate">
                            Únete a CAMEBOL <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </Button>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Cerrar
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
