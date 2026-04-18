import { Wrench } from "lucide-react";

export default function MaintenancePage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center">
            <div className="rounded-full bg-white p-4 shadow-lg mb-6">
                <Wrench className="h-12 w-12 text-[#D61F69]" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-[#5B0F75] mb-4">
                Sitio en Mantenimiento
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
                Estamos realizando mejoras en nuestra plataforma para brindarte una mejor experiencia. Volveremos muy pronto.
            </p>
            <div className="mt-8 text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Camebol Cochabamba
            </div>
        </div>
    );
}
