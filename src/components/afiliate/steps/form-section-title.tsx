import React from 'react';

export const FormSectionTitle = ({ title }: { title: string }) => (
    <div className="my-8 relative">
        <div className="flex items-center justify-center">
            <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent flex-grow max-w-[100px]"></div>
            <div className="mx-4 relative">
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary/20 rotate-45"></div>
                <h3 className="text-lg md:text-xl font-semibold !font-headline text-center text-primary relative z-10 px-2">
                    {title}
                </h3>
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary/20 rotate-45"></div>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent flex-grow max-w-[100px]"></div>
        </div>
    </div>
);
