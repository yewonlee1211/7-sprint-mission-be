/*
  Warnings:

  - You are about to drop the `AComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AHeart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PHeart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AComment" DROP CONSTRAINT "AComment_articleId_fkey";

-- DropForeignKey
ALTER TABLE "AComment" DROP CONSTRAINT "AComment_userId_fkey";

-- DropForeignKey
ALTER TABLE "AHeart" DROP CONSTRAINT "AHeart_articleId_fkey";

-- DropForeignKey
ALTER TABLE "AHeart" DROP CONSTRAINT "AHeart_userId_fkey";

-- DropForeignKey
ALTER TABLE "PComment" DROP CONSTRAINT "PComment_productId_fkey";

-- DropForeignKey
ALTER TABLE "PComment" DROP CONSTRAINT "PComment_userId_fkey";

-- DropForeignKey
ALTER TABLE "PHeart" DROP CONSTRAINT "PHeart_productId_fkey";

-- DropForeignKey
ALTER TABLE "PHeart" DROP CONSTRAINT "PHeart_userId_fkey";

-- DropTable
DROP TABLE "AComment";

-- DropTable
DROP TABLE "AHeart";

-- DropTable
DROP TABLE "PComment";

-- DropTable
DROP TABLE "PHeart";

-- CreateTable
CREATE TABLE "ProductComment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticleComment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArticleComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductHeart" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "canceled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductHeart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticleHeart" (
    "id" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "canceled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArticleHeart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductComment" ADD CONSTRAINT "ProductComment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductComment" ADD CONSTRAINT "ProductComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleComment" ADD CONSTRAINT "ArticleComment_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleComment" ADD CONSTRAINT "ArticleComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductHeart" ADD CONSTRAINT "ProductHeart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductHeart" ADD CONSTRAINT "ProductHeart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleHeart" ADD CONSTRAINT "ArticleHeart_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleHeart" ADD CONSTRAINT "ArticleHeart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
