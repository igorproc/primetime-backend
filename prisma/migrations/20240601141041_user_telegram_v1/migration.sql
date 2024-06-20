/*
  Warnings:

  - You are about to alter the column `owner_uid` on the `applications` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - The `created_at` column on the `applications` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `applications` MODIFY `owner_uid` INTEGER UNSIGNED NOT NULL,
    DROP COLUMN `created_at`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `devices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `client_id` VARCHAR(191) NOT NULL,
    `platform` ENUM('WINDOWS', 'LINUX', 'ANDROID', 'IPHONE', 'IPAD', 'MACINTOSH') NOT NULL,
    `ip` VARCHAR(13) NOT NULL,
    `user_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `devices_client_id_key`(`client_id`),
    INDEX `devices_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL,
    `role` ENUM('ADMIN', 'MODERATOR', 'USER_DEFAULT', 'USER_VERIFY', 'AUTHOR', 'CO_AUTHOR', 'DEV_VERIFY', 'DEV_POOL', 'QA_VERIFY', 'QA_DEFAULT', 'NONE') NOT NULL DEFAULT 'USER_DEFAULT',
    `first_name` VARCHAR(64) NOT NULL,
    `login` VARCHAR(64) NOT NULL,
    `photo_url` VARCHAR(191) NOT NULL,
    `last_visited` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_login_key`(`login`),
    UNIQUE INDEX `users_photo_url_key`(`photo_url`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `devices` ADD CONSTRAINT `devices_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;
