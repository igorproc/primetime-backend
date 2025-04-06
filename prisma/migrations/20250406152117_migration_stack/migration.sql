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
CREATE TABLE `runnableTasks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(32) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ended_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `error_handler` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `migration_id` INTEGER NULL,
    `errorMessage` VARCHAR(256) NOT NULL,
    `errorStack` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `error_handler_migration_id_key`(`migration_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `runnableTasks` ADD CONSTRAINT `runnableTasks_code_fkey` FOREIGN KEY (`code`) REFERENCES `avliable_migration_tasks`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `error_handler` ADD CONSTRAINT `error_handler_migration_id_fkey` FOREIGN KEY (`migration_id`) REFERENCES `runnableTasks`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
