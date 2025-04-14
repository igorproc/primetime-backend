/*
  Warnings:

  - You are about to drop the column `first_name` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `devices` DROP FOREIGN KEY `devices_user_id_fkey`;
ALTER TABLE `tokens` DROP FOREIGN KEY `tokens_user_id_fkey`;
ALTER TABLE `watch_history` DROP FOREIGN KEY `watch_history_user_id_fkey`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `first_name`,
    ADD COLUMN `display_name` VARCHAR(128) NULL,
    ADD COLUMN `email` VARCHAR(128) NULL,
    ADD COLUMN `telegram_id` INTEGER UNSIGNED NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;

-- CreateTable
CREATE TABLE `site_settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(128) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `site_settings_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `devices` ADD CONSTRAINT `devices_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `tokens` ADD CONSTRAINT `tokens_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `watch_history` ADD CONSTRAINT `watch_history_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
