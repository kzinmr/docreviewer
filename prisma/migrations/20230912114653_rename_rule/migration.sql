/*
  Warnings:

  - You are about to drop the column `ruleId` on the `Logic` table. All the data in the column will be lost.
  - You are about to drop the `Rule` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[reviewPointId]` on the table `Logic` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `reviewPointId` to the `Logic` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Logic" DROP CONSTRAINT "Logic_ruleId_fkey";

-- DropForeignKey
ALTER TABLE "Rule" DROP CONSTRAINT "Rule_playbookId_fkey";

-- DropIndex
DROP INDEX "Logic_ruleId_key";

-- AlterTable
ALTER TABLE "Logic" DROP COLUMN "ruleId",
ADD COLUMN     "reviewPointId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Rule";

-- CreateTable
CREATE TABLE "ReviewPoint" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logicId" INTEGER,
    "playbookId" INTEGER NOT NULL,

    CONSTRAINT "ReviewPoint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Logic_reviewPointId_key" ON "Logic"("reviewPointId");

-- AddForeignKey
ALTER TABLE "ReviewPoint" ADD CONSTRAINT "ReviewPoint_playbookId_fkey" FOREIGN KEY ("playbookId") REFERENCES "Playbook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logic" ADD CONSTRAINT "Logic_reviewPointId_fkey" FOREIGN KEY ("reviewPointId") REFERENCES "ReviewPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
