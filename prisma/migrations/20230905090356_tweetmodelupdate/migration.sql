/*
  Warnings:

  - You are about to drop the column `postId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `Reaction` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToPost` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tweetId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tweetId` to the `Reaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_postId_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `Reaction` DROP FOREIGN KEY `Reaction_postId_fkey`;

-- DropForeignKey
ALTER TABLE `_CategoryToPost` DROP FOREIGN KEY `_CategoryToPost_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CategoryToPost` DROP FOREIGN KEY `_CategoryToPost_B_fkey`;

-- AlterTable
ALTER TABLE `Comment` DROP COLUMN `postId`,
    ADD COLUMN `tweetId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Reaction` DROP COLUMN `postId`,
    ADD COLUMN `tweetId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `Post`;

-- DropTable
DROP TABLE `_CategoryToPost`;

-- CreateTable
CREATE TABLE `Tweet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `authorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CategoryToTweet` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CategoryToTweet_AB_unique`(`A`, `B`),
    INDEX `_CategoryToTweet_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tweet` ADD CONSTRAINT `Tweet_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_tweetId_fkey` FOREIGN KEY (`tweetId`) REFERENCES `Tweet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reaction` ADD CONSTRAINT `Reaction_tweetId_fkey` FOREIGN KEY (`tweetId`) REFERENCES `Tweet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToTweet` ADD CONSTRAINT `_CategoryToTweet_A_fkey` FOREIGN KEY (`A`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToTweet` ADD CONSTRAINT `_CategoryToTweet_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tweet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
