/*
  Warnings:

  - Added the required column `client_id` to the `tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tokens` ADD COLUMN `client_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;

-- CreateIndex
CREATE INDEX `tokens_refresh_token_idx` ON `tokens`(`refresh_token`);

-- AddForeignKey
ALTER TABLE `tokens` ADD CONSTRAINT `tokens_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tokens` ADD CONSTRAINT `tokens_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `devices`(`client_id`) ON DELETE CASCADE ON UPDATE CASCADE;
