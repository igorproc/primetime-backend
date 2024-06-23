-- CreateTable
CREATE TABLE `data_balancers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` ENUM('KP', 'KP_TG_KEY') NOT NULL,
    `display_name` VARCHAR(32) NOT NULL,
    `status` ENUM('ONLINE', 'OFFLINE', 'DEPRECATED') NOT NULL,
    `selected` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `data_balancers_code_key`(`code`),
    UNIQUE INDEX `data_balancers_display_name_key`(`display_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
