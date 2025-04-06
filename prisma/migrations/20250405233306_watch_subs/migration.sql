-- CreateTable
CREATE TABLE `user_watch_subscriptions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `watch_content_id` INTEGER NOT NULL,
    `status` ENUM('SUBSCRIBE', 'UNSUBSCRIBE') NOT NULL DEFAULT 'SUBSCRIBE',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `idx_status`(`status`),
    UNIQUE INDEX `user_watch_subscriptions_user_id_watch_content_id_key`(`user_id`, `watch_content_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_watch_subscriptions` ADD CONSTRAINT `user_watch_subscriptions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_watch_subscriptions` ADD CONSTRAINT `user_watch_subscriptions_watch_content_id_fkey` FOREIGN KEY (`watch_content_id`) REFERENCES `watchs_content`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
