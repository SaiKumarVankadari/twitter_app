/*
  Warnings:

  - You are about to drop the column `authorId` on the `Reply` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Reply` DROP FOREIGN KEY `Reply_authorId_fkey`;

-- AlterTable
ALTER TABLE `Reply` DROP COLUMN `authorId`,
    ADD COLUMN `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Reply` ADD CONSTRAINT `Reply_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
