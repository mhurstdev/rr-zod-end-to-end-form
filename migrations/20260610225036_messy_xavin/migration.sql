CREATE TABLE `user` (
	`id` text(36) PRIMARY KEY,
	`name` text NOT NULL,
	`email` text NOT NULL UNIQUE,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
