/*
  Warnings:

  - Made the column `variation_id` on table `trick_variations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `trick_id` on table `trick_variations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `trick_variations` MODIFY `variation_id` INTEGER NOT NULL,
    MODIFY `trick_id` CHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE `trick_variations` ADD CONSTRAINT `trick_variations_variation_id_fkey` FOREIGN KEY (`variation_id`) REFERENCES `variations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trick_variations` ADD CONSTRAINT `trick_variations_trick_id_fkey` FOREIGN KEY (`trick_id`) REFERENCES `tricks`(`trick_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
