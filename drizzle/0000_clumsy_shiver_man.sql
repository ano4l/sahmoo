CREATE TABLE `activity` (
	`id` text PRIMARY KEY NOT NULL,
	`booking_id` text NOT NULL,
	`action` text NOT NULL,
	`actor` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_activity_booking` ON `activity` (`booking_id`);--> statement-breakpoint
CREATE TABLE `bookings` (
	`id` text PRIMARY KEY NOT NULL,
	`reference` text NOT NULL,
	`token_hash` text NOT NULL,
	`idempotency_key` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`service_id` text NOT NULL,
	`service_name` text NOT NULL,
	`start_at` text NOT NULL,
	`end_at` text NOT NULL,
	`price` integer NOT NULL,
	`deposit` integer NOT NULL,
	`paid_amount` integer DEFAULT 0 NOT NULL,
	`placement` text NOT NULL,
	`idea` text NOT NULL,
	`status` text DEFAULT 'pending_payment' NOT NULL,
	`payment_status` text DEFAULT 'unpaid' NOT NULL,
	`hold_expires_at` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`notes` text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `bookings_reference_unique` ON `bookings` (`reference`);--> statement-breakpoint
CREATE UNIQUE INDEX `bookings_idempotency_key_unique` ON `bookings` (`idempotency_key`);--> statement-breakpoint
CREATE INDEX `idx_bookings_start_status` ON `bookings` (`start_at`,`status`);--> statement-breakpoint
CREATE TABLE `payments` (
	`id` text PRIMARY KEY NOT NULL,
	`booking_id` text NOT NULL,
	`proof_id` text,
	`amount` integer NOT NULL,
	`method` text NOT NULL,
	`created_at` text NOT NULL,
	`recorded_by` text NOT NULL,
	`note` text DEFAULT '' NOT NULL,
	FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`proof_id`) REFERENCES `proofs`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_payments_booking` ON `payments` (`booking_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_payments_proof` ON `payments` (`proof_id`);--> statement-breakpoint
CREATE TABLE `proofs` (
	`id` text PRIMARY KEY NOT NULL,
	`booking_id` text NOT NULL,
	`object_key` text NOT NULL,
	`filename` text NOT NULL,
	`mime` text NOT NULL,
	`size` integer NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` text NOT NULL,
	`reviewed_at` text,
	`reviewer` text,
	`reason` text DEFAULT '' NOT NULL,
	FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_proofs_booking` ON `proofs` (`booking_id`);