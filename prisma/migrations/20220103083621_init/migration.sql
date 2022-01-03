-- CreateTable
CREATE TABLE `Todo` (
    `uid` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `done` BOOLEAN NOT NULL,

    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
