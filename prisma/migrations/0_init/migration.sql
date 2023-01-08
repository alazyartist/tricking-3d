-- CreateTable
CREATE TABLE `animations` (
    `animation_id` CHAR(36) NOT NULL,
    `animationName` VARCHAR(255) NULL,
    `skeleton` VARCHAR(255) NULL,
    `fileName` VARCHAR(255) NULL,
    `model` VARCHAR(255) NULL,

    PRIMARY KEY (`animation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bases` (
    `base_id` VARCHAR(255) NOT NULL,
    `trick_id` CHAR(36) NULL,
    `name` VARCHAR(255) NULL,
    `direction` VARCHAR(255) NULL,
    `fromLeg` VARCHAR(255) NULL,
    `toLeg` VARCHAR(255) NULL,
    `rotation` INTEGER NULL,
    `stance_id` VARCHAR(255) NULL,
    `takeoffStance` VARCHAR(255) NULL,
    `landingStance` VARCHAR(255) NULL,
    `pointValue` FLOAT NULL,

    INDEX `stance_id`(`stance_id`),
    PRIMARY KEY (`base_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `battlerooms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `host` CHAR(36) NULL,
    `sessionid` CHAR(36) NULL,
    `team1` JSON NULL,
    `team2` JSON NULL,
    `judges` JSON NULL,
    `duration` INTEGER NULL,
    `isOpen` BOOLEAN NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL,
    `deletedAt` DATETIME(0) NULL,

    UNIQUE INDEX `sessionid`(`sessionid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `battleroomstats` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sessionid` CHAR(36) NULL,
    `team1Score` INTEGER NULL,
    `team2Score` INTEGER NULL,
    `team1AudienceScore` INTEGER NULL,
    `team2AudienceScore` INTEGER NULL,
    `winner` JSON NULL,
    `audienceWinner` JSON NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL,
    `deletedAt` DATETIME(0) NULL,

    UNIQUE INDEX `sessionid`(`sessionid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `captures` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `captured_id` INTEGER NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL,

    INDEX `captured_id`(`captured_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `claimedcombos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` CHAR(36) NULL,
    `combo_id` CHAR(36) NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `claimedtricks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` CHAR(36) NULL,
    `trick_id` CHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `combo_animations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `combo_id` CHAR(36) NULL,
    `animations_id` CHAR(36) NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `combos` (
    `combo_id` CHAR(36) NOT NULL,
    `name` VARCHAR(255) NULL,
    `type` VARCHAR(255) NULL DEFAULT 'Combo',
    `comboArray` JSON NULL,
    `creator` CHAR(36) NULL,
    `defaultAnimation` CHAR(36) NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL,
    `pointValue` FLOAT NULL,
    `shorthand` VARCHAR(255) NULL,

    PRIMARY KEY (`combo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `interactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `interaction_id` CHAR(36) NULL,
    `trick_id` CHAR(36) NULL,
    `type` VARCHAR(255) NULL,
    `content` VARCHAR(255) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `judgescores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sessionid` CHAR(36) NULL,
    `judge` CHAR(36) NULL,
    `team` JSON NULL,
    `score` INTEGER NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pointsledger` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` CHAR(36) NULL,
    `points` FLOAT NULL,
    `reason_id` VARCHAR(255) NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pointsledgers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` CHAR(36) NULL,
    `points` FLOAT NULL,
    `reason_id` VARCHAR(255) NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profiles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` CHAR(36) NULL,
    `name` VARCHAR(255) NULL,
    `status` VARCHAR(255) NULL,
    `socials` JSON NULL,
    `age` INTEGER NULL,
    `country` VARCHAR(255) NULL,
    `state` VARCHAR(255) NULL,
    `city` VARCHAR(255) NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schema_migrations` (
    `version` BIGINT NOT NULL,
    `inserted_at` DATETIME(0) NULL,

    PRIMARY KEY (`version`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sequelizemeta` (
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessiondata` (
    `id` CHAR(36) NOT NULL,
    `srcid` CHAR(36) NULL,
    `sessionid` CHAR(36) NULL,
    `clipLabel` CHAR(36) NULL,
    `clipStart` VARCHAR(255) NULL,
    `clipEnd` VARCHAR(255) NULL,
    `admin` CHAR(36) NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL,
    `bail` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessionsources` (
    `srcid` CHAR(36) NOT NULL,
    `sessionid` CHAR(36) NULL,
    `vidsrc` VARCHAR(255) NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL,

    UNIQUE INDEX `vidsrckey`(`sessionid`, `vidsrc`),
    PRIMARY KEY (`srcid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessionsummaries` (
    `sessionid` CHAR(36) NOT NULL,
    `name` VARCHAR(255) NULL,
    `user_id` CHAR(36) NULL,
    `admin` CHAR(36) NULL,
    `sessionDate` DATE NULL,
    `startTime` VARCHAR(255) NULL,
    `endTime` VARCHAR(255) NULL,
    `status` VARCHAR(255) NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL,
    `type` VARCHAR(255) NULL,

    PRIMARY KEY (`sessionid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stances` (
    `stance_id` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NULL DEFAULT 'Stance',
    `name` VARCHAR(255) NULL,
    `leg` VARCHAR(255) NULL,
    `direction` VARCHAR(255) NULL,
    `stanceRotation` INTEGER NULL,
    `pointValue` FLOAT NULL,

    PRIMARY KEY (`stance_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transitions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `type` VARCHAR(255) NULL DEFAULT 'Transition',
    `transitionType` VARCHAR(255) NULL,
    `takeoffStyle` VARCHAR(255) NULL,
    `landingStyle` VARCHAR(255) NULL,
    `fromLeg` VARCHAR(255) NULL,
    `toLeg` VARCHAR(255) NULL,
    `rotation` INTEGER NULL,
    `pointValue` FLOAT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trick_animations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `trick_id` CHAR(36) NULL,
    `animation_id` CHAR(36) NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trick_variations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `variation_id` INTEGER NULL,
    `trick_id` CHAR(36) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tricklist_combos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tricklist_id` CHAR(36) NULL,
    `combo_id` CHAR(36) NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tricklists` (
    `tricklist_id` CHAR(36) NOT NULL,
    `name` VARCHAR(255) NULL,
    `owner` CHAR(36) NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`tricklist_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tricks` (
    `trick_id` CHAR(36) NOT NULL,
    `base_id` VARCHAR(255) NULL,
    `trickType` VARCHAR(255) NULL,
    `type` VARCHAR(255) NULL DEFAULT 'Trick',
    `name` VARCHAR(255) NULL,
    `stance_id` VARCHAR(255) NULL,
    `takeoffStance` VARCHAR(255) NULL,
    `landingStance` VARCHAR(255) NULL,
    `defaultAnimation` CHAR(36) NULL,
    `pointValue` FLOAT NULL,

    INDEX `base_id`(`base_id`),
    PRIMARY KEY (`trick_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_tricklists` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` CHAR(36) NULL,
    `tricklist_id` CHAR(36) NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NULL,
    `first_name` VARCHAR(255) NULL,
    `last_name` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `refresh_token` VARCHAR(255) NULL,
    `uuid` CHAR(36) NULL,
    `profilePic` VARCHAR(255) NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL,
    `deletedAt` DATETIME(0) NULL,
    `isAdmin` BOOLEAN NULL,
    `adminAccess` INTEGER NULL,
    `TotalPoints` FLOAT NULL,
    `SessionReviewCredits` INTEGER NULL,

    UNIQUE INDEX `username`(`username`),
    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userscores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sessionid` CHAR(36) NULL,
    `userid` CHAR(36) NULL,
    `team` JSON NULL,
    `score` INTEGER NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `variations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `variationType` VARCHAR(255) NULL,
    `type` VARCHAR(255) NULL DEFAULT 'Variation',
    `name` VARCHAR(255) NULL,
    `value` VARCHAR(255) NULL,
    `pos` VARCHAR(255) NULL,
    `pointValue` FLOAT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    INDEX `Account_userId_fkey`(`userId`),
    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    INDEX `Session_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verificationtoken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bases` ADD CONSTRAINT `bases_ibfk_1` FOREIGN KEY (`stance_id`) REFERENCES `stances`(`stance_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `captures` ADD CONSTRAINT `captures_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `captures` ADD CONSTRAINT `captures_ibfk_2` FOREIGN KEY (`captured_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tricks` ADD CONSTRAINT `tricks_ibfk_1` FOREIGN KEY (`base_id`) REFERENCES `bases`(`base_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

