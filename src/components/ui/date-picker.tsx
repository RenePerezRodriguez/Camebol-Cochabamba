'use client';

import * as React from 'react';
import { format, parse, isValid } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarDays } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DatePickerProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    /** Earliest selectable year */
    fromYear?: number;
    /** Latest selectable year */
    toYear?: number;
}

function DatePicker({
    value,
    onChange,
    placeholder = 'Selecciona una fecha',
    disabled,
    fromYear = 1950,
    toYear = new Date().getFullYear(),
}: DatePickerProps) {
    const [open, setOpen] = React.useState(false);

    // Parse DD/MM/YYYY string to Date
    const selectedDate = React.useMemo(() => {
        if (!value) return undefined;
        const parsed = parse(value, 'dd/MM/yyyy', new Date());
        return isValid(parsed) ? parsed : undefined;
    }, [value]);

    // Default month to show in calendar
    const defaultMonth = selectedDate ?? new Date();

    const handleSelect = (date: Date | undefined) => {
        if (date) {
            onChange?.(format(date, 'dd/MM/yyyy'));
        } else {
            onChange?.('');
        }
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    disabled={disabled}
                    className={cn(
                        'w-full justify-start text-left font-normal h-10',
                        !value && 'text-muted-foreground'
                    )}
                >
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {selectedDate
                        ? format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: es })
                        : placeholder}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleSelect}
                    defaultMonth={defaultMonth}
                    captionLayout="dropdown-buttons"
                    fromYear={fromYear}
                    toYear={toYear}
                    locale={es}
                />
            </PopoverContent>
        </Popover>
    );
}

export { DatePicker };
