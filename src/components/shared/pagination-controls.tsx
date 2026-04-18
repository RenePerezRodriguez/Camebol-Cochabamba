import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { MagneticButton } from '@/components/ui/magnetic-button';

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const PaginationControls = ({ currentPage, totalPages, onPageChange }: PaginationControlsProps) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-6 mt-16">
            <MagneticButton>
                <Button
                    variant="outline"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="rounded-full px-6 border-white/10 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all disabled:opacity-50"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
                </Button>
            </MagneticButton>

            <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Página</span>
                <span className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-bold border border-primary/20 min-w-[3rem] text-center">
                    {currentPage}
                </span>
                <span className="text-sm font-medium text-muted-foreground">de {totalPages}</span>
            </div>

            <MagneticButton>
                <Button
                    variant="outline"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="rounded-full px-6 border-white/10 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all disabled:opacity-50"
                >
                    Siguiente <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </MagneticButton>
        </div>
    );
};
