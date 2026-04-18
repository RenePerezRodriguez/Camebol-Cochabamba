import { EventForm } from "@/components/admin/event-form";

export const dynamic = "force-dynamic";

export default function NewEventPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Crear Nuevo Evento</h3>
                <p className="text-sm text-muted-foreground">Complete los detalles del evento.</p>
            </div>
            <EventForm />
        </div>
    );
}
