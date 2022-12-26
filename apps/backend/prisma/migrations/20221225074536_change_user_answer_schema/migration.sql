/*
  Warnings:

  - You are about to drop the column `question_id` on the `user_answer` table. All the data in the column will be lost.
  - Added the required column `session_id` to the `user_answer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_answer" DROP COLUMN "question_id",
ADD COLUMN     "session_id" TEXT NOT NULL;
