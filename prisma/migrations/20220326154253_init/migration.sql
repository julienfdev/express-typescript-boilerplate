-- CreateTable
CREATE TABLE `Sensor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('TEMPERATURE', 'HUMIDITY', 'BARO', 'PROXIMITY') NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `rawNumber` INTEGER NULL,
    `rawBool` BOOLEAN NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Actuator` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('BLINDS', 'LIGHT') NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `state` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
