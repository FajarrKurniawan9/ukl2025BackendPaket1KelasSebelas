/*
  Warnings:

  - You are about to alter the column `role` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.
  - Added the required column `quantity` to the `coffee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `coffee` ADD COLUMN `quantity` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('admin', 'cashier') NOT NULL DEFAULT 'cashier';
