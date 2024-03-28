-- CreateTable
CREATE TABLE "stage" (
    "systemName" TEXT NOT NULL PRIMARY KEY,
    "displayName" TEXT NOT NULL,
    "default" BOOLEAN NOT NULL DEFAULT false
);
