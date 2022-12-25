-- CreateEnum
CREATE TYPE "Answer" AS ENUM ('option_1', 'option_2', 'option_3', 'option_4');

-- CreateTable
CREATE TABLE "question" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "option_1" TEXT NOT NULL,
    "option_2" TEXT NOT NULL,
    "option_3" TEXT NOT NULL,
    "option_4" TEXT NOT NULL,
    "answer" "Answer" NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_answer" (
    "user_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "answer" "Answer" NOT NULL,
    "requested_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "user_answer_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "session_detail" (
    "id" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "started_at" TIMESTAMPTZ NOT NULL,
    "ended_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "session_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "session_detail" ADD CONSTRAINT "session_detail_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_detail" ADD CONSTRAINT "session_detail_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
