-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "WorkLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "start" DATETIME NOT NULL,
    "end" DATETIME,
    "description" TEXT,
    "taskId" TEXT NOT NULL,
    CONSTRAINT "WorkLog_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    CONSTRAINT "Note_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
