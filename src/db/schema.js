import {
  pgTable,
  integer,
  varchar,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

// User Schema

export const users = pgTable('users', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  firstname: varchar('first_name', { length: 50 }).notNull(),
  lastname: varchar('last_name', { length: 50 }),
  email: varchar('email', { length: 128 }).notNull().unique(),
  password: text('password').notNull(),
  socketId: text('socket_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
