-- CreateTable
CREATE TABLE `movie_texts` (
    `id` INTEGER NOT NULL,
    `slogan` VARCHAR(256) NULL,
    `short_description` VARCHAR(512) NULL,
    `description` VARCHAR(512) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `movie_texts` ADD CONSTRAINT `movie_texts_id_fkey` FOREIGN KEY (`id`) REFERENCES `watchs_content`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
