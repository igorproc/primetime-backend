-- CreateTable
CREATE TABLE `applications` (
    `app_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(64) NOT NULL,
    `is_verified` BOOLEAN NOT NULL DEFAULT true,
    `owner_uid` INTEGER UNSIGNED NOT NULL,
    `secure_key` VARCHAR(256) NOT NULL,
    `access_key` VARCHAR(256) NOT NULL,
    `status` ENUM('enabled', 'disabled') NOT NULL DEFAULT 'disabled',
    `access_permission` VARCHAR(512) NOT NULL,
    `domain` VARCHAR(64) NOT NULL,
    `redirect_uri` VARCHAR(64) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `applications_title_key`(`title`),
    UNIQUE INDEX `applications_secure_key_key`(`secure_key`),
    UNIQUE INDEX `applications_domain_key`(`domain`),
    INDEX `owner_uid`(`owner_uid`),
    PRIMARY KEY (`app_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `devices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `client_id` VARCHAR(191) NOT NULL,
    `platform` ENUM('WINDOWS', 'LINUX', 'ANDROID', 'IPHONE', 'IPAD', 'MACINTOSH') NOT NULL,
    `ip` VARCHAR(32) NOT NULL,
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

-- CreateTable
CREATE TABLE `tokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `client_id` VARCHAR(191) NOT NULL,
    `access_token` VARCHAR(1024) NOT NULL,
    `refresh_token` VARCHAR(256) NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,
    `is_revoked` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `tokens_refresh_token_idx`(`refresh_token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `data_balancers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` ENUM('KP', 'KP_TG_KEY') NOT NULL,
    `display_name` VARCHAR(32) NOT NULL,
    `documentation_link` VARCHAR(128) NOT NULL,
    `status` ENUM('ONLINE', 'OFFLINE', 'DEPRECATED') NOT NULL,
    `selected` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `data_balancers_code_key`(`code`),
    UNIQUE INDEX `data_balancers_display_name_key`(`display_name`),
    UNIQUE INDEX `data_balancers_documentation_link_key`(`documentation_link`),
    INDEX `data_balancers_code_idx`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `data_balancer_tokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `balancer_code` ENUM('KP', 'KP_TG_KEY') NOT NULL,
    `token` VARCHAR(64) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `data_balancer_tokens_balancer_code_idx`(`balancer_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `watchs_content` (
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

    UNIQUE INDEX `watchs_content_slug_key`(`slug`),
    UNIQUE INDEX `watchs_content_kinopoisk_id_key`(`kinopoisk_id`),
    INDEX `watchs_content_kinopoisk_id_idx`(`kinopoisk_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movie_years` (
    `id` INTEGER NOT NULL,
    `release_year` INTEGER UNSIGNED NULL,
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
CREATE TABLE `movie_countries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `watch_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movie_texts` (
    `id` INTEGER NOT NULL,
    `slogan` TEXT NULL,
    `short_description` TEXT NULL,
    `description` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `genres` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(32) NOT NULL,
    `popularity` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `genres_name_key`(`name`),
    INDEX `genres_name_idx`(`name`),
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

-- CreateTable
CREATE TABLE `watch_history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `watch_content_id` INTEGER NOT NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `avliable_migration_tasks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(128) NOT NULL,
    `description` VARCHAR(512) NOT NULL,
    `code` VARCHAR(32) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `avliable_migration_tasks_code_key`(`code`),
    INDEX `avliable_migration_tasks_code_idx`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `runnable_tasks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(32) NOT NULL,
    `job_id` VARCHAR(128) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ended_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `error_handler` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `migration_id` INTEGER NULL,
    `error_message` VARCHAR(256) NOT NULL,
    `error_stack` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `error_handler_migration_id_key`(`migration_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `devices` ADD CONSTRAINT `devices_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tokens` ADD CONSTRAINT `tokens_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tokens` ADD CONSTRAINT `tokens_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `devices`(`client_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `data_balancer_tokens` ADD CONSTRAINT `data_balancer_tokens_balancer_code_fkey` FOREIGN KEY (`balancer_code`) REFERENCES `data_balancers`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movie_years` ADD CONSTRAINT `movie_years_id_fkey` FOREIGN KEY (`id`) REFERENCES `watchs_content`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movie_genres` ADD CONSTRAINT `movie_genres_name_fkey` FOREIGN KEY (`name`) REFERENCES `genres`(`name`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `movie_genres` ADD CONSTRAINT `movie_genres_watch_id_fkey` FOREIGN KEY (`watch_id`) REFERENCES `watchs_content`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `movie_names` ADD CONSTRAINT `movie_names_watch_id_fkey` FOREIGN KEY (`watch_id`) REFERENCES `watchs_content`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `movie_ratings` ADD CONSTRAINT `movie_ratings_watch_id_fkey` FOREIGN KEY (`watch_id`) REFERENCES `watchs_content`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `movie_countries` ADD CONSTRAINT `movie_countries_name_fkey` FOREIGN KEY (`name`) REFERENCES `countries`(`name`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `movie_countries` ADD CONSTRAINT `movie_countries_watch_id_fkey` FOREIGN KEY (`watch_id`) REFERENCES `watchs_content`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movie_texts` ADD CONSTRAINT `movie_texts_id_fkey` FOREIGN KEY (`id`) REFERENCES `watchs_content`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `watch_history` ADD CONSTRAINT `watch_history_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `watch_history` ADD CONSTRAINT `watch_history_watch_content_id_fkey` FOREIGN KEY (`watch_content_id`) REFERENCES `watchs_content`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `runnable_tasks` ADD CONSTRAINT `runnable_tasks_code_fkey` FOREIGN KEY (`code`) REFERENCES `avliable_migration_tasks`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `error_handler` ADD CONSTRAINT `error_handler_migration_id_fkey` FOREIGN KEY (`migration_id`) REFERENCES `runnable_tasks`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
