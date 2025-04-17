/*
  Warnings:

  - You are about to drop the column `login` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[telegram_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - The required column `username` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX `users_login_key` ON `users`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `login`,
    ADD COLUMN `username` VARCHAR(64) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_telegram_id_key` ON `users`(`telegram_id`);

-- CreateIndex
CREATE UNIQUE INDEX `users_username_key` ON `users`(`username`);
