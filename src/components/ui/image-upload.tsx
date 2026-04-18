"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Loader2, X } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    folder?: string;
}

export function ImageUpload({
    value,
    onChange,
    disabled,
    folder = "images",
}: ImageUploadProps) {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        setIsLoading(true);
        setProgress(0);
        setError(null);

        try {
            // Create form data
            const formData = new FormData();
            formData.append("file", file);
            formData.append("folder", folder);

            // Upload via server API route
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Upload failed");
            }

            const data = await response.json();
            onChange(data.url);
            setProgress(100);
        } catch (err: any) {
            console.error("Upload error:", err);
            setError(err.message || "Error al subir imagen");
        } finally {
            setIsLoading(false);
        }
    };

    const onRemove = () => {
        onChange("");
        setError(null);
    };

    return (
        <div className="space-y-4 w-full">
            {value ? (
                <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-md border bg-slate-100">
                    <button
                        onClick={onRemove}
                        className="absolute right-2 top-2 z-10 rounded-full bg-red-500 p-1 text-white shadow-sm hover:bg-red-600"
                        type="button"
                    >
                        <X className="h-4 w-4" />
                    </button>
                    <Image
                        src={value}
                        alt="Image"
                        fill
                        className="object-cover"
                    />
                </div>
            ) : (
                <div className="flex h-40 w-full max-w-sm flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-50 transition hover:bg-gray-100">
                    <label className="flex cursor-pointer flex-col items-center justify-center space-y-2">
                        {isLoading ? (
                            <>
                                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                                <div className="text-xs text-gray-500">Subiendo...</div>
                            </>
                        ) : (
                            <>
                                <ImageIcon className="h-8 w-8 text-gray-400" />
                                <span className="text-sm font-medium text-gray-600">
                                    Click para subir imagen
                                </span>
                            </>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={onUpload}
                            disabled={disabled || isLoading}
                        />
                    </label>
                </div>
            )}
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}
