"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Member } from "@/lib/schemas/member"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mail, Linkedin, Briefcase } from "lucide-react"

interface MemberModalProps {
    member: Member | null
    isOpen: boolean
    onClose: () => void
}

export function MemberModal({ member, isOpen, onClose }: MemberModalProps) {
    if (!member) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] bg-background/95 backdrop-blur-xl border-white/20 p-0 overflow-hidden gap-0">

                {/* Header Background */}
                <div className="h-32 bg-gradient-to-r from-primary/20 to-secondary/20 relative">
                    <div className="absolute inset-0 bg-grid-white/10" />
                </div>

                <div className="px-6 pb-8 -mt-16 relative">
                    {/* Avatar */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="relative w-32 h-32 rounded-full border-4 border-background shadow-xl overflow-hidden mb-4 bg-background">
                            <Avatar className="w-full h-full">
                                <AvatarImage src={member.imageUrl || ''} className="object-cover" />
                                <AvatarFallback className="text-4xl font-bold bg-primary/10 text-primary">
                                    {member.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </div>

                        <div className="text-center space-y-1">
                            <DialogTitle className="text-2xl font-bold font-headline">{member.name}</DialogTitle>
                            <div className="flex items-center justify-center gap-2 text-muted-foreground font-medium">
                                <Badge variant="secondary" className="px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                                    {member.role}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Company & Bio */}
                        <div className="space-y-4">
                            {member.company && (
                                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                    <Briefcase className="w-4 h-4" />
                                    <span className="font-medium">{member.company}</span>
                                </div>
                            )}

                            {member.bio && (
                                <div className="text-center text-muted-foreground leading-relaxed px-4">
                                    &quot;{member.bio}&quot;
                                </div>
                            )}
                        </div>

                        <Separator />

                        {/* Contact Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {member.email && (
                                <a
                                    href={`mailto:${member.email}`}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-secondary/5 hover:bg-secondary/10 transition-colors border border-secondary/10 group"
                                >
                                    <div className="p-2 rounded-full bg-background shadow-sm group-hover:scale-110 transition-transform">
                                        <Mail className="w-4 h-4 text-primary" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Email</span>
                                        <span className="text-sm font-medium truncate">{member.email}</span>
                                    </div>
                                </a>
                            )}

                            {member.linkedIn && (
                                <a
                                    href={member.linkedIn}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-3 rounded-xl bg-blue-500/5 hover:bg-blue-500/10 transition-colors border border-blue-500/10 group"
                                >
                                    <div className="p-2 rounded-full bg-background shadow-sm group-hover:scale-110 transition-transform">
                                        <Linkedin className="w-4 h-4 text-[#0077b5]" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">LinkedIn</span>
                                        <span className="text-sm font-medium truncate">Ver Perfil</span>
                                    </div>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
