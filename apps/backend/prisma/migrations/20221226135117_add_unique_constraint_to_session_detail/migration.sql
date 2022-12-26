/*
  Warnings:

  - A unique constraint covering the columns `[session_id,number]` on the table `session_detail` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `session_detail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "session_detail" ADD COLUMN     "number" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "session_detail_session_id_number_key" ON "session_detail"("session_id", "number");
