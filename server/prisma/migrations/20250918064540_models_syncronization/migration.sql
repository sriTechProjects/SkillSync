-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "isProfileComplete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'USER',
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "username" DROP NOT NULL;

-- CreateTable
CREATE TABLE "public"."CategorySuggestion" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CategorySuggestion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."CategorySuggestion" ADD CONSTRAINT "CategorySuggestion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
