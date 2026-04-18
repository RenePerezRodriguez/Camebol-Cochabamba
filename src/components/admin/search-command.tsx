"use client";

import * as React from "react";
import {
    Calendar,
    CreditCard,
    LayoutDashboard,
    Plus,
    Settings,
    User,
    Users,
    Search,
    FileText,
    Newspaper
} from "lucide-react";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { DialogProps } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SearchCommand() {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false);
        command();
    }, []);

    return (
        <>
            <Button
                variant="outline"
                className={cn(
                    "relative h-9 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
                )}
                onClick={() => setOpen(true)}
            >
                <span className="hidden lg:inline-flex">Buscar...</span>
                <span className="inline-flex lg:hidden">Buscar...</span>
                <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Escribe un comando o busca..." />
                <CommandList>
                    <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                    <CommandGroup heading="Navegación">
                        <CommandItem onSelect={() => runCommand(() => router.push("/admin"))}>
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push("/admin/eventos"))}>
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>Eventos</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push("/admin/directorio"))}>
                            <Users className="mr-2 h-4 w-4" />
                            <span>Directorio</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push("/admin/afiliaciones"))}>
                            <FileText className="mr-2 h-4 w-4" />
                            <span>Afiliaciones</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push("/admin/noticias"))}>
                            <Newspaper className="mr-2 h-4 w-4" />
                            <span>Noticias</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Acciones Rápidas">
                        <CommandItem onSelect={() => runCommand(() => router.push("/admin/eventos/nuevo"))}>
                            <Plus className="mr-2 h-4 w-4" />
                            <span>Crear Nuevo Evento</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push("/admin/directorio/nuevo"))}>
                            <Plus className="mr-2 h-4 w-4" />
                            <span>Registrar Nueva Socia</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push("/admin/noticias/nuevo"))}>
                            <Plus className="mr-2 h-4 w-4" />
                            <span>Nueva Noticia</span>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
