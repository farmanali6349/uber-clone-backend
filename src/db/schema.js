import {
  pgTable,
  integer,
  varchar,
  text,
  timestamp,
  index,
  boolean,
  pgEnum,
} from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';
// USER SCHEMA
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

// TOKEN BLACKLIST
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

// CAPTAIN SCHEMA
export const captains = pgTable('captains', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  firstname: varchar('first_name', { length: 50 }).notNull(),
  lastname: varchar('last_name', { length: 50 }),
  email: varchar('email', { length: 128 }).notNull().unique(),
  password: text('password').notNull(),
  socketId: text('socket_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// VEHICLE SCHEMA
const vehicleTypeEnums = pgEnum('vehicle_type', ['bike', 'rikshaw', 'car']); // Vehicle Type Enums

export const vehicles = pgTable('vehicles', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  vehicleType: vehicleTypeEnums('vehicle_type').notNull(),
  capcity: integer('capacity').default(1),
  plate: varchar('plate', { length: 10 }).notNull(),
  color: varchar('color', { length: 20 }),
  isActive: boolean('is_active').default(false),
  lat: integer('lat'),
  lng: integer('lng'),
  captainId: integer('captain_id')
    .notNull()
    .references(() => captains.id, {
      onDelete: 'cascade',
    }), // 1-1 relationship with vehicle
});
