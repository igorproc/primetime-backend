-- CreateTable
CREATE TABLE `data_balancer_tokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_service` ENUM('KP', 'KP_TG_KEY') NOT NULL,
    `token` VARCHAR(64) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
