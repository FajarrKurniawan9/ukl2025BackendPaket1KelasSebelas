/*
  Warnings:

  - Added the required column `quantity` to the `menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `menu` ADD COLUMN `quantity` INTEGER NOT NULL,
    ADD COLUMN `size` VARCHAR(191) NOT NULL;
