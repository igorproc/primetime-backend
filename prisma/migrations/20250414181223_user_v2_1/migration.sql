/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `password` VARCHAR(512) NULL,
    MODIFY `photo_url` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `site_settings_code_idx` ON `site_settings`(`code`);

-- CreateIndex
CREATE UNIQUE INDEX `users_email_key` ON `users`(`email`);
