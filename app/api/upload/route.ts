import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { error: "No se ha proporcionado ningún archivo" },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${randomUUID()}-${file.name.replace(/\s+/g, "-")}`;
        const relativePath = `/uploads/${filename}`;
        const absolutePath = path.join(process.cwd(), "public", "uploads", filename);
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        await mkdir(uploadDir, { recursive: true });

        await writeFile(absolutePath, buffer);

        return NextResponse.json({ url: relativePath });
    } catch (error) {
        console.error("Error al subir archivo:", error);
        return NextResponse.json(
            { error: "Error interno al subir el archivo" },
            { status: 500 }
        );
    }
}
