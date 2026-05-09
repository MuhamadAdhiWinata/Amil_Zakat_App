CREATE TABLE `campaigns` (
	`id` varchar(36) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`image` varchar(255),
	`target_amount` decimal(15,2) NOT NULL,
	`current_amount` decimal(15,2) NOT NULL DEFAULT '0',
	`category_id` varchar(36),
	`status` varchar(50) NOT NULL DEFAULT 'active',
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `campaigns_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`icon` varchar(50),
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `categories_name_unique` UNIQUE(`name`),
	CONSTRAINT `categories_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `donations` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36),
	`campaign_id` varchar(36) NOT NULL,
	`donor_name` varchar(255),
	`donor_email` varchar(255),
	`donor_phone` varchar(20),
	`amount` decimal(15,2) NOT NULL,
	`is_anonymous` boolean NOT NULL DEFAULT false,
	`status` varchar(50) NOT NULL DEFAULT 'INITIATED',
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`completed_at` timestamp,
	CONSTRAINT `donations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `payment_logs` (
	`id` varchar(36) NOT NULL,
	`payment_id` varchar(36),
	`type` varchar(50) NOT NULL,
	`direction` varchar(10) NOT NULL,
	`payload` json NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `payment_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `payments` (
	`id` varchar(36) NOT NULL,
	`donation_id` varchar(36) NOT NULL,
	`gateway` varchar(50) NOT NULL DEFAULT 'PAKASIR',
	`gateway_method` varchar(50),
	`gateway_order_id` varchar(100),
	`gateway_reference` varchar(255),
	`amount` decimal(15,2) NOT NULL,
	`status` varchar(50) NOT NULL DEFAULT 'PENDING',
	`qr_string` text,
	`va_number` varchar(50),
	`expired_at` timestamp,
	`paid_at` timestamp,
	`raw_response` json,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `payments_id` PRIMARY KEY(`id`),
	CONSTRAINT `payments_gateway_order_id_unique` UNIQUE(`gateway_order_id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(36) NOT NULL,
	`email` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`password` varchar(255),
	`provider` varchar(50) NOT NULL DEFAULT 'google',
	`role` varchar(50) NOT NULL DEFAULT 'user',
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
