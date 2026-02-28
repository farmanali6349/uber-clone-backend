import {
  pgTable,
  integer,
  varchar,
  text,
  timestamp,
  index,
  boolean,
  pgEnum as pgEnumFn,
} from 'drizzle-orm/pg-core';

import { eq, relations } from 'drizzle-orm';

// Define the enum properly
export const vehicleTypeEnum = pgEnumFn('vehicle_type', [
  'bike',
  'rikshaw',
  'car',
]);

// USER SCHEMA
export const users = pgTable(
  'users',
  {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    firstname: varchar('first_name', { length: 50 }).notNull(),
    lastname: varchar('last_name', { length: 50 }),
    email: varchar('email', { length: 128 }).notNull().unique(),
    password: text('password').notNull(),
    socketId: text('socket_id'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  userTable => {
    return {
      emailIdx: index('users_email_idx').on(userTable.email),
      socketIdIdx: index('users_socked_id_idx').on(userTable.socketId),
    };
  }
);

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
export const captains = pgTable(
  'captains',
  {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    firstname: varchar('first_name', { length: 50 }).notNull(),
    lastname: varchar('last_name', { length: 50 }),
    email: varchar('email', { length: 128 }).notNull().unique(),
    password: text('password').notNull(),
    socketId: text('socket_id'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  captainTable => {
    // Adding Relations Here
    return {
      vehiclesRelation: relations(captainTable, ({ many }) => ({
        vehicles: many(vehicles),
      })),
      emailIdx: index('captains_email_idx').on(captainTable.email),
      socketIdIdx: index('captains_socked_id_idx').on(captainTable.socketId),
    };
  }
);

// VEHICLE SCHEMA

export const vehicles = pgTable(
  'vehicles',
  {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    vehicleType: vehicleTypeEnum('vehicle_type').notNull(),
    capacity: integer('capacity').default(1),
    plate: varchar('plate', { length: 10 }).notNull().unique(),
    color: varchar('color', { length: 20 }),
    isActive: boolean('is_active').default(false),
    lat: integer('lat'),
    lng: integer('lng'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    captainId: integer('captain_id')
      .notNull()
      .references(() => captains.id, {
        onDelete: 'cascade',
      }), // 1-1 relationship with vehicle
  },
  vehicleTable => {
    // Adding Vehicle Relations Here
    return {
      captainRelation: relations(vehicleTable, ({ one }) => ({
        captain: one(captains, {
          fields: [vehicleTable.captainId],
          references: [captains.id],
        }),
      })),
      // Vehicle Indexes
      plateIdx: index('vehicles_plate_idx').on(vehicleTable.plate),
      isActiveIdx: index('vehicles_is_active_idx').on(vehicleTable.isActive),
      captainIdIdx: index('vehicles_captain_id_idx').on(vehicleTable.captainId),
      locationIdx: index('vehicles_location_idx').on(
        vehicleTable.lat,
        vehicleTable.lng
      ),
    };
  }
);
