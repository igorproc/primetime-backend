/*
  Warnings:

  - You are about to drop the column `type_service` on the `data_balancer_tokens` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[documentation_link]` on the table `data_balancers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `balancer_code` to the `data_balancer_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documentation_link` to the `data_balancers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `data_balancer_tokens` DROP COLUMN `type_service`,
    ADD COLUMN `balancer_code` ENUM('KP', 'KP_TG_KEY') NOT NULL;

-- AlterTable
ALTER TABLE `data_balancers` ADD COLUMN `documentation_link` VARCHAR(128) NOT NULL;

-- CreateIndex
CREATE INDEX `data_balancer_tokens_balancer_code_idx` ON `data_balancer_tokens`(`balancer_code`);

-- CreateIndex
CREATE UNIQUE INDEX `data_balancers_documentation_link_key` ON `data_balancers`(`documentation_link`);

-- CreateIndex
CREATE INDEX `data_balancers_code_idx` ON `data_balancers`(`code`);

-- AddForeignKey
ALTER TABLE `data_balancer_tokens` ADD CONSTRAINT `data_balancer_tokens_balancer_code_fkey` FOREIGN KEY (`balancer_code`) REFERENCES `data_balancers`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;
