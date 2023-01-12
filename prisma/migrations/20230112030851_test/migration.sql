/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `sessionsummaries` MODIFY `sessionDate` VARCHAR(255) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_uuid_key` ON `users`(`uuid`);

-- CreateIndex
CREATE INDEX `users_uuid_idx` ON `users`(`uuid`);
