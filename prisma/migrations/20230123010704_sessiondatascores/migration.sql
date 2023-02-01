-- AlterTable
ALTER TABLE `sessiondata` ADD COLUMN `executionAverage` DOUBLE NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `sessiondatascores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sessiondataid` CHAR(36) NOT NULL,
    `userid` CHAR(36) NOT NULL,
    `executionScore` DOUBLE NOT NULL,

    UNIQUE INDEX `sessiondatascores_userid_sessiondataid_key`(`userid`, `sessiondataid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey


-- AddForeignKey
ALTER TABLE `sessiondatascores` ADD CONSTRAINT `sessiondatascores_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `users`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
