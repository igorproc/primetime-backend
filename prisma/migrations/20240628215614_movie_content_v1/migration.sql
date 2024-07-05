-- CreateTable
CREATE TABLE `watchs_content` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('MOVIE', 'SERIES', 'SHOW') NOT NULL,
    `slug` VARCHAR(64) NOT NULL,
    `duration` INTEGER UNSIGNED NOT NULL,
    `kinopoisk_id` INTEGER UNSIGNED NOT NULL,
    `imdb_id` VARCHAR(12) NOT NULL,
    `poster_display` VARCHAR(256) NOT NULL,
    `poster_preview` VARCHAR(256) NOT NULL,
    `age_limits` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `watchs_content_slug_key`(`slug`),
    UNIQUE INDEX `watchs_content_kinopoisk_id_key`(`kinopoisk_id`),
    UNIQUE INDEX `watchs_content_imdb_id_key`(`imdb_id`),
    INDEX `watchs_content_kinopoisk_id_idx`(`kinopoisk_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movies_years` (
    `id` INTEGER NOT NULL,
    `release_year` INTEGER UNSIGNED NOT NULL,
    `start_show` INTEGER UNSIGNED NULL,
    `end_show` INTEGER UNSIGNED NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movie_genres` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `watch_id` INTEGER NOT NULL,
    `name` VARCHAR(32) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movie_names` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `watch_id` INTEGER NOT NULL,
    `code` VARCHAR(5) NOT NULL,
    `name` VARCHAR(128) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movie_ratings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `watch_id` INTEGER NOT NULL,
    `code` ENUM('KINOPPOISK', 'IMDB', 'CRITICS', 'RU_CRITICS') NOT NULL,
    `rating` FLOAT NULL,
    `votes` INTEGER UNSIGNED NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `genres` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(32) NOT NULL,
    `popularity` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `genres_name_key`(`name`),
    INDEX `genres_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `movies_years` ADD CONSTRAINT `movies_years_id_fkey` FOREIGN KEY (`id`) REFERENCES `watchs_content`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movie_genres` ADD CONSTRAINT `movie_genres_name_fkey` FOREIGN KEY (`name`) REFERENCES `genres`(`name`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `movie_genres` ADD CONSTRAINT `movie_genres_watch_id_fkey` FOREIGN KEY (`watch_id`) REFERENCES `watchs_content`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `movie_names` ADD CONSTRAINT `movie_names_watch_id_fkey` FOREIGN KEY (`watch_id`) REFERENCES `watchs_content`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `movie_ratings` ADD CONSTRAINT `movie_ratings_watch_id_fkey` FOREIGN KEY (`watch_id`) REFERENCES `watchs_content`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
