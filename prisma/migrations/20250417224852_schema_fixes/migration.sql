-- DropForeignKey
ALTER TABLE `movie_countries` DROP FOREIGN KEY `movie_countries_watch_id_fkey`;

-- DropForeignKey
ALTER TABLE `movie_staff` DROP FOREIGN KEY `movie_staff_movie_content_id_fkey`;

-- DropForeignKey
ALTER TABLE `movie_staff` DROP FOREIGN KEY `movie_staff_staff_info_id_fkey`;

-- DropForeignKey
ALTER TABLE `movie_years` DROP FOREIGN KEY `movie_years_id_fkey`;

-- DropForeignKey
ALTER TABLE `staff_facts` DROP FOREIGN KEY `staff_facts_staff_info_id_fkey`;

-- AddForeignKey
ALTER TABLE `movie_years` ADD CONSTRAINT `movie_years_id_fkey` FOREIGN KEY (`id`) REFERENCES `movie_content`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `movie_countries` ADD CONSTRAINT `movie_countries_watch_id_fkey` FOREIGN KEY (`watch_id`) REFERENCES `movie_content`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `staff_facts` ADD CONSTRAINT `staff_facts_staff_info_id_fkey` FOREIGN KEY (`staff_info_id`) REFERENCES `staff_info`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `movie_staff` ADD CONSTRAINT `movie_staff_staff_info_id_fkey` FOREIGN KEY (`staff_info_id`) REFERENCES `staff_info`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `movie_staff` ADD CONSTRAINT `movie_staff_movie_content_id_fkey` FOREIGN KEY (`movie_content_id`) REFERENCES `movie_content`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
