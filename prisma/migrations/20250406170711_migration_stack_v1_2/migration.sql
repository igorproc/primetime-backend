/*
  Warnings:

  - Added the required column `job_id` to the `runnable_tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `runnable_tasks` ADD COLUMN `job_id` VARCHAR(128) NOT NULL;
