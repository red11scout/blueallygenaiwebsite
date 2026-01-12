import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Company research results - stores AI-researched company data
 */
export const companyResearch = mysqlTable("company_research", {
  id: int("id").autoincrement().primaryKey(),
  domain: varchar("domain", { length: 255 }).notNull().unique(),
  companyName: varchar("companyName", { length: 255 }).notNull(),
  industry: varchar("industry", { length: 100 }).notNull(),
  subIndustry: varchar("subIndustry", { length: 100 }),
  
  // Financial data
  revenue: decimal("revenue", { precision: 15, scale: 2 }),
  revenueSource: mysqlEnum("revenueSource", ["public", "estimated"]).default("estimated"),
  employees: int("employees"),
  employeesSource: mysqlEnum("employeesSource", ["public", "estimated"]).default("estimated"),
  
  // Calculated metrics
  sgaPercent: decimal("sgaPercent", { precision: 5, scale: 4 }),
  annualSGACost: decimal("annualSGACost", { precision: 15, scale: 2 }),
  
  // AI opportunity assessment (stored as JSON)
  aiOpportunity: json("aiOpportunity"),
  competitors: json("competitors"),
  fiveYearProjection: json("fiveYearProjection"),
  
  // Data quality
  dataQualityConfidence: mysqlEnum("dataQualityConfidence", ["High", "Medium", "Low"]).default("Medium"),
  estimationNotes: json("estimationNotes"),
  
  // Timestamps
  researchedAt: timestamp("researchedAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CompanyResearch = typeof companyResearch.$inferSelect;
export type InsertCompanyResearch = typeof companyResearch.$inferInsert;

/**
 * User scenarios - stores user-customized calculation scenarios
 */
export const userScenarios = mysqlTable("user_scenarios", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  companyResearchId: int("companyResearchId"),
  
  // Scenario metadata
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  
  // Custom assumptions (JSON)
  customAssumptions: json("customAssumptions"),
  
  // Selected processes and their customizations
  selectedProcesses: json("selectedProcesses"),
  
  // Calculated results (cached)
  calculatedResults: json("calculatedResults"),
  
  // Timestamps
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserScenario = typeof userScenarios.$inferSelect;
export type InsertUserScenario = typeof userScenarios.$inferInsert;

/**
 * Calculation audit log - for deterministic calculation verification
 */
export const calculationAuditLog = mysqlTable("calculation_audit_log", {
  id: int("id").autoincrement().primaryKey(),
  scenarioId: int("scenarioId"),
  
  // Input parameters (JSON)
  inputParameters: json("inputParameters").notNull(),
  
  // Output results (JSON)
  outputResults: json("outputResults").notNull(),
  
  // Calculation metadata
  calculationVersion: varchar("calculationVersion", { length: 20 }).default("1.0.0"),
  hyperformulaVersion: varchar("hyperformulaVersion", { length: 20 }),
  
  // Timestamp
  calculatedAt: timestamp("calculatedAt").defaultNow().notNull(),
});

export type CalculationAuditLog = typeof calculationAuditLog.$inferSelect;
export type InsertCalculationAuditLog = typeof calculationAuditLog.$inferInsert;