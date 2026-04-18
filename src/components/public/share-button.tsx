"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ShareButtonProps {
    title: string;
    text: string;
    url?: string;
}

export function ShareButton({ title, text, url }: ShareButtonProps) {
    const [copied, setCopied] = useState(false);
    const { toast } = useToast();

    const handleShare = async () => {
        const shareData = {
            title,
            text,
            url: url || window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (_) {
                // User cancelled share dialog or share failed
            }
        } else {
            // Fallback: Copy to clipboard
            try {
                await navigator.clipboard.writeText(shareData.url);
                setCopied(true);
                toast({
                    title: "Enlace copiado",
                    description: "El enlace de la noticia ha sido copiado al portapapeles.",
                });
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error("Failed to copy", err);
            }
        }
    };

    return (
        <button 
            onClick={handleShare}
            className="p-2.5 rounded-full bg-slate-100 text-slate-600 hover:bg-brand-pink hover:text-white transition-all duration-300 shadow-sm group relative"
            title="Compartir noticia"
        >
            {copied ? (
                <Check className="w-5 h-5 text-green-500 group-hover:text-white" />
            ) : (
                <Share2 className="w-5 h-5" />
            )}
        </button>
    );
}
