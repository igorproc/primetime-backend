/*
  Warnings:

  - You are about to drop the `runnableTasks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `error_handler` DROP FOREIGN KEY `error_handler_migration_id_fkey`;

-- DropForeignKey
ALTER TABLE `runnableTasks` DROP FOREIGN KEY `runnableTasks_code_fkey`;

-- DropTable
DROP TABLE `runnableTasks`;

-- CreateTable
CREATE TABLE `runnable_tasks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(32) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ended_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `runnable_tasks` ADD CONSTRAINT `runnable_tasks_code_fkey` FOREIGN KEY (`code`) REFERENCES `avliable_migration_tasks`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `error_handler` ADD CONSTRAINT `error_handler_migration_id_fkey` FOREIGN KEY (`migration_id`) REFERENCES `runnable_tasks`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
