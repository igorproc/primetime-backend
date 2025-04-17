-- CreateTable
CREATE TABLE `staff_info` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kinopoisk_id` INTEGER UNSIGNED NOT NULL,
    `name` VARCHAR(128) NULL,
    `name_alt` VARCHAR(128) NULL,
    `sex` ENUM('MALE', 'FEMALE') NULL,
    `growth` INTEGER UNSIGNED NULL,
    `birthday` DATETIME(3) NULL,
    `birthplace` VARCHAR(128) NULL,
    `deathplace` VARCHAR(128) NULL,
    `avatarUrl` VARCHAR(512) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `staff_info_kinopoisk_id_key`(`kinopoisk_id`),
    INDEX `staff_info_kinopoisk_id_idx`(`kinopoisk_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `staff_facts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `staff_info_id` INTEGER NOT NULL,
    `content` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `staff_facts_staff_info_id_idx`(`staff_info_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `watch_staff` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `watch_content_id` INTEGER NOT NULL,
    `staff_info_id` INTEGER NOT NULL,
    `profession_key` ENUM('WRITER', 'OPERATOR', 'EDITOR', 'COMPOSER', 'TRANSLATOR', 'DIRECTOR', 'DESIGN', 'PRODUCER', 'ACTOR', 'VOICE_DIRECTOR') NOT NULL,
    `role` VARCHAR(64) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `watch_staff_profession_key_idx`(`profession_key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `staff_facts` ADD CONSTRAINT `staff_facts_staff_info_id_fkey` FOREIGN KEY (`staff_info_id`) REFERENCES `staff_info`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `watch_staff` ADD CONSTRAINT `watch_staff_staff_info_id_fkey` FOREIGN KEY (`staff_info_id`) REFERENCES `staff_info`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `watch_staff` ADD CONSTRAINT `watch_staff_watch_content_id_fkey` FOREIGN KEY (`watch_content_id`) REFERENCES `watchs_content`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
