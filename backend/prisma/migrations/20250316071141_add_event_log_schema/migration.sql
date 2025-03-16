-- CreateTable
CREATE TABLE "EventLog" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "commentId" TEXT,
    "oldTitle" TEXT,
    "newTitle" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventLog_pkey" PRIMARY KEY ("id")
);
