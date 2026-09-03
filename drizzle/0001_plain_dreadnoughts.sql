DROP INDEX `snapshots_owner_profile_idx`;--> statement-breakpoint
ALTER TABLE `snapshots` ADD `list_type` text DEFAULT 'following' NOT NULL;--> statement-breakpoint
CREATE INDEX `snapshots_owner_profile_idx` ON `snapshots` (`owner_id`,`profile_name`,`list_type`);