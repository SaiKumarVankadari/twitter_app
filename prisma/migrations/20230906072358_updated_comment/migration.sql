/*
  Warnings:

  - Added the required column `updatedAt` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Comment` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `updatedContent` VARCHAR(191) NULL;
