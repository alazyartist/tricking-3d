-- CreateTable
CREATE TABLE `user_sessions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` CHAR(36) NOT NULL,
    `sessionid` CHAR(36) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_sessions` ADD CONSTRAINT `user_sessions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_sessions` ADD CONSTRAINT `user_sessions_sessionid_fkey` FOREIGN KEY (`sessionid`) REFERENCES `sessionsummaries`(`sessionid`) ON DELETE RESTRICT ON UPDATE CASCADE;
