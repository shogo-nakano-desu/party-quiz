/*
  Warnings:

  - The primary key for the `user_answer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `user_answer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_answer" DROP CONSTRAINT "user_answer_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "user_answer_pkey" PRIMARY KEY ("id");
