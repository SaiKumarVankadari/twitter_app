-- DropForeignKey
ALTER TABLE `Reply` DROP FOREIGN KEY `Reply_authorId_fkey`;

-- AlterTable
ALTER TABLE `Reply` MODIFY `authorId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Reply` ADD CONSTRAINT `Reply_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
