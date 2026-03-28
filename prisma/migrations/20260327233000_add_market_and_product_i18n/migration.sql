-- CreateEnum
CREATE TYPE "Market" AS ENUM ('RD', 'US');

-- AlterTable
ALTER TABLE "Product"
ADD COLUMN "title_es" TEXT,
ADD COLUMN "title_en" TEXT,
ADD COLUMN "description_es" TEXT,
ADD COLUMN "description_en" TEXT,
ADD COLUMN "availableMarkets" "Market"[];

-- Backfill existing products for compatibility
UPDATE "Product"
SET "availableMarkets" = ARRAY['RD', 'US']::"Market"[]
WHERE "availableMarkets" IS NULL
   OR cardinality("availableMarkets") = 0;

-- Enforce defaults for new records
ALTER TABLE "Product"
ALTER COLUMN "availableMarkets" SET DEFAULT ARRAY['RD', 'US']::"Market"[],
ALTER COLUMN "availableMarkets" SET NOT NULL;