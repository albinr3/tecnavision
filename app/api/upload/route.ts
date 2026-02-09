import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

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
        const filename = `${uuidv4()}-${file.name.replace(/\s+/g, "-")}`;
        const relativePath = `/uploads/${filename}`;
        const absolutePath = path.join(process.cwd(), "public", "uploads", filename);

        // Ensure uploads directory exists
        // (writeFile will throw if the directory doesn't exist, normally we'd mkdir -p)
        // Let's assume public/uploads exists or create it.
        const fs = require('fs');
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

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
