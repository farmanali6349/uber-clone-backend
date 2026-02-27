import {
  pgTable,
  integer,
  varchar,
  text,
  timestamp,
  index,
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

// Token Blacklist
export const tokenBlacklist = pgTable(
  'token_blacklist',
  {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    authToken: text('auth_token').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  self => {
    return {
      authTokenIdx: index('auth_token_idx').on(self.authToken),
      authTokenCreatedAtIdx: index('auth_token_created_at_idx').on(
        self.authToken,
        self.createdAt
      ),
    };
  }
);
