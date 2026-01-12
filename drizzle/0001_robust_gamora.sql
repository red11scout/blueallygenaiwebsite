CREATE TABLE `calculation_audit_log` (
	`id` int AUTO_INCREMENT NOT NULL,
	`scenarioId` int,
	`inputParameters` json NOT NULL,
	`outputResults` json NOT NULL,
	`calculationVersion` varchar(20) DEFAULT '1.0.0',
	`hyperformulaVersion` varchar(20),
	`calculatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `calculation_audit_log_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `company_research` (
	`id` int AUTO_INCREMENT NOT NULL,
	`domain` varchar(255) NOT NULL,
	`companyName` varchar(255) NOT NULL,
	`industry` varchar(100) NOT NULL,
	`subIndustry` varchar(100),
	`revenue` decimal(15,2),
	`revenueSource` enum('public','estimated') DEFAULT 'estimated',
	`employees` int,
	`employeesSource` enum('public','estimated') DEFAULT 'estimated',
	`sgaPercent` decimal(5,4),
	`annualSGACost` decimal(15,2),
	`aiOpportunity` json,
	`competitors` json,
	`fiveYearProjection` json,
	`dataQualityConfidence` enum('High','Medium','Low') DEFAULT 'Medium',
	`estimationNotes` json,
	`researchedAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `company_research_id` PRIMARY KEY(`id`),
	CONSTRAINT `company_research_domain_unique` UNIQUE(`domain`)
);
--> statement-breakpoint
CREATE TABLE `user_scenarios` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`companyResearchId` int,
	`name` varchar(255) NOT NULL,
	`description` text,
	`customAssumptions` json,
	`selectedProcesses` json,
	`calculatedResults` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_scenarios_id` PRIMARY KEY(`id`)
);
