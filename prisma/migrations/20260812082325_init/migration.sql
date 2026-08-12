-- CreateTable
CREATE TABLE "Category" (
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "cookTime" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ingredients" TEXT[],
    "steps" TEXT[],
    "categorySlug" TEXT NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("categorySlug","slug")
);

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_categorySlug_fkey" FOREIGN KEY ("categorySlug") REFERENCES "Category"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
