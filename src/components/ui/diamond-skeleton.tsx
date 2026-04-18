import { cn } from "@/lib/utils"

function DiamondSkeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-muted relative overflow-hidden", className)}
            {...props}
        >
            {/* Diamond Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
        </div>
    )
}

export { DiamondSkeleton }
