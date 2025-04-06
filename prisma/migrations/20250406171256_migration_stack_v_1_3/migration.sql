/*
  Warnings:

  - You are about to drop the column `errorMessage` on the `error_handler` table. All the data in the column will be lost.
  - You are about to drop the column `errorStack` on the `error_handler` table. All the data in the column will be lost.
  - Added the required column `error_message` to the `error_handler` table without a default value. This is not possible if the table is not empty.
  - Added the required column `error_stack` to the `error_handler` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `error_handler` DROP COLUMN `errorMessage`,
    DROP COLUMN `errorStack`,
    ADD COLUMN `error_message` VARCHAR(256) NOT NULL,
    ADD COLUMN `error_stack` TEXT NOT NULL;
