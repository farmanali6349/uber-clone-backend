import z from 'zod';

// USER RELATED SCHEMA
export const userSchema = z.object({
  firstname: z
    .string()
    .min(3, 'Minimum 03 characters are required in firstname')
    .max(50, 'Maximum 50 characters are allowed in the firstname'),
  lastname: z
    .string()
    .min(3, 'Minimum 03 characters are required in lastname')
    .max(50, 'Maximum 50 characters are allowed in the lastname')
    .optional(),
  email: z.email().max(128, 'Maximum 128 characters are required in the email'),
  password: z
    .string()
    .length(60, 'Invalid bcrypt hash length')
    .regex(/^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/, 'Invalid bcrypt hash'),
  socketId: z.string().optional(),
});

export const registerUserBodySchema = z.object({
  firstname: z
    .string()
    .min(3, 'Minimum 03 characters are required in firstname')
    .max(50, 'Maximum 50 characters are allowed in the firstname'),
  lastname: z
    .string()
    .min(3, 'Minimum 03 characters are required in lastname')
    .max(50, 'Maximum 50 characters are allowed in the lastname')
    .optional(),
  email: z.email().max(128, 'Maximum 128 characters are allowed in the email'),
  socketId: z.string().optional(),
  password: z
    .string()
    .min(6, 'Password must have minimum 06 characters')
    .max(16, 'Password must have maximum 16 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{6,}$/),
});

export const loginBodySchema = z.object({
  email: z.email().max(128, 'Maximum 128 characters are required in the email'),
  password: z.string().max(16, 'Password must have maximum 16 characters'),
});

// CAPTAIN RELATED SCHEMAS
export const captainSchema = z.object({
  firstname: z
    .string()
    .min(3, 'Minimum 03 characters are required in firstname')
    .max(50, 'Maximum 50 characters are allowed in the firstname'),
  lastname: z
    .string()
    .min(3, 'Minimum 03 characters are required in lastname')
    .max(50, 'Maximum 50 characters are allowed in the lastname')
    .optional(),
  email: z.email().max(128, 'Maximum 128 characters are required in the email'),
  password: z
    .string()
    .length(60, 'Invalid bcrypt hash length')
    .regex(/^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/, 'Invalid bcrypt hash'),
  socketId: z.string().optional(),
});

// Add this to your validation.js
export const registerCaptainBodySchema = z.object({
  firstname: z
    .string()
    .min(3, 'Minimum 03 characters are required in firstname')
    .max(50, 'Maximum 50 characters are allowed in the firstname'),
  lastname: z
    .string()
    .min(3, 'Minimum 03 characters are required in lastname')
    .max(50, 'Maximum 50 characters are allowed in the lastname')
    .optional(),
  email: z.email().max(128, 'Maximum 128 characters are allowed in the email'),
  password: z
    .string()
    .min(6, 'Password must have minimum 06 characters')
    .max(16, 'Password must have maximum 16 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{6,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.'
    ),
  socketId: z.string().optional(),
});
// VEHICLE RELATED SCHEMAS
const vehicleTypeEnums = z.enum(['bike', 'rikshaw', 'car']); // Vehicle type enums
export const vehicleSchema = z.object({
  vehicleType: vehicleTypeEnums,
  capacity: z.number().positive().min(1).default(1),
  plate: z
    .string()
    .min(3, 'Minimum 03 characters are required for vehicle plate')
    .max(10, 'Vehicle plate cannot have more than 10 characters'),
  color: z
    .string()
    .max(20, 'Maximum 20 characters are allowed in color name / value')
    .optional(),
  isActive: z.boolean().default(false),
  lat: z.number().optional(),
  lng: z.number().optional(),
  captainId: z.number().int().positive('Captain ID must be a positive integer'),
});
