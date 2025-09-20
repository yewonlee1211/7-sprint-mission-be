/*
  Warnings:

  - A unique constraint covering the columns `[articleId,userId]` on the table `ArticleHeart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId,userId]` on the table `ProductHeart` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ArticleHeart_articleId_userId_key" ON "ArticleHeart"("articleId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductHeart_productId_userId_key" ON "ProductHeart"("productId", "userId");
