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
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` ENUM('ADMIN', 'MODERATOR', 'USER_DEFAULT', 'USER_VERIFY', 'AUTHOR', 'CO_AUTHOR', 'DEV_VERIFY', 'DEV_POOL', 'QA_VERIFY', 'QA_DEFAULT', 'NONE') NOT NULL DEFAULT 'USER_DEFAULT',
    `login` VARCHAR(64) NOT NULL,
    `name` VARCHAR(32) NOT NULL,
    `surname` VARCHAR(32) NOT NULL,
    `email` VARCHAR(64) NOT NULL,
    `password` VARCHAR(512) NOT NULL,
    `is_verified` BOOLEAN NOT NULL DEFAULT false,
    `last_visited` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_login_key`(`login`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users_telegram_data` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `telegram_id` INTEGER UNSIGNED NOT NULL,
    `first_name` VARCHAR(64) NOT NULL,
    `username` VARCHAR(64) NOT NULL,
    `photo_url` VARCHAR(256) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_telegram_data_userId_key`(`userId`),
    UNIQUE INDEX `users_telegram_data_telegram_id_key`(`telegram_id`),
    INDEX `user_id_for_telegram_index`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users_telegram_data` ADD CONSTRAINT `users_telegram_data_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;
