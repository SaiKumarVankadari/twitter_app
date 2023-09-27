/*
  Warnings:

  - Made the column `userId` on table `Reply` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Reply` DROP FOREIGN KEY `Reply_userId_fkey`;

-- AlterTable
ALTER TABLE `Reply` MODIFY `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Reply` ADD CONSTRAINT `Reply_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
