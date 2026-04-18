import { cn } from "@/lib/utils";

interface SectionDividerProps {
    className?: string;
    position?: "top" | "bottom";
    fill?: string;
    showDiamond?: boolean;
}

export function SectionDivider({ className, position = "bottom", fill = "bg-background", showDiamond = true }: SectionDividerProps) {
    const isTop = position === "top";

    return (
        <div
            className={cn(
                "absolute left-0 w-full z-10 flex justify-center items-center pointer-events-none",
                isTop ? "-top-6" : "-bottom-6",
                className
            )}
        >
            {/* Diamond Tab */}
            {showDiamond && (
                <div className={cn(
                    "w-12 h-12 transform rotate-45 shadow-lg",
                    fill.replace('fill-', 'bg-')
                )} />
            )}
        </div>
    );
}
