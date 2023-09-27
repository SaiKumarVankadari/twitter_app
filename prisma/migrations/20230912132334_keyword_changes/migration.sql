/*
  Warnings:

  - You are about to drop the column `parentCommentId` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_parentCommentId_fkey`;

-- DropIndex
DROP INDEX `Reply_commentId_fkey` ON `Reply`;

-- AlterTable
ALTER TABLE `Comment` DROP COLUMN `parentCommentId`;

-- AddForeignKey
ALTER TABLE `Reply` ADD CONSTRAINT `Reply_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
