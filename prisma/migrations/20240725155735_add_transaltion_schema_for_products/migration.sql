-- CreateTable
CREATE TABLE "translations" (
    "id" SERIAL NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "translations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "translations_id_key" ON "translations"("id");

-- CreateIndex
CREATE UNIQUE INDEX "translations_productId_locale_key" ON "translations"("productId", "locale");

-- AddForeignKey
ALTER TABLE "translations" ADD CONSTRAINT "translations_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
