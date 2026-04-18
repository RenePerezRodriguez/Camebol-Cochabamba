import { Button } from '@/components/ui/button';
import { LayoutGrid, List, Calendar as CalendarIcon } from 'lucide-react';

export type ViewMode = 'grid' | 'list' | 'calendar';

interface ViewSwitcherProps {
    view: ViewMode;
    setView: (view: any) => void;
    modes?: ViewMode[];
}

export function ViewSwitcher({ view, setView, modes = ['grid', 'list'] }: ViewSwitcherProps) {
    return (
        <div className="flex items-center gap-2">
            {modes.includes('grid') && (
                <Button
                    variant={view === 'grid' ? 'secondary' : 'ghost'}
                    size="icon"
                    onClick={() => setView('grid')}
                    aria-label="Vista de cuadrícula"
                >
                    <LayoutGrid className="h-5 w-5" />
                </Button>
            )}
            {modes.includes('list') && (
                <Button
                    variant={view === 'list' ? 'secondary' : 'ghost'}
                    size="icon"
                    onClick={() => setView('list')}
                    aria-label="Vista de lista"
                >
                    <List className="h-5 w-5" />
                </Button>
            )}
            {modes.includes('calendar') && (
                <Button
                    variant={view === 'calendar' ? 'secondary' : 'ghost'}
                    size="icon"
                    onClick={() => setView('calendar')}
                    aria-label="Vista de calendario"
                >
                    <CalendarIcon className="h-5 w-5" />
                </Button>
            )}
        </div>
    );
}
