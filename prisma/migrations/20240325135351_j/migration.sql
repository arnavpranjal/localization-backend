-- CreateTable
CREATE TABLE "role" (
    "systemName" TEXT NOT NULL PRIMARY KEY,
    "displayName" TEXT NOT NULL,
    "default" BOOLEAN NOT NULL DEFAULT false
);
