import { NextRequest, NextResponse } from "next/server";
import { adminStorage } from "@/lib/firebase-admin";
import { requireAdmin } from "@/lib/session";
import sharp from "sharp";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST(request: NextRequest) {
    try {
        // Verify admin session
        await requireAdmin();

        if (!adminStorage) {
            return NextResponse.json({ error: "Storage not configured" }, { status: 500 });
        }

        const formData = await request.formData();
        const file = formData.get("file") as File;
        const folder = formData.get("folder") as string || "images";

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Validate file type
        if (!ALLOWED_TYPES.includes(file.type)) {
            return NextResponse.json({ error: "Tipo de archivo no permitido. Solo imágenes (JPEG, PNG, WebP, GIF, AVIF)." }, { status: 400 });
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json({ error: "El archivo excede el límite de 10 MB." }, { status: 400 });
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const inputBuffer = Buffer.from(bytes);

        // Compress and convert to WebP
        const compressedBuffer = await sharp(inputBuffer)
            .resize(1920, 1080, {
                fit: "inside",
                withoutEnlargement: true,
            })
            .webp({
                quality: 80,
                effort: 4,
            })
            .toBuffer();

        // Generate unique filename with .webp extension
        const timestamp = Date.now();
        const originalName = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
        const safeName = originalName.replace(/[^a-zA-Z0-9.-]/g, "_");
        const fileName = `${timestamp}-${safeName}.webp`;
        const filePath = `${folder}/${fileName}`;

        // Get bucket and upload
        const bucket = adminStorage.bucket();
        const fileRef = bucket.file(filePath);

        await fileRef.save(compressedBuffer, {
            metadata: {
                contentType: "image/webp",
            },
        });

        // Make file public and get URL
        await fileRef.makePublic();
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;

        return NextResponse.json({
            url: publicUrl,
            originalSize: inputBuffer.length,
            compressedSize: compressedBuffer.length,
            compressionRatio: Math.round((1 - compressedBuffer.length / inputBuffer.length) * 100) + "%"
        });
    } catch (error: unknown) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Error al subir el archivo" }, { status: 500 });
    }
}
