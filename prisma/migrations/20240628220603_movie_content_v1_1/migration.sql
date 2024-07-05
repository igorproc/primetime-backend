/*
  Warnings:

  - You are about to drop the `movies_years` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `movies_years` DROP FOREIGN KEY `movies_years_id_fkey`;

-- AlterTable
ALTER TABLE `genres` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `movies_years`;

-- CreateTable
CREATE TABLE `movie_years` (
    `id` INTEGER NOT NULL,
    `release_year` INTEGER UNSIGNED NOT NULL,
    `start_show` INTEGER UNSIGNED NULL,
    `end_show` INTEGER UNSIGNED NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movie_countries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `watch_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `countries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(64) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `countries_name_key`(`name`),
    INDEX `countries_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `movie_years` ADD CONSTRAINT `movie_years_id_fkey` FOREIGN KEY (`id`) REFERENCES `watchs_content`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movie_countries` ADD CONSTRAINT `movie_countries_name_fkey` FOREIGN KEY (`name`) REFERENCES `countries`(`name`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `movie_countries` ADD CONSTRAINT `movie_countries_watch_id_fkey` FOREIGN KEY (`watch_id`) REFERENCES `watchs_content`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
