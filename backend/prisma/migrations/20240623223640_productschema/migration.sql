/*
  Warnings:

  - You are about to drop the `ProductCatalogs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductCategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductCatalogs" DROP CONSTRAINT "ProductCatalogs_catalogId_fkey";

-- DropForeignKey
ALTER TABLE "ProductCatalogs" DROP CONSTRAINT "ProductCatalogs_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductCategories" DROP CONSTRAINT "ProductCategories_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ProductCategories" DROP CONSTRAINT "ProductCategories_productId_fkey";

-- DropTable
DROP TABLE "ProductCatalogs";

-- DropTable
DROP TABLE "ProductCategories";

-- CreateTable
CREATE TABLE "ProductCategory" (
    "productId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("productId","categoryId")
);

-- CreateTable
CREATE TABLE "ProductCatalog" (
    "productId" TEXT NOT NULL,
    "catalogId" TEXT NOT NULL,

    CONSTRAINT "ProductCatalog_pkey" PRIMARY KEY ("productId","catalogId")
);

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCatalog" ADD CONSTRAINT "ProductCatalog_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCatalog" ADD CONSTRAINT "ProductCatalog_catalogId_fkey" FOREIGN KEY ("catalogId") REFERENCES "Catalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
