import { relations } from 'drizzle-orm';
import { vehicles, captains } from './schema.js';

// CAPTIAN RELATIONS
export const captainRelations = relations(captains, ({ many }) => ({
  vehiclesRelation: many(vehicles),
}));

// VEHICLES RELATIONS
export const vehicleRelations = relations(vehicles, ({ one }) => ({
  captain: one(captains, {
    fields: [vehicles.captainId],
    references: [captains.id],
  }),
}));
