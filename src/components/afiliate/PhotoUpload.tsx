'use client';

import React, { useRef, useState } from 'react';
import { Camera, Upload, X, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface PhotoUploadProps {
    value?: string;
    onChange: (url: string) => void;
}

export function PhotoUpload({ value, onChange }: PhotoUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(value || null);
    const { toast } = useToast();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Client-side validation
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
            toast({ variant: 'destructive', title: 'Formato no válido', description: 'Solo se permiten imágenes JPEG, PNG o WebP.' });
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            toast({ variant: 'destructive', title: 'Archivo muy grande', description: 'La imagen no debe exceder 5 MB.' });
            return;
        }

        // Show local preview immediately
        const localPreview = URL.createObjectURL(file);
        setPreview(localPreview);
        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/affiliate-upload', { method: 'POST', body: formData });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Error al subir la foto');
            }

            setPreview(data.url);
            onChange(data.url);
            toast({ title: 'Foto subida correctamente' });
        } catch (err) {
            setPreview(null);
            onChange('');
            toast({ variant: 'destructive', title: 'Error', description: err instanceof Error ? err.message : 'No se pudo subir la foto.' });
        } finally {
            setUploading(false);
            URL.revokeObjectURL(localPreview);
            // Reset input so same file can be re-selected
            if (inputRef.current) inputRef.current.value = '';
        }
    };

    const removePhoto = () => {
        setPreview(null);
        onChange('');
    };

    return (
        <Card className={cn(
            "relative flex flex-col items-center justify-center p-4 border-dashed cursor-pointer transition-colors hover:border-primary/50",
            preview ? "h-auto" : "h-48"
        )}
            onClick={() => !uploading && !preview && inputRef.current?.click()}
        >
            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleFileChange}
            />

            {uploading && (
                <div className="flex flex-col items-center gap-2 py-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">Subiendo foto...</p>
                </div>
            )}

            {!uploading && preview && (
                <div className="relative w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={preview}
                        alt="Foto tipo carnet"
                        className="w-full max-h-48 object-contain rounded-md"
                    />
                    <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-7 w-7"
                        onClick={(e) => { e.stopPropagation(); removePhoto(); }}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}

            {!uploading && !preview && (
                <>
                    <Camera className="w-10 h-10 text-muted-foreground mb-2" />
                    <p className="font-medium text-sm">Adjuntar Fotografía</p>
                    <p className="text-xs text-muted-foreground text-center mt-1">
                        Fotografía tipo carnet (JPEG, PNG o WebP, máx. 5 MB)
                    </p>
                    <Button type="button" variant="outline" size="sm" className="mt-3" onClick={() => inputRef.current?.click()}>
                        <Upload className="mr-2 h-4 w-4" />
                        Seleccionar imagen
                    </Button>
                </>
            )}
        </Card>
    );
}
