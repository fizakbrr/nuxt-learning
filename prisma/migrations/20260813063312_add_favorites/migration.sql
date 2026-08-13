-- CreateTable
CREATE TABLE "Favorite" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "categorySlug" TEXT NOT NULL,
    "recipeSlug" TEXT NOT NULL,
    "favorited" BOOLEAN NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userId_categorySlug_recipeSlug_key" ON "Favorite"("userId", "categorySlug", "recipeSlug");

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_categorySlug_recipeSlug_fkey" FOREIGN KEY ("categorySlug", "recipeSlug") REFERENCES "Recipe"("categorySlug", "slug") ON DELETE CASCADE ON UPDATE CASCADE;
