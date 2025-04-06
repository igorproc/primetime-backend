/*
  Warnings:

  - You are about to drop the `watch_history` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `watch_history` DROP FOREIGN KEY `watch_history_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `watch_history` DROP FOREIGN KEY `watch_history_watch_content_id_fkey`;

-- DropTable
DROP TABLE `watch_history`;

-- CreateTable
CREATE TABLE `user_watch_history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `watch_content_id` INTEGER NOT NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_watch_history` ADD CONSTRAINT `user_watch_history_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_watch_history` ADD CONSTRAINT `user_watch_history_watch_content_id_fkey` FOREIGN KEY (`watch_content_id`) REFERENCES `watchs_content`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
