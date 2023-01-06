/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_answer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_answer" DROP CONSTRAINT "user_answer_user_id_fkey";

-- DropTable
DROP TABLE "user";

-- DropTable
DROP TABLE "user_answer";

-- CreateTable
CREATE TABLE "guest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guest_answer" (
    "id" TEXT NOT NULL,
    "guest_id" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "answer" "Answer" NOT NULL,
    "requested_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "guest_answer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "guest_answer" ADD CONSTRAINT "guest_answer_guest_id_fkey" FOREIGN KEY ("guest_id") REFERENCES "guest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
