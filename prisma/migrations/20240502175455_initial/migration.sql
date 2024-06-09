-- CreateTable
CREATE TABLE `applications` (
    `app_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(64) NOT NULL,
    `is_verified` BOOLEAN NOT NULL DEFAULT true,
    `owner_uid` INTEGER NOT NULL,
    `secure_key` VARCHAR(256) NOT NULL,
    `access_key` VARCHAR(256) NOT NULL,
    `status` ENUM('enabled', 'disabled') NOT NULL DEFAULT 'disabled',
    `access_permission` VARCHAR(512) NOT NULL,
    `domain` VARCHAR(64) NOT NULL,
    `redirect_uri` VARCHAR(64) NOT NULL,
    `created_at` INTEGER NOT NULL,

    UNIQUE INDEX `applications_title_key`(`title`),
    UNIQUE INDEX `applications_secure_key_key`(`secure_key`),
    UNIQUE INDEX `applications_domain_key`(`domain`),
    INDEX `owner_uid`(`owner_uid`),
    PRIMARY KEY (`app_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
