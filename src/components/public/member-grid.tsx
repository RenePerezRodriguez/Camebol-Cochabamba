"use client"

import { useState } from "react"
import { Member } from "@/lib/schemas/member"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MemberModal } from "./member-modal"
import { cn } from "@/lib/utils"

interface MemberGridProps {
    members: Member[]
    variant?: "primary" | "secondary"
}

export function MemberGrid({ members, variant = "primary" }: MemberGridProps) {
    const [selectedMember, setSelectedMember] = useState<Member | null>(null)

    const gradientFrom = variant === "primary" ? "from-primary" : "from-secondary"
    const gradientTo = variant === "primary" ? "to-secondary" : "to-primary"
    const bgBadge = variant === "primary" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
    const hoverText = variant === "primary" ? "group-hover:text-primary" : "group-hover:text-secondary"

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {members.map((member, index) => {
                    const imageUrl = member.imageUrl || ''
                    return (
                        <Card
                            key={member.id}
                            className={cn(
                                "group text-center border-0 shadow-lg bg-background/60 backdrop-blur-md ring-1 ring-white/20 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer",
                            )}
                            style={{ animationDelay: `${index * 100}ms` }}
                            onClick={() => setSelectedMember(member)}
                        >
                            <CardContent className="pt-8 pb-8 px-6">
                                <div className="relative w-32 h-32 mx-auto mb-6">
                                    <div className={cn("absolute inset-0 bg-gradient-to-br rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-20 blur-lg", gradientFrom, gradientTo)}></div>
                                    <div className="relative w-full h-full bg-background rounded-3xl rotate-3 group-hover:rotate-0 transition-transform duration-500 overflow-hidden border-2 border-white/20 shadow-inner">
                                        <Avatar className="w-full h-full rounded-none">
                                            <AvatarImage src={imageUrl} alt={member.name} className="object-cover" />
                                            <AvatarFallback className={cn("rounded-none text-2xl font-bold", bgBadge)}>
                                                {member.name.substring(0, 2)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>
                                </div>

                                <h3 className={cn("text-xl font-bold !font-headline mb-1 transition-colors", hoverText)}>{member.name}</h3>
                                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 line-clamp-2 min-h-[40px]">{member.role}</p>
                                <div className={cn("w-8 h-1 bg-gradient-to-r mx-auto rounded-full opacity-50 group-hover:opacity-100 group-hover:w-16 transition-all duration-300", gradientFrom, gradientTo)} />
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            <MemberModal
                member={selectedMember}
                isOpen={!!selectedMember}
                onClose={() => setSelectedMember(null)}
            />
        </>
    )
}
