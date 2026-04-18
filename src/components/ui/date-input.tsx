'use client';

import * as React from 'react';
import { CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DateInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    value?: string;
    onChange?: (value: string) => void;
}

/**
 * Input con máscara de fecha DD/MM/AAAA.
 * Auto-inserta las barras mientras el usuario escribe.
 */
const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
    ({ className, value = '', onChange, ...props }, ref) => {

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            let raw = e.target.value.replace(/\D/g, '');
            if (raw.length > 8) raw = raw.slice(0, 8);

            let formatted = '';
            if (raw.length > 0) formatted += raw.slice(0, 2);
            if (raw.length > 2) formatted += '/' + raw.slice(2, 4);
            if (raw.length > 4) formatted += '/' + raw.slice(4, 8);

            onChange?.(formatted);
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            // Allow backspace to remove separators naturally
            if (e.key === 'Backspace' && value) {
                const pos = (e.target as HTMLInputElement).selectionStart ?? 0;
                if (pos > 0 && value[pos - 1] === '/') {
                    e.preventDefault();
                    const newVal = value.slice(0, pos - 2) + value.slice(pos);
                    onChange?.(newVal);
                }
            }
        };

        return (
            <div className="relative">
                <input
                    ref={ref}
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    maxLength={10}
                    placeholder="DD/MM/AAAA"
                    value={value}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className={cn(
                        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                        className
                    )}
                    {...props}
                />
                <CalendarDays className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
        );
    }
);

DateInput.displayName = 'DateInput';

export { DateInput };
