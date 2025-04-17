/*
  Warnings:

  - You are about to drop the `watch_history` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `watch_staff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `watchs_content` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `movie_countries` DROP FOREIGN KEY `movie_countries_watch_id_fkey`;

-- DropForeignKey
ALTER TABLE `movie_genres` DROP FOREIGN KEY `movie_genres_watch_id_fkey`;

-- DropForeignKey
ALTER TABLE `movie_names` DROP FOREIGN KEY `movie_names_watch_id_fkey`;

-- DropForeignKey
ALTER TABLE `movie_ratings` DROP FOREIGN KEY `movie_ratings_watch_id_fkey`;

-- DropForeignKey
ALTER TABLE `movie_texts` DROP FOREIGN KEY `movie_texts_id_fkey`;

-- DropForeignKey
ALTER TABLE `movie_years` DROP FOREIGN KEY `movie_years_id_fkey`;

-- DropForeignKey
ALTER TABLE `watch_history` DROP FOREIGN KEY `watch_history_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `watch_history` DROP FOREIGN KEY `watch_history_watch_content_id_fkey`;

-- DropForeignKey
ALTER TABLE `watch_staff` DROP FOREIGN KEY `watch_staff_staff_info_id_fkey`;

-- DropForeignKey
ALTER TABLE `watch_staff` DROP FOREIGN KEY `watch_staff_watch_content_id_fkey`;

-- DropTable
DROP TABLE `watch_history`;

-- DropTable
DROP TABLE `watch_staff`;

-- DropTable
DROP TABLE `watchs_content`;

-- CreateTable
CREATE TABLE `movie_content` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('MOVIE', 'SERIES', 'SHOW') NOT NULL,
    `slug` VARCHAR(128) NOT NULL,
    `duration` INTEGER UNSIGNED NULL,
    `kinopoisk_id` INTEGER UNSIGNED NOT NULL,
    `imdb_id` VARCHAR(12) NULL,
    `poster_display` VARCHAR(256) NOT NULL,
    `poster_preview` VARCHAR(256) NULL,
    `age_limits` INTEGER UNSIGNED NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `movie_content_slug_key`(`slug`),
    UNIQUE INDEX `movie_content_kinopoisk_id_key`(`kinopoisk_id`),
    INDEX `movie_content_kinopoisk_id_idx`(`kinopoisk_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movie_staff` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `movie_content_id` INTEGER NOT NULL,
    `staff_info_id` INTEGER NOT NULL,
    `profession_key` ENUM('WRITER', 'OPERATOR', 'EDITOR', 'COMPOSER', 'TRANSLATOR', 'DIRECTOR', 'DESIGN', 'PRODUCER', 'ACTOR', 'VOICE_DIRECTOR') NOT NULL,
    `role` VARCHAR(64) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `movie_staff_profession_key_idx`(`profession_key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `movie_years` ADD CONSTRAINT `movie_years_id_fkey` FOREIGN KEY (`id`) REFERENCES `movie_content`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movie_genres` ADD CONSTRAINT `movie_genres_watch_id_fkey` FOREIGN KEY (`watch_id`) REFERENCES `movie_content`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `movie_names` ADD CONSTRAINT `movie_names_watch_id_fkey` FOREIGN KEY (`watch_id`) REFERENCES `movie_content`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `movie_ratings` ADD CONSTRAINT `movie_ratings_watch_id_fkey` FOREIGN KEY (`watch_id`) REFERENCES `movie_content`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `movie_countries` ADD CONSTRAINT `movie_countries_watch_id_fkey` FOREIGN KEY (`watch_id`) REFERENCES `movie_content`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movie_texts` ADD CONSTRAINT `movie_texts_id_fkey` FOREIGN KEY (`id`) REFERENCES `movie_content`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `movie_staff` ADD CONSTRAINT `movie_staff_staff_info_id_fkey` FOREIGN KEY (`staff_info_id`) REFERENCES `staff_info`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movie_staff` ADD CONSTRAINT `movie_staff_movie_content_id_fkey` FOREIGN KEY (`movie_content_id`) REFERENCES `movie_content`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
