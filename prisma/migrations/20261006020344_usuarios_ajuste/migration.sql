/*
  Warnings:

  - You are about to alter the column `passwordHash` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(72)`.

*/
-- AlterTable
ALTER TABLE `usuarios` MODIFY `correo` VARCHAR(160) NOT NULL,
    MODIFY `passwordHash` VARCHAR(72) NOT NULL,
    MODIFY `rol` VARCHAR(20) NOT NULL DEFAULT 'miembro';
