import { NextRequest, NextResponse } from "next/server";
import { adminStorage } from "@/lib/firebase-admin";
import sharp from "sharp";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(request: NextRequest) {
    try {
        if (!adminStorage) {
            return NextResponse.json({ error: "Storage not configured" }, { status: 500 });
        }

        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        if (!ALLOWED_TYPES.includes(file.type)) {
            return NextResponse.json({ error: "Solo se permiten imágenes JPEG, PNG o WebP." }, { status: 400 });
        }

        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json({ error: "La imagen no debe exceder 5 MB." }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const inputBuffer = Buffer.from(bytes);

        // Compress to WebP, resize to passport photo dimensions
        const compressedBuffer = await sharp(inputBuffer)
            .resize(600, 800, {
                fit: "inside",
                withoutEnlargement: true,
            })
            .webp({ quality: 85 })
            .toBuffer();

        const timestamp = Date.now();
        const fileName = `${timestamp}-foto-carnet.webp`;
        const filePath = `affiliations/photos/${fileName}`;

        const bucket = adminStorage.bucket();
        const fileRef = bucket.file(filePath);

        await fileRef.save(compressedBuffer, {
            metadata: { contentType: "image/webp" },
        });

        await fileRef.makePublic();
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;

        return NextResponse.json({ url: publicUrl });
    } catch (error) {
        console.error("Affiliate photo upload error:", error);
        return NextResponse.json({ error: "Error al subir la foto." }, { status: 500 });
    }
}
