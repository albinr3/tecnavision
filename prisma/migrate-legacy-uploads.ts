import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { UTApi, UTFile } from "uploadthing/server";

type ProductRecord = {
  id: string;
  slug: string;
  mainImage: string | null;
  nightVisionImg: string | null;
  appDemoImg: string | null;
  galleryImages: string[];
};

const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);

function isLegacyUploadPath(value: string | null | undefined): value is string {
  return typeof value === "string" && value.startsWith("/uploads/");
}

async function fileExists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  console.log("🖼️  Migrating legacy /uploads images to UploadThing...");
  console.log(`Mode: ${isDryRun ? "DRY RUN (no upload, no DB updates)" : "APPLY CHANGES"}`);

  const products = (await prisma.product.findMany({
    select: {
      id: true,
      slug: true,
      mainImage: true,
      nightVisionImg: true,
      appDemoImg: true,
      galleryImages: true,
    },
  })) as ProductRecord[];

  const referencedLegacyPaths = new Set<string>();
  for (const product of products) {
    if (isLegacyUploadPath(product.mainImage)) referencedLegacyPaths.add(product.mainImage);
    if (isLegacyUploadPath(product.nightVisionImg)) referencedLegacyPaths.add(product.nightVisionImg);
    if (isLegacyUploadPath(product.appDemoImg)) referencedLegacyPaths.add(product.appDemoImg);
    for (const img of product.galleryImages || []) {
      if (isLegacyUploadPath(img)) referencedLegacyPaths.add(img);
    }
  }

  if (referencedLegacyPaths.size === 0) {
    console.log("✅ No legacy /uploads references found in Product records.");
    return;
  }

  console.log(`Found ${referencedLegacyPaths.size} unique legacy image path(s).`);

  const existingFiles = new Map<string, string>();
  const missingFiles: string[] = [];
  for (const legacyPath of referencedLegacyPaths) {
    const normalizedRelative = legacyPath.replace(/^\//, "");
    const absolutePath = path.join(process.cwd(), "public", normalizedRelative);
    if (await fileExists(absolutePath)) {
      existingFiles.set(legacyPath, absolutePath);
    } else {
      missingFiles.push(legacyPath);
    }
  }

  if (missingFiles.length > 0) {
    console.log(`⚠️ Missing local files for ${missingFiles.length} path(s):`);
    for (const missing of missingFiles) console.log(`   - ${missing}`);
  }

  if (isDryRun) {
    console.log(`Would upload ${existingFiles.size} file(s) to UploadThing.`);
    console.log("Dry run complete.");
    return;
  }

  if (!process.env.UPLOADTHING_TOKEN) {
    throw new Error("Missing UPLOADTHING_TOKEN in .env");
  }

  const utapi = new UTApi({ token: process.env.UPLOADTHING_TOKEN });
  const legacyToPublicUrl = new Map<string, string>();
  const uploadFailures: string[] = [];

  let processed = 0;
  for (const [legacyPath, absolutePath] of existingFiles.entries()) {
    processed += 1;
    process.stdout.write(`Uploading ${processed}/${existingFiles.size}: ${legacyPath} ... `);
    try {
      const buffer = await fs.readFile(absolutePath);
      const filename = path.basename(absolutePath);
      const file = new UTFile([buffer], filename);
      const result = await utapi.uploadFiles(file);
      if (result.error || !result.data?.ufsUrl) {
        uploadFailures.push(legacyPath);
        console.log("FAILED");
        continue;
      }
      legacyToPublicUrl.set(legacyPath, result.data.ufsUrl);
      console.log("OK");
    } catch {
      uploadFailures.push(legacyPath);
      console.log("FAILED");
    }
  }

  let updatedProducts = 0;
  for (const product of products) {
    const nextMainImage =
      product.mainImage && legacyToPublicUrl.has(product.mainImage)
        ? legacyToPublicUrl.get(product.mainImage)!
        : product.mainImage;
    const nextNightVisionImg =
      product.nightVisionImg && legacyToPublicUrl.has(product.nightVisionImg)
        ? legacyToPublicUrl.get(product.nightVisionImg)!
        : product.nightVisionImg;
    const nextAppDemoImg =
      product.appDemoImg && legacyToPublicUrl.has(product.appDemoImg)
        ? legacyToPublicUrl.get(product.appDemoImg)!
        : product.appDemoImg;
    const nextGalleryImages = (product.galleryImages || []).map((img) =>
      legacyToPublicUrl.get(img) ?? img
    );

    const changed =
      nextMainImage !== product.mainImage ||
      nextNightVisionImg !== product.nightVisionImg ||
      nextAppDemoImg !== product.appDemoImg ||
      nextGalleryImages.some((value, index) => value !== (product.galleryImages || [])[index]);

    if (!changed) continue;

    await prisma.product.update({
      where: { id: product.id },
      data: {
        mainImage: nextMainImage,
        nightVisionImg: nextNightVisionImg,
        appDemoImg: nextAppDemoImg,
        galleryImages: nextGalleryImages,
      },
    });
    updatedProducts += 1;
  }

  console.log("-----");
  console.log(`Uploaded: ${legacyToPublicUrl.size}`);
  console.log(`Upload failures: ${uploadFailures.length}`);
  console.log(`Products updated: ${updatedProducts}`);
  console.log(`Missing local files: ${missingFiles.length}`);
  console.log("✅ Migration finished.");
}

main()
  .catch((error) => {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
