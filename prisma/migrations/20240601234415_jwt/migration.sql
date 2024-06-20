-- CreateTable
CREATE TABLE `tokens` (
    `id` INTEGER NOT NULL,
    `access_token` VARCHAR(1024) NOT NULL,
    `refresh_token` VARCHAR(256) NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,
    `is_revoked` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
