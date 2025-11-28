-- CreateTable
CREATE TABLE "SiteStats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "totalVisitors" INTEGER NOT NULL DEFAULT 0,
    "totalToolsUsed" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PageVisit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ipAddress" TEXT NOT NULL,
    "userAgent" TEXT,
    "page" TEXT NOT NULL,
    "visitedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "PageVisit_visitedAt_idx" ON "PageVisit"("visitedAt");

-- CreateIndex
CREATE INDEX "PageVisit_ipAddress_idx" ON "PageVisit"("ipAddress");
